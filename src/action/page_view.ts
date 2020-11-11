/**
 * pageview模块
 *
 * @file page_view.ts
 * @author guyunlong
 */

import router from "../service/router";
import { PageViewConfig } from "../../types/action";
import { PageViewData, PageLeaveData, Data } from "../../types/service";
import Request from "../service/request";
import {
  getModule,
  getModuleName,
  uid,
  getReferrer,
  getUrlPath,
  guid,
  getUrl,
} from "../helper/util";
import { sStorage, lStorage } from "../service/storage";
import {
  MODULE_SESSION_ID,
  LAST_PAGE_INFO,
  LOG_ID,
  PAGE_ID,
} from "../helper/config";
import session from "../service/session";

class PageView {
  sessionId: string | null = null;

  public install(config: PageViewConfig) {
    this.sessionId = session.getSessionId(config.session);

    switch (config.router) {
      case "history":
        router.historyRouterListener(this.trackPage);
        break;
      case "hash":
        router.hashRouterListener(this.trackPage.bind(this));
        break;
      default:
        router.hashRouterListener(this.trackPage.bind(this));
    }

    window.addEventListener("load", (e) => {
      lStorage.set(MODULE_SESSION_ID, uid());

      this.trackPage(e);
    });
  }

  trackPage(e: Event) {
    const lastPageInfo = lStorage.get(LAST_PAGE_INFO);

    if (lastPageInfo) {
      const pageLeaveData = this.getPageLeaveData(lastPageInfo);
      Request.trackRequest(pageLeaveData);
    }

    const pageViewData = this.getPageViewData();

    Request.trackRequest(pageViewData);

    lStorage.set(LAST_PAGE_INFO, {
      time: Date.now(),
      data_url: window.location.href,
      ...pageViewData,
    });
  }

  getPageViewData() {
    const pageViewId = uid();

    // 部分字段没啥用，兼容接口格式。。。
    const result: PageViewData = {
      data_action: "actionLoad",
      data_module: getModule(),
      data_module_name: getModuleName(),
      data_module_session: lStorage.get(MODULE_SESSION_ID),
      data_page_referrer: getReferrer(),
      data_page_view_id: pageViewId,
      data_path: getUrlPath(),
      data_referrer: getReferrer(),
      lastLogId: lStorage.get(LOG_ID),
      logId: lStorage.set(LOG_ID, guid()),
      page_view_id: pageViewId,
      sessionId: this.sessionId || uid(),
      target: "SanPage",
    };

    sStorage.set(PAGE_ID, pageViewId);

    return result;
  }

  getPageLeaveData(data: PageViewData) {
    // 部分字段没啥用，兼容接口格式。。。
    const result: PageLeaveData = {
      data_action: "actionLeave",
      data_from_module: data.data_module,
      data_from_module_name: data.data_module_name,
      data_from_path: data.data_path,
      data_from_url: data.data_url,
      data_lengthOfStay: Date.now() - data.time!,
      data_module_session: lStorage.get(MODULE_SESSION_ID),
      data_page_referrer: data.data_referrer,
      data_page_view_id: data.page_view_id,
      data_to_moduel_name: getModuleName(),
      data_to_module: getModule(),
      data_to_path: getUrlPath(),
      data_to_url: getUrl(),
      lastLogId: lStorage.get(LOG_ID),
      logId: lStorage.set(LOG_ID, guid()),
      page_view_id: data.page_view_id,
      sessionId: this.sessionId || uid(),
      target: "SanPage",
    };

    return result;
  }
}

const pageView = new PageView();
export default pageView;
