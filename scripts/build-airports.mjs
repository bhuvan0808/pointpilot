// Builds data/airports.json + data/popular-airports.json from the open
// OurAirports dataset (public domain). Run: node scripts/build-airports.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "data");

const SRC = "https://davidmegginson.github.io/ourairports-data/airports.csv";

// Minimal robust CSV row parser (handles quoted fields with commas/quotes).
function parseLine(line) {
  const out = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQ) {
      if (c === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else inQ = false;
      } else cur += c;
    } else if (c === '"') inQ = true;
    else if (c === ",") {
      out.push(cur);
      cur = "";
    } else cur += c;
  }
  out.push(cur);
  return out;
}

// Curated set of globally important hubs (also our offline fallback list).
const POPULAR = [
  "MAA", "BLR", "DEL", "BOM", "HYD", "CCU", "GOI", "COK", "AMD", "PNQ",
  "SIN", "BKK", "KUL", "DPS", "HKT", "CGK", "MNL", "SGN", "HAN",
  "DXB", "AUH", "DOH", "RUH", "JED", "KWI", "BAH", "MCT",
  "HND", "NRT", "ICN", "HKG", "TPE", "PEK", "PVG", "CAN",
  "LHR", "LGW", "CDG", "FRA", "MUC", "AMS", "ZRH", "IST", "FCO", "MAD",
  "BCN", "VIE", "CPH", "DUB", "LIS", "ATH",
  "JFK", "EWR", "SFO", "LAX", "ORD", "IAD", "BOS", "SEA", "YYZ", "YVR",
  "SYD", "MEL", "BNE", "PER", "AKL",
  "CMB", "MLE", "KTM", "DAC", "NBO", "JNB", "CAI", "ADD", "MRU",
];

async function main() {
  console.log("Downloading OurAirports dataset…");
  const res = await fetch(SRC);
  if (!res.ok) throw new Error("Download failed: " + res.status);
  const text = await res.text();
  const lines = text.split(/\r?\n/);
  const header = parseLine(lines[0]);
  const col = (name) => header.indexOf(name);
  const iType = col("type");
  const iName = col("name");
  const iLat = col("latitude_deg");
  const iLon = col("longitude_deg");
  const iCountry = col("iso_country");
  const iMuni = col("municipality");
  const iSched = col("scheduled_service");
  const iIata = col("iata_code");

  const keepTypes = new Set(["large_airport", "medium_airport"]);
  const airports = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue;
    const r = parseLine(lines[i]);
    const iata = (r[iIata] || "").trim().toUpperCase();
    const type = r[iType];
    if (!iata || iata.length !== 3) continue;
    if (!keepTypes.has(type)) continue;
    if (r[iSched] !== "yes") continue;
    const city = (r[iMuni] || "").trim();
    const name = (r[iName] || "").trim();
    const country = (r[iCountry] || "").trim().toUpperCase();
    const lat = Number(r[iLat]);
    const lon = Number(r[iLon]);
    if (!country || Number.isNaN(lat) || Number.isNaN(lon)) continue;
    airports.push({
      iata,
      name,
      city: city || name,
      country,
      lat: Math.round(lat * 1000) / 1000,
      lon: Math.round(lon * 1000) / 1000,
      large: type === "large_airport",
    });
  }

  // De-dupe by IATA (keep large over medium when clashing).
  const byIata = new Map();
  for (const a of airports) {
    const ex = byIata.get(a.iata);
    if (!ex || (a.large && !ex.large)) byIata.set(a.iata, a);
  }
  const final = Array.from(byIata.values()).sort((x, y) =>
    x.city.localeCompare(y.city)
  );

  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(
    join(DATA_DIR, "airports.json"),
    JSON.stringify(final)
  );
  console.log("Wrote airports.json:", final.length, "airports");

  const popular = POPULAR.map((code) => byIata.get(code)).filter(Boolean);
  writeFileSync(
    join(DATA_DIR, "popular-airports.json"),
    JSON.stringify(popular, null, 2)
  );
  console.log("Wrote popular-airports.json:", popular.length, "airports");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
