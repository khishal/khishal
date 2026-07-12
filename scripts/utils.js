import fs from "fs-extra";

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function percent(current, max) {
  if (max <= 0) return 0;
  return Math.round((current / max) * 100);
}

export function progress(current, max) {
  return clamp(percent(current, max), 0, 100);
}

export function saveJSON(path, data) {
  fs.ensureFileSync(path);
  fs.writeJsonSync(path, data, { spaces: 2 });
}

export function readJSON(path) {
  if (!fs.existsSync(path)) return null;
  return fs.readJsonSync(path);
}

export function formatNumber(number) {
  return new Intl.NumberFormat("en-US").format(number);
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
