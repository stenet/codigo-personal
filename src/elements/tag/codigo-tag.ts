import { inject, bindable } from "aurelia";

@inject()
export class CodigoTag {
  @bindable text: string;
  @bindable backgroundColor: string;
}