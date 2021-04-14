// @ts-ignore
import config from "/data/options.json";

export function getSensorIdFromPath(path: string): string {
  const res = path.split("/");

  return res[res.length - 2].replace("/", "");
}

export function log(...message: string[]): void {
  if (config.debug) {
    console.log(message);
  }
}
