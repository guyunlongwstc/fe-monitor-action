/**
 * behaviour模块
 *
 * @file behaviour.ts
 * @author guyunlong
 */

import { BehaviourConfig } from "../../types/behaviour";
import session from "../service/session";
import { isLinkElement, throttle } from "../helper/util";
import Request from "../service/request";
import { Data } from "../../types/service";

class Behaviour {
  sessionId: string | null = null;

  public install(config: BehaviourConfig) {
    this.sessionId = session.getSessionId(config.session);
    this.addElementListener([document.body]);
    this.initAutoWatcher();
  }

  addElementListener(nodeList: Array<HTMLElement>) {
    Array.prototype.forEach.call(nodeList, (node) => {
      if (node.nodeType !== Node.ELEMENT_NODE) {
        return;
      }

      const trackElements = node.querySelectorAll(`[data-track-name]:not(a)`);
      const linkElements = node.getElementsByTagName("a");

      // 过滤掉data-track-name和data-track-id为空的元素
      let filterTrackElements = Array.prototype.slice
        .call(trackElements, 0)
        .filter(
          (el) =>
            el.getAttribute("data-track-name") &&
            el.getAttribute("data-track-id")
        );

      let filterLinkElements = Array.prototype.slice
        .call(linkElements, 0)
        .filter(
          (el) =>
            el.getAttribute("data-track-name") &&
            el.getAttribute("data-track-id")
        );

      this.bindListener(filterTrackElements);
      this.bindListener(filterLinkElements);
    });
  }

  initAutoWatcher() {
    if (typeof window.MutationObserver !== "function") {
      console.log("不支持 MutaionObserver");
      return;
    }
    let recordCache: any[] = [];

    const throttleAddListener = throttle((records: any[]) => {
      const flattedNodelist = records
        .map((record) => record.addedNodes)
        .reduce((acc, cur) => acc.concat(Array.from(cur)), []);

      this.addElementListener(flattedNodelist);

      recordCache = [];
    }, 500);

    const observer = new MutationObserver((records) => {
      recordCache = recordCache.concat(records);
      throttleAddListener(recordCache);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  bindListener(elements: HTMLElement[]) {
    elements.forEach((el) => {
      const trackAction = el.getAttribute("data-action") || "click";
      el.addEventListener(trackAction, this.actionHandler);
    });
  }

  actionHandler = (e: Event) => {
    this.trackBehaviour(e.type, e.currentTarget as HTMLElement);
  };

  trackBehaviour(action: string, el: HTMLElement) {
    let result: Data = {
      action: action,
      id: el.id || "nil",
      content: el.innerText.replace(/\s*/g, ""),
      trackId: el.getAttribute("data-track-id") || "-",
      trackName: el.getAttribute("data-track-name") || "-",
      target: el.tagName.toLocaleLowerCase(),
    };

    if (isLinkElement(el)) {
      result["href"] = el.href.replace(/\?[^#]*/, "") || "-";
    }

    Request.trackBehaviour(result);
  }
}

const behaviour = new Behaviour();
export default behaviour;
