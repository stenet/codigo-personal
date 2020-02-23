import { inject, bindable } from "aurelia";

@inject()
export class CodigoSkill {
  private MIN = 5;
  private MEDIUM = 7;

  @bindable name: string;
  @bindable level: number;

  levelStyle: any;

  afterBind() {
    const multiplier = 10;
    
    const percentage = (this.level * multiplier)
      .toString()
      .concat("%");

    const bgColor = this.getBackgroundColor();

    this.levelStyle = {
      "background": `linear-gradient(90deg, ${bgColor} 0%, ${bgColor} ${percentage}, white ${percentage})`
    };
  }

  private getBackgroundColor() {
    if (this.level < this.MIN) {
      return "#E25E5B";
    } else if (this.level < this.MEDIUM) {
      return "#F8CB30";
    } else {
      return "#5BCF80";
    }
  }
}