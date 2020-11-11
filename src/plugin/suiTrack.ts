/**
 * sui组件监控插件
 *
 * @file suiTrack.ts
 * @author guyunlong
 */

import {
  Sui,
  SuiType,
  SuiTarget,
  SuiBiz,
  SuiBizType,
  Avatar,
  Badge,
  Button,
  BreadcrumbItem,
  Breadcrumb,
  Cascader,
  Card,
  CheckboxGroup,
  Checkbox,
  ColorPicker,
  CollapsePanel,
  Collapse,
  Dialog,
  Dropdown,
  FormItem,
  Form,
  InputNumber,
  Input,
  Icon,
  Link,
  List,
  Message,
  Menu,
  Notification,
  OptionGroup,
  Option,
  Page,
  Pagination,
  Popover,
  Popup,
  Radio,
  Rate,
  RadioGroup,
  Select,
  Slider,
  ScrollBar,
  Step,
  Steps,
  Switch,
  TabPane,
  Tabs,
  Table,
  TimeLine,
  TimeLineItem,
  TimePicker,
  Tooltip,
  Transfer,
  Trigger,
  WebUploader,
  AppSidebar,
  AppSidebarItem
} from "../../types/plugin";
import { isSanCmpt } from "../helper/util";
import { Data } from "../../types/service";
import Request from "../service/request";
import { uid, guid } from "../helper/util";
import page from "../service/page";
import session from "../service/session";
import { lStorage } from "../service/storage";
import { LOG_ID } from "../helper/config";

class SuiTrack {
  sui: Sui | null = null;
  suiBiz: SuiBiz | null = null;

  // 为了方便生成handler函数，减少代码量，平时最好不要这么写
  [key: string]: any;

  activate(sui: Sui, suiBiz?: SuiBiz) {
    this.sui = sui;

    (Object.keys(sui) as Array<SuiType>).forEach((key: SuiType) => {
      let cmpt = sui[key];

      if (isSanCmpt(cmpt)) {
        cmpt.prototype.created = this.createdHandler.apply(this, [key]);

        let subCmpts = Object.keys(cmpt);

        if (subCmpts.length > 0) {
          subCmpts.forEach((item) => {
            if (isSanCmpt(cmpt[item])) {
              cmpt[item].prototype.created = this.createdHandler.apply(this, [
                item as SuiType,
              ]);
            }
          });
        }
      }
    });

    if (suiBiz) {
      this.suiBiz = suiBiz;

      (Object.keys(suiBiz) as Array<SuiBizType>).forEach((key: SuiBizType) => {
        let cmpt = suiBiz[key];

        if (isSanCmpt(cmpt)) {
          cmpt.prototype.created = this.createdHandler.apply(this, [key]);
  
          let subCmpts = Object.keys(cmpt);
  
          if (subCmpts.length > 0) {
            subCmpts.forEach((item) => {
              if (isSanCmpt(cmpt[item])) {
                cmpt[item].prototype.created = this.createdHandler.apply(this, [
                  key + item as SuiBizType,
                ]);
              }
            });
          }
        }
      })
    }
  }

  createdHandler(key: SuiType | SuiBizType) {
    const _this = this;

    return function (this: SuiTarget) {
      // _this.setTrackAttribute(this);

      let handler = _this[key.toLowerCase() + "Handler"];

      // _this指向SuiTrack实例，this指向Sui组件实例
      handler && handler.call(_this, this);
    };
  }

  setTrackAttribute(target: SuiTarget) {
    let trackId = target.data.get("trackId");
    let trackName = target.data.get("trackName");
    trackId && target.el && target.el.setAttribute("data-track-id", trackId);
    trackName &&
      target.el &&
      target.el.setAttribute("data-track-name", trackName);
  }

  avatarHandler(target: Avatar) {}

