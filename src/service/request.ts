/**
 * 发送请求
 *
 * @file request.ts
 * @author guyunlong
 */

import { Data, TrackData, RequestConfig } from "../../types/service";
import { getBaseData } from "../helper/util";
import { lStorage, sStorage } from "./storage";
import session from "./session";
import { LOG_ID, PAGE_ID } from "../helper/config";
import { guid, uid } from "../helper/util";

class Request {
  static logs: Array<TrackData> = [];
  static limit: number = 5;
  static url: string = "/api/log/csi";
  static sessionId: string | null = null;

  static isRequestInit: boolean = false;

  static install(config: RequestConfig) {
    Request.sessionId = session.getSessionId(config.session);
    Request.url = config.uploadUrl;
    Request.isRequestInit = true;
  }

  static unInstall() {
    Request.isRequestInit = false;
  }

  static trackRequest(data: Data) {
    // 没有install，不上报
    if (!Request.isRequestInit) {
      return;
    }

    let baseData = getBaseData();

    let result = { ...baseData, ...data } as TrackData;

    Request.logs.push(result);

    if (Request.logs.length === Request.limit) {
      fetch(Request.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "X-Request-By": "ERApplication",
        },
        body: JSON.stringify(Request.logs),
      });

      Request.logs = [];
    }
  }

  static trackBehaviour(data: Data) {
    let prefixData: Data = {};

    // 兼容fe-base监控模块的垃圾格式。。。。
    Object.keys(data).forEach((key) => {
      if (key === "target") {
        prefixData[key] = data[key];
      } else {
        prefixData["data_" + key] = data[key];
      }
    });

    let result = {
      lastLogId: lStorage.get(LOG_ID),
      logId: lStorage.set(LOG_ID, guid()),
      page_view_id: sStorage.get(PAGE_ID),
      sessionId: Request.sessionId || uid(),
      target: "custom",
      data_actionPath: window.location.href.replace(/(^.*#|~.*)/g, ""),
      data_url: window.location.href.replace(/\?[^#]*/, ""),
      ...prefixData,
    };

    Request.trackRequest(result);
  }
}

export default Request;
