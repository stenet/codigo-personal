import { inject } from "aurelia";
import { MeService } from "./me-services";

@inject() 
export class BlogService {
  constructor(
    private _meService: MeService
  ) {}

  async load(page: number, perPage: number, search: string) {
    let url = `${this._meService.getInfo().wordpressUrl}/wp-json/wp/v2/posts?page=${page + 1}&per_page=${perPage}`;

    if (search) {
      url += "&search=".concat(encodeURIComponent(search));
    }

    const result = await fetch(url);
    const jsonResult = await result.json();

    return jsonResult;
  }
}