/**
 * action声明文件
 *
 * @file action.d.ts
 * @author guyunlong
 */

import { RouterType, SessionType } from "./service";

declare namespace Action {
  interface BehaviourConfig {
    session: SessionType;
  }

  interface HeatmapConfig {}

  interface TrackPageView {
    (e: Event): void;
  }

  interface PageViewConfig {
    session: SessionType;
    router: RouterType;
  }

  interface CurrentPage {
    pageId: string;
    time: string;
    lastPageId: string;
    module: string;
    title: string;
    url: string;
  }

  interface LastPage {
    pageId: string;
    nextPageId: string;
    module: string;
    title: string;
    url: string;
    stayTime: number;
  }

  interface CookieSession {
    getSessionId: () => string | null;
    setSessionId: (sessionId?: string) => string;
  }

  interface LocalSession {
    getSessionId: () => string | null;
    setSessionId: (sessionId?: string) => string;
  }

  interface SessionConfig {
    session: SessionType;
  }

  interface VisualConfig {}
}

export = Action;
