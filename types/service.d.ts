/**
 * service声明文件
 *
 * @file service.d.ts
 * @author guyunlong
 */

declare namespace Service {
  type RouterType = "history" | "hash";

  type RouterEventType = "pushState" | "replaceState";

  type SessionType = "crossDomain" | "localStorage";

  interface Config {
    appkey: string;
    uploadUrl: string;
    autoTrack: boolean;
    autoHeatmap: boolean;
    autoVisual: boolean;
    autoHash: boolean;
    router: RouterType;
    session: SessionType;
  }

  interface RequestConfig {
    session: SessionType;
    uploadUrl: string;
  }

  interface Data {
    [key: string]: any;
  }

  interface LogData {
    target?: string,
    data_action?: string,
    data_id: number,
    data_track_id: string;
    data_track_name: string;
    data_content: string,
  }

  interface BaseData {
    actionTime: string;
    campaign_track: string | null;
    context_browser: string;
    context_device: string;
    context_os: string;
    context_url: string;
  }

  interface SessionData {
    sessionId: string;
    actionType: "session";
  }

  interface PageViewData {
    data_action: "actionLoad";
    data_module?: string;
    data_module_name?: string;
    data_module_session?: string;
    data_page_referrer: string;
    data_page_view_id: string;
    data_path: string;
    data_referrer: string;
    lastLogId: string;
    logId: string;
    page_view_id: string;
    sessionId: string;
    target: "SanPage";
    time?: number;
    data_url?: string; 
  }

  interface PageLeaveData {
    data_action: "actionLeave";
    data_from_module?: string;
    data_from_module_name?: string;
    data_from_path?: string;
    data_from_url?: string;
    data_lengthOfStay: number;
    data_module_session?: string;
    data_page_referrer: string;
    data_page_view_id: string;
    data_to_moduel_name?: string;
    data_to_module?: string;
    data_to_path: string;
    data_to_url: string;
    lastLogId: string;
    logId: string;
    page_view_id: string;
    sessionId: string;
    target: "SanPage"
  }

  interface BehaviourData {
    data_action: string;
    data_url: string;
    data_actionPath: string;
    data_id: string;
    data_content: string
    data_trackId: string;
    data_trackName: string;
    lastLogId: string;
    logId: string;
    page_view_id: string;
    sessionId: string;
    target: string;
    data_href?: string;
  }

  interface Browser {
    firefox: string;
    chrome: string;
    safari: string;
    opera: string;
    ie: string;
  }

  interface CookieOption {
    raw?: boolean;
    expires: number | Date;
    domain?: string;
    path?: string;
    secure?: boolean;
  }

  interface SuiData {
    data_action: string;
    data_actionPath: string;
    data_content?: string;
    data_id: number;
    data_lengthOfStay?: number;
    data_title?: string;
    data_trackId: string;
    data_trackName: string;
    data_value: string;
    data_field_name?: string;
    data_field_title?: string;
    data_filter_text?: string;
    data_filter_value?: string;
    lastLogId: string;
    logId: string;
    page_view_id: string;
    sessionId: string;
    target: string;
  }

  type ActionData =
  | PageViewData
  | PageLeaveData
  | BehaviourData
  | SessionData
  | SuiData;

  type TrackData = ActionData & BaseData;
}

export = Service;
