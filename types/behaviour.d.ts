/**
 * behaviour声明文件
 *
 * @file behaviour.d.ts
 * @author guyunlong
 */

import { SessionType } from "./service";

declare namespace Behaviour {
  interface BehaviourConfig {
    session: SessionType;
  }
}

export = Behaviour;
