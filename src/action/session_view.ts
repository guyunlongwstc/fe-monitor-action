/**
 * session模块
 *
 * @file session_view.ts
 * @author guyunlong
 */

import { SessionConfig } from "../../types/action";
import Request from "../service/request";
import session from "../service/session";

class SessionView {
  public install(config: SessionConfig) {
    let sessionId = session.getSessionId(config.session);

    if (!sessionId) {
      sessionId = session.setSessionId(config.session);
      Request.trackRequest({ sessionId });
    }
  }
}

const sessionView = new SessionView();
export default sessionView;
