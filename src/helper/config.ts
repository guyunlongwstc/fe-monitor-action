/**
 * condig配置文件
 *
 * @file config.ts
 * @author guyunlong
 */

import { Config } from "../../types/service";

export const defaultConfig: Config = {
  appkey: "5d870d087ea72250dc0c5099",
  uploadUrl: "/api/log/csi",
  router: "hash",
  autoTrack: false,
  autoHeatmap: false,
  autoVisual: false,
  autoHash: true,
  session: "crossDomain",
};

export const COOKIE_SESSION_ID = "BCE_MONITOR_TRACK_SESSION_ID";

export const LOCAL_SESSION_ID = "LOCAL_SESSION_ID";

export const LAST_PAGE_INFO = "LAST_PAGE_INFO";

export const PAGE_ID = "BCE_MONITOR_PAGE_SESSION";

export const CAMPAIGN_TRACK = "CAMPAIGN_TRACK";

export const LOG_ID = "LOG_ID";

export const MODULE_SESSION_ID = "BCE_MONITOR_MODULE_SESSION_ID";
