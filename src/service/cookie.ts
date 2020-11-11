/**
 * cookie类
 *
 * @file cookie.ts
 * @author guyunlong
 */

import { CookieOption } from "../../types/service";
import { isNumber } from "../helper/util";

class Cookie {
  /**
   * 设置Cookie的值
   *
   * @public
   * @param {string} name cookie键名
   * @param {string} value cookie原始值
   * @param {Object=} options cookie选项
   * @param {boolean=} options.raw 是否不自动编码
   * @param {(number= | Date=)} options.expires 有效期，为数字时单位为毫秒
   * @param {string=} options.domain 域名
   * @param {string=} options.path 路径
   * @param {boolean=} options.secure 是否安全传输
   */
  set(name: string, value: string, options = {} as CookieOption) {
    if (!name) {
      return;
    }

    let date = options.expires;

    if (isNumber(date)) {
      date = new Date();
      date.setTime(date.getTime() + +options.expires);
    }

    document.cookie =
      name +
      "=" +
      (options.raw ? value : encodeURIComponent(value)) +
      (date instanceof Date ? "; expires=" + date.toUTCString() : "") +
      (options.domain ? "; domain=" + options.domain : "") +
      (options.path ? "; path=" + options.path : "") +
      (options.secure ? "; secure" : "");
  }

  /**
   * 获取Cookie的值
   *
   * @public
   * @param {string} name cookie键名
   * @param {Object=} options cookie选项
   * @param {boolean=} options.raw 是否不自动编码
   * @return {?string} 获取的cookie值，获取不到时返回null
   */
  get(name: string, options = {} as CookieOption) {
    if (name) {
      const matches = String(document.cookie).match(
        new RegExp("(?:^|)" + name + "(?:(?:=([^;]*))|;|$)")
      );

      if (matches) {
        if (matches[1]) {
          return options.raw ? matches[1] : decodeURIComponent(matches[1]);
        }
        return "";
      }
    }

    return null;
  }

  /**
   * 删除Cookie
   *
   * @public
   * @param {string} name 需要删除cookie的键名
   * @param {Object=} options 需要删除cookie的配置
   * @param {string=} options.domain 域名
   * @param {string=} options.path 路径
   * @param {boolean=} options.secure 是否安全传输
   */
  remove(name: string, options = {} as CookieOption) {
    options.raw = !0;
    options.expires = new Date(0);
    this.set(name, "", options);
  }
}

const cookie = new Cookie();

export default cookie;
