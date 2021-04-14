import fs from "fs";

interface Options {
  debug: boolean;
  isSwaggerEnabled: boolean;
  logs_directory_path: string;
  sensors: {
    motion: string;
    sound: string;
  };
  sensor_live_delay: {
    motion: number;
    sound: number;
  };
}

function parseOptions(): Options {
  const json: string = fs.readFileSync("/data/options.json", {
    encoding: "utf8",
  });

  return JSON.parse(json);
}

export default parseOptions();
