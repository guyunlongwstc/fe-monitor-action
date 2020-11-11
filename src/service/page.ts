/**
 * router监听类
 *
 * @file router.ts
 * @author guyunlong
 */

import { CurrentPage, LastPage } from "../../types/action";
import { uid } from "../helper/util";
import { getCurrentTime, getTitle, getUrl } from "../helper/util";
import { lStorage, sStorage } from "./storage";
import { LAST_PAGE_INFO, PAGE_ID } from "../helper/config";

class Page {
  getCurrentPage(): CurrentPage {
    let lastPage = this.getLastPage();
    return {
      pageId: uid(),
      lastPageId: lastPage && lastPage.pageId,
      module: "",
      time: getCurrentTime(),
      title: getTitle(),
      url: getUrl(),
    };
  }

  getLastPage(): LastPage {
    return lStorage.get(LAST_PAGE_INFO);
  }

  setPageData(data: CurrentPage) {
    lStorage.set(LAST_PAGE_INFO, data);
    sStorage.set(LAST_PAGE_INFO, data);
  }

  getPageId() {
    return sStorage.get(PAGE_ID);
  }
}

const page = new Page();

export default page;
