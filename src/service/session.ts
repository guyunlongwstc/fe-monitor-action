/**
 * router监听类
 *
 * @file router.ts
 * @author guyunlong
 */

import { SessionType } from "../../types/service";
import cookie from "./cookie";
import { lStorage } from "./storage";
import { COOKIE_SESSION_ID, LOCAL_SESSION_ID } from "../helper/config";
import { uid, getMainHost } from "../helper/util";

class Session {
  getSessionId(type: SessionType) {
    switch (type) {
      case "crossDomain":
        return this.getCookieSessionId();
      case "localStorage":
        return this.getLocalSessionId();
      default:
        return this.getCookieSessionId();
    }
  }

  setSessionId(type: SessionType, id?: string) {
    switch (type) {
      case "crossDomain":
        return this.setCookieSessionId();
      case "localStorage":
        return this.setLocalSessionId();
      default:
        return this.setCookieSessionId();
    }
  }

  getCookieSessionId(): string | null {
    const sessionId = cookie.get(COOKIE_SESSION_ID);

    if (sessionId) {
      // 如果sessionId存在，则重置过期时间为30分钟
      this.setCookieSessionId(sessionId);
    }

    return sessionId;
  }

  setCookieSessionId(sessionId?: string): string {
    const factSessionId = sessionId || uid();

    cookie.set(COOKIE_SESSION_ID, factSessionId, {
      domain: "." + getMainHost(),
      path: "/",
      expires: 30 * 60 * 1000,
    });

    return factSessionId;
  }

  /**
   * 获取已经保存的会话id
   *
   * @return {string | null} 已保存的会话id
   */
  getLocalSessionId(): string | null {
    return lStorage.get(LOCAL_SESSION_ID);
  }

  /**
   * 生成并保存会话id
   *
   * @param {string} externalSession 手动设置sessionID
   * @return {string} 生成的 sessionId
   */
  setLocalSessionId(id?: string): string {
    const sessionId = id || uid();
    lStorage.set(LOCAL_SESSION_ID, sessionId);
    return sessionId;
  }
}

const session = new Session();

export default session;
