/**
 * storage
 *
 * @file storage.ts
 * @author guyunlong
 */

import { isJSON } from "../helper/util";

class Storage {
  private store: globalThis.Storage;

  constructor(store: globalThis.Storage) {
    this.store = store;
  }

  set(key: string, value: any) {
    let result;

    if (Object.prototype.toString.call(value) === "[object Object]") {
      result = JSON.stringify(value);
    } else {
      result = value;
    }

    this.store.setItem(key, result);

    return result;
  }

  get(key: string) {
    if (this.store.getItem(key)) {
      if (isJSON(this.store.getItem(key))) {
        return JSON.parse(this.store.getItem(key)!);
      } else {
        return this.store.getItem(key);
      }
    }

    return null;
  }

  remove(key: string) {
    this.store.removeItem(key);
  }
}

const lStorage = new Storage(window.localStorage);
const sStorage = new Storage(window.sessionStorage);

export { lStorage, sStorage };
