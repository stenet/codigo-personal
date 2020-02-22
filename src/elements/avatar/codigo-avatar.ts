import { inject, bindable } from "aurelia";

@inject()
export class CodigoAvatar {
  @bindable imageUrl: string;
  @bindable dimension: number = 150;

  style: any;

  afterBind() {
    this.style = {
      "width": `${this.dimension}px`,
      "height": `${this.dimension}px`,
      "border-radius": `${this.dimension}px`
    };
  }
}