import { inject } from "aurelia";

@inject()
export class CodigoImages {
  private IMAGE_COUNT = 8;
  
  private _timeout: any;
  private _lastImage: number;

  constructor(
    private _element: Element
  ) {}

  oldImage: HTMLDivElement;
  newImage: HTMLDivElement;

  afterBind() {
    this.initRefresh();
    this.setRandomImage(this.oldImage);
  }
  afterUnbind() {
    clearTimeout(this._timeout);
  }

  private initRefresh() {
    this._timeout = setTimeout(() => {
      this.refreshImage();
      this.initRefresh();
    }, 8000);
  }
  private refreshImage() {
    if (this.newImage) {
      if (this.oldImage) {
        this._element.removeChild(this.oldImage);
      }

      this.oldImage = this.newImage;
      this.newImage = null;
    }

    this.newImage = document.createElement("div");
    this.newImage.classList.add("codigo-image");
    this.setRandomImage(this.newImage);

    this._element.appendChild(this.newImage);

    setTimeout(() => {
      if (this.oldImage) {
        this.oldImage.classList.add("hide");
      }
  
      this.newImage.classList.add("show");
    });
  }
  private setRandomImage(div: HTMLDivElement) {
    while (true) {
      const number = Math.ceil(Math.random() * this.IMAGE_COUNT);
      if (number == this._lastImage) {
        continue;
      }

      this._lastImage = number;
      const fileName = "image".concat(number.toString().padStart(2, "0"));
  
      div.style.backgroundImage = `url("resources/${fileName}.svg")`;
      break;
    }
  }
}