import { inject } from "aurelia";
import { MeService } from "../../services/me-services";

@inject()
export class CodigoSocials {
  constructor(
    private _meService: MeService
  ) {
    this.info = _meService.getInfo();
  }

  info: any;

  onSocialClick(social) {
    window.open(social.url, "_blank");
  }
}