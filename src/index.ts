/**
 * monitor 监控初始化
 *
 * @file monitor.ts
 * @author guyunlong
 */

import { defaultConfig } from "./helper/config";
import { Config } from "../types/service";
import Request from "./service/request";
import sessionView from "./action/session_view";
import pageView from "./action/page_view";
import behaviour from "./action/behaviour";
import visual from "./action/visual";
import heatmap from "./action/heatmap";
import suiTrack from "./plugin/suiTrack";

class Track {
  private isMonitorInstall: boolean;
  private config: Config;

  constructor() {
    this.isMonitorInstall = false;
    this.config = defaultConfig;
  }

  public install(config: Config) {
    if (!this.isMonitorInstall) {
      this.config = Object.assign(defaultConfig, config);

      const {
        session,
        autoVisual,
        autoHeatmap,
        autoTrack,
        uploadUrl,
      } = this.config;

      Request.install({ uploadUrl, session });

      // 初始化sessionView模块
      // sessionView.init({ session });

      // 初始化pageView模块
      // pageView.init({
      //   session,
      //   router: this.config.router,
      // });

      if (autoTrack) {
        // 初始化behaviour模块
        behaviour.install({ session });
      }

      // iframe嵌入时初始化visual模块
      if (autoVisual && window.top !== window) {
        visual.install({});
      }

      // iframe嵌入时初始化heatmap模块
      if (autoHeatmap && window.top !== window) {
        heatmap.install({});
      }
    }

    this.isMonitorInstall = true;
  }

  unInstall() {
    this.isMonitorInstall = false;

    // 卸载之后，所有数据不上报
    Request.unInstall();
  }
}

let track = new Track();

export default {
  install: track.install,
  trackLog: Request.trackBehaviour,
  suiTrack: suiTrack.activate.bind(suiTrack),
  unInstall: track.unInstall,
};
