import { randomInt } from "node:crypto";
import { generateAssets, type Asset } from "./data";

let serverRunAssets: Asset[] | undefined;

/** Generate once per Node server process, then serve the same catalog to every request. */
export function getServerAssets(): Asset[] {
  serverRunAssets ??= generateAssets(randomInt(0, 0x100000000));
  return serverRunAssets;
}