  buttonHandler(target: Button) {
    target.on("click", (e) => {
      this.log(
        {
          target: "Button",
          data_action: "click",
          data_id: target.id,
          data_content: (target.el as HTMLElement).innerText.replace(
            /\s*/g,
            ""
          ),
        },
        target
      );
    });
  }

  badgeHandler(target: Badge) {}

  breadcrumbitemHandler(target: BreadcrumbItem) {}

  breadcrumbHandler(target: Breadcrumb) {}

  cascaderHandler(target: Cascader) {}

  checkboxgroupHandler(target: CheckboxGroup) {
    target.on("change", (e) => {
      this.log(
        {
          target: "CheckboxGroup",
          data_action: "change",
          data_id: target.id,
          data_value: e.value,
        },
        target
      );
    });
  }

  dialogHandler(target: Dialog) {
    target.watch("open", (open) => {
      if (open) {
        this.log(
          {
            target: "Dialog",
            data_action: "open",
            data_id: target.id,
            data_title: target.data.get("title"),
          },
          target
        );

        target.__openTime = Date.now();
      }
    });

    // foot 使用 slot 后会导致 Dialog 默认的 confirm（确认） 事件无法监听到
    target.on("confirm", (e) => {
      this.log(
        {
          target: "Dialog",
          data_action: "confirm",
          data_id: target.id,
          data_title: target.data.get("title"),
          data_lengthOfStay: Date.now() - target.__openTime,
        },
        target
      );
    });

    // foot 使用 slot 后会导致 Dialog 默认的 close（取消） 事件无法监听到
    target.on("close", (e) => {
      this.log(
        {
          target: "Dialog",
          data_action: "close",
          data_id: target.id,
          data_title: target.data.get("title"),
          data_lengthOfStay: Date.now() - target.__openTime,
        },
        target
      );
    });
  }

  Dropdown(target: Dropdown) {}

  formHandler(target: Form) {}

  inputnumberHandler(target: InputNumber) {
    target.on("focus", (e) => {
      this.log(
        {
          target: "InputNumber",
          data_action: "focus",
          data_id: target.id,
        },
        target
      );

      target.__focusTime = Date.now();
    });

    target.on("blur", (e) => {
      this.log(
        {
          target: "InputNumber",
          data_action: "blur",
          data_id: target.id,
          data_lengthOfStay: Date.now() - target.__focusTime,
        },
        target
      );
    });

    target.on("enter", (e) => {
      this.log(
        {
          target: "InputNumber",
          data_action: "enter",
          data_value: e.value,
          data_id: target.id,
        },
        target
      );
    });

    target.on("change", (e) => {
      this.log(
        {
          target: "InputNumber",
          data_action: "change",
          data_value: e.value,
          data_id: target.id,
        },
        target
      );
    });
  }

  inputHandler(target: Input) {
    target.on("focus", (e) => {
      this.log(
        {
          target: "Input",
          data_action: "focus",
          data_id: target.id,
        },
        target
      );

      target.__focusTime = Date.now();
    });

    target.on("blur", (e) => {
      this.log(
        {
          target: "Input",
          data_action: "blur",
          data_id: target.id,
          data_lengthOfStay: Date.now() - target.__focusTime,
        },
        target
      );
    });

    target.on("enter", (e) => {
      this.log(
        {
          target: "Input",
          data_action: "enter",
          data_id: target.id,
          data_value: e.value,
        },
        target
      );
    });
  }

  iconHandler(target: Icon) {}

  linkHandler(target: Link) {}

  listHandler(target: List) {}

  messageHandler(target: Message) {}

  menuHandler(target: Menu) {}

  notificationHandler(target: Notification) {}

  optionGroupHandler(target: OptionGroup) {}

  pageHandler(target: Page) {}

  paginationHandler(target: Pagination) {}

  rateHandler(target: Rate) {}

  radiogroupHandler(target: RadioGroup) {
    target.on("change", (e) => {
      this.log(
        {
          target: "RadioGroup",
          data_action: "change",
          data_id: target.id,
          data_value: e.value,
        },
        target
      );
    });
  }

