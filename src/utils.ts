import options from "./options";

export function getSensorIdFromPath(path: string): string {
  const res = path.split("/");

  return res[res.length - 2].replace("/", "");
}

export function log(...message: string[]): void {
  if (options.debug) {
    console.log(message);
  }
}
