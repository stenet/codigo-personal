import { inject } from "aurelia";

import * as me from "../me.json";

@inject()
export class MeService {
  getInfo() {
    return me["default"]
      ? me["default"]
      : me;
  }
}