  selectHandler(target: Select) {
    target.on("change", (e) => {
      this.log(
        {
          target: "Select",
          data_action: "change",
          data_id: target.id,
          data_value: e.value,
          data_content: target.data.get("selectedLabel") || "",
        },
        target
      );
    });

    target.watch("visible", (visible) => {
      if (!visible) {
        this.log(
          {
            target: "Select",
            data_action: "hide",
            data_id: target.id,
            data_lengthOfStay: Date.now() - target.__focusTime,
          },
          target
        );
      } else {
        this.log(
          {
            target: "Select",
            data_action: "show",
            data_id: target.id,
          },
          target
        );
        target.__focusTime = Date.now();
      }
    });
  }

  sliderHandler(target: Slider) {}

  stepsHandler(target: Steps) {
    // 进入时发送第一步的数据
    this.log(
      {
        target: "Steps",
        data_action: "change",
        data_id: target.id,
        data_value: target.data.get("current"),
      },
      target
    );

    target.watch("current", (current) => {
      this.log(
        {
          target: "Steps",
          data_action: "change",
          data_id: target.id,
          data_value: current,
        },
        target
      );
    });
  }

  switchHandler(target: Switch) {
    target.on("change", (e) => {
      this.log(
        {
          target: "Switch",
          data_action: "change",
          data_id: target.id,
          data_value: e.value,
        },
        target
      );
    });
  }

  tableHandler(target: Table) {
    target.on("sort", (e) => {
      this.log(
        {
          target: "Table",
          data_action: "sort",
          data_id: target.id,
          data_order: e.value.order,
          data_field_name: e.value.orderBy,
        },
        target
      );
    });

    target.on("filter", (e: any) => {
      this.log(
        {
          target: "Table",
          data_action: "filter",
          data_id: target.id,
          data_field_name: e.field.label,
          data_field_title: e.field.name,
          data_filter_text: e.filter.text || "",
          data_filter_value: e.filter.value,
        },
        target
      );
    });
  }

  tabsHandler(target: Tabs) {
    target.on("change", (e) => {
      this.log(
        {
          target: "Tabs",
          data_action: "change",
          data_id: target.id,
          data_value: e.value.label,
        },
        target
      );
    });
  }

  tooltipHandler(target: Tooltip) {
    target.watch("visible", (visible) => {
      if (visible) {
        this.log(
          {
            target: "Tooltip",
            data_action: "active",
            data_id: target.id,
            data_content: target.data.get("content"),
          },
          target
        );
      }
    });
  }

  timelineHandler(target: TimeLine) {}

  timepickerHandler(target: TimePicker) {}

  transferHandler(target: Transfer) {}

  triggerHandler(target: Trigger) {}

  webuploaderHandler(target: WebUploader) {}

  appsidebarHandler(target: AppSidebar) {}

  appsidebaritemHandler(target: AppSidebarItem) {
    target.on('click', () => {
      this.log(
        {
          target: "Sidebar",
          data_action: "click",
          data_id: target.id,
          data_value: target.data.get('title')
        },
        target
      )
    })
  }

  applinkHandler() {}

  log(data: Data, target: any) {
    if (!target || !target.el) {
      return;
    }

    let logId = guid();

    const result = {
      ...data,
      logId,
      lastLogId: lStorage.get(LOG_ID),
      data_trackId: target.data.get("trackId"),
      data_trackName: target.data.get("trackName"),
      context_url: window.location.href.replace(/\?[^#]*/, ""),
      data_actionPath: window.location.href.replace(/(^.*#|~.*)/g, ""),
      page_view_id: page.getPageId(),
      sessionId: session.getCookieSessionId() || uid(),
    };

    // logId存localStorage
    lStorage.set(LOG_ID, logId);

    Request.trackRequest(result);
  }
}

const suiTrack = new SuiTrack();

export default suiTrack;
