import { inject } from "aurelia";
import { MeService } from "../../services/me-services";

@inject()
export class CodigoSkills {
  constructor(
    private _meService: MeService
  ) {
    this.info = _meService.getInfo();
  }

  info: any;
}