/**
 * router监听类
 *
 * @file router.ts
 * @author guyunlong
 */

import { RouterEventType } from "../../types/service";
import { TrackPageView } from "../../types/action";

class Router {
  wrapEvent(type: RouterEventType) {
    let orig = (window.history as History)[type];

    return function (this: any) {
      let args: any = Array.prototype.slice.call(arguments);
      let e = new Event(type);
      (e as any).arguments = arguments;
      window.dispatchEvent(e);
      return orig.apply(this, args);
    };
  }

  hashRouterListener(cb: TrackPageView) {
    window.addEventListener("hashchange", (e) => {
      cb(e);
    });
  }

  historyRouterListener(cb: TrackPageView) {
    window.history.pushState = this.wrapEvent("pushState");
    window.history.replaceState = this.wrapEvent("replaceState");

    window.addEventListener("pushState", (e) => {
      cb(e);
    });
    window.addEventListener("replaceState", (e) => {
      cb(e);
    });
  }
}

const router = new Router();

export default router;
