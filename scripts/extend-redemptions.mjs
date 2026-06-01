import { readFileSync, writeFileSync } from "node:fs";
const p = "data/redemptions.json";
const j = JSON.parse(readFileSync(p, "utf8"));
for (const r of j.redemptions) {
  const a = r.awardChart;
  if (a["central-asia"] === undefined) a["central-asia"] = Math.round(a["middle-east"] * 1.15);
  if (a["africa"] === undefined) a["africa"] = Math.round(a["europe"] * 1.05);
  if (a["south-america"] === undefined) a["south-america"] = Math.round(a["north-america"] * 1.1);
}
j._meta.regions = ["domestic","south-asia","central-asia","middle-east","southeast-asia","east-asia","europe","africa","north-america","south-america","oceania"];
writeFileSync(p, JSON.stringify(j, null, 2));
console.log("Extended awardCharts for", j.redemptions.length, "programs");
