/**
 * 通用方法
 *
 * @file util.ts
 * @author guyunlong
 */

import moment from "moment";
import { BaseData, Browser } from "../../types/service";
import cookie from "../service/cookie";
import { CAMPAIGN_TRACK } from "./config";

export const getOS = () => {
  var sUserAgent = navigator.userAgent;
  var isWin = navigator.platform == "Win32" || navigator.platform == "Windows";
  var isMac =
    navigator.platform == "Mac68K" ||
    navigator.platform == "MacPPC" ||
    navigator.platform == "Macintosh" ||
    navigator.platform == "MacIntel";
  if (isMac) return "Mac";
  var isUnix = navigator.platform == "X11" && !isWin && !isMac;
  if (isUnix) return "Unix";
  var isLinux = String(navigator.platform).indexOf("Linux") > -1;
  if (isLinux) return "Linux";
  if (isWin) {
    var isWin2K =
      sUserAgent.indexOf("Windows NT 5.0") > -1 ||
      sUserAgent.indexOf("Windows 2000") > -1;
    if (isWin2K) return "Win2000";
    var isWinXP =
      sUserAgent.indexOf("Windows NT 5.1") > -1 ||
      sUserAgent.indexOf("Windows XP") > -1;
    if (isWinXP) return "WinXP";
    var isWin2003 =
      sUserAgent.indexOf("Windows NT 5.2") > -1 ||
      sUserAgent.indexOf("Windows 2003") > -1;
    if (isWin2003) return "Win2003";
    var isWinVista =
      sUserAgent.indexOf("Windows NT 6.0") > -1 ||
      sUserAgent.indexOf("Windows Vista") > -1;
    if (isWinVista) return "WinVista";
    var isWin7 =
      sUserAgent.indexOf("Windows NT 6.1") > -1 ||
      sUserAgent.indexOf("Windows 7") > -1;
    if (isWin7) return "Win7";
    var isWin10 =
      sUserAgent.indexOf("Windows NT 10") > -1 ||
      sUserAgent.indexOf("Windows 10") > -1;
    if (isWin10) return "Win10";
  }
  return "other";
};

export const getScreenWidth = () => window.screen.width;

export const getScreenHeight = () => window.screen.height;

export const getBrowser = () => {
  var browser = {} as Browser;
  var userAgent = navigator.userAgent.toLowerCase();
  var s;
  (s = userAgent.match(/msie ([\d.]+)/))
    ? (browser.ie = s[1])
    : (s = userAgent.match(/firefox\/([\d.]+)/))
    ? (browser.firefox = s[1])
    : (s = userAgent.match(/chrome\/([\d.]+)/))
    ? (browser.chrome = s[1])
    : (s = userAgent.match(/opera.([\d.]+)/))
    ? (browser.opera = s[1])
    : (s = userAgent.match(/version\/([\d.]+).*safari/))
    ? (browser.safari = s[1])
    : 0;
  var version = "";
  if (browser.ie) {
    version = "IE " + browser.ie;
  } else {
    if (browser.firefox) {
      version = "firefox " + browser.firefox;
    } else {
      if (browser.chrome) {
        version = "chrome " + browser.chrome;
      } else {
        if (browser.opera) {
          version = "opera " + browser.opera;
        } else {
          if (browser.safari) {
            version = "safari " + browser.safari;
          } else {
            version = "未知浏览器";
          }
        }
      }
    }
  }
  return version;
};

export const getCurrentTime = () =>
  moment(new Date()).utc().format("YYYY-MM-DD HH:mm:ss");

export const getUserAgent = () => window.navigator.userAgent;

export const getReferrer = () => document.referrer;

export const getcampaignTrack = () => cookie.get(CAMPAIGN_TRACK);

export const getTitle = () => document.title;

export const getUrl = () => window.location.href;

export const getUrlPath = () => window.location.href.replace(/(^.*#|~.*)/g, "");

export const getBaseData = (): BaseData => ({
  actionTime: getCurrentTime(),
  context_browser: getBrowser(),
  context_device: "Desktop",
  context_os: getOS(),
  context_url: getUrl(),
  campaign_track: getcampaignTrack(),
});

export const isNumber = (typeName: any) => typeof typeName === "number";

/**
 * 获取当前域名的主域
 *
 * @example cloud.baidu.com 主域 baidu.com
 * @return {string} 当前域名的主域
 */
export const getMainHost = () => {
  let key = `mh_${Math.random()}`;
  let keyR = new RegExp(`(^|;)\\s*${key}=12345`);
  let expiredTime = new Date(0);
  let domain = document.domain;
  let domainList = domain.split(".");

  let urlItems = [];
  // 主域名一定会有两部分组成
  urlItems.unshift(domainList.pop());
  // 慢慢从后往前测试
  while (domainList.length) {
    urlItems.unshift(domainList.pop());
    const mainHost = urlItems.join(".");
    const cookie = `${key}=${12345};domain=.${mainHost}`;

    document.cookie = cookie;

    // 如果cookie存在，则说明域名合法
    if (keyR.test(document.cookie)) {
      document.cookie = `${cookie};expires=${expiredTime}`;
      return mainHost;
    }
  }
};

export const rand16Num = (len: number) => {
  len = len || 0;
  let result = [];
  for (let i = 0; i < len; i++) {
    result.push("0123456789abcdef".charAt(Math.floor(Math.random() * 16)));
  }
  return result.join("");
};

export const uid = () =>
  [new Date().valueOf().toString(), rand16Num(4)].join("");

export const guid = () => {
  let curr = new Date().valueOf().toString();

  return [
    "4b534c46",
    rand16Num(4),
    "4" + rand16Num(3),
    rand16Num(4),
    curr.substring(0, 12),
  ].join("-");
};

export const isSanCmpt = (target: Function) =>
  target &&
  target.prototype &&
  (target.prototype.nodeType === 5 || target.prototype._type === "san-cmpt");

export const isJSON = (str: any): boolean => {
  if (typeof str == "string") {
    try {
      let obj = JSON.parse(str);
      return typeof obj == "object" && obj;
    } catch (e) {
      return false;
    }
  }

  return false;
};

export const getModule = () => window.location.pathname.replace(/\//g, "");

export const getModuleName = () => "";

export const isLinkElement = (el: HTMLElement): el is HTMLLinkElement => {
  return (el as HTMLLinkElement).href !== undefined;
};

export function throttle(func: (...args: any[]) => any, timeout: number) {
  let timer: any = null;

  return (...args: any[]) => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(null, args);
    }, timeout);
  };
}
