/**
 * track入口
 *
 * @file index.d.ts
 * @author guyunlong
 */

import { Config, Data } from "./service";
import { SuiTrack } from "./plugin";

declare namespace Track {
  function install(config: Config): void;
  function trackLog(data: Data): void;
  const suiTrack: SuiTrack;
}

export = Track;
