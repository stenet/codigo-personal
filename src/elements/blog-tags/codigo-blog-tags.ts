import { inject, bindable, BindingMode } from "aurelia";
import { BlogService, ITagResult, ITag } from "../../services/blog-service";

@inject()
export class CodigoBlogTags {
  constructor(
    private _blogService: BlogService
  ) {}

  tagResult: ITagResult;
  tags: ITag[];

  @bindable({mode: BindingMode.twoWay}) selectedTag: ITag = null;

  afterBind() {
    this.loadTags();
  }

  onTagClick(tag: ITag) {
    this.selectedTag = this.selectedTag == tag
      ? null
      : tag;
  }

  private async loadTags() {
    this.tagResult = await this._blogService.loadTags();

    const maxCount = Math.max(...this.tagResult.tags.map((c) => c.count));

    const div = 3;
    const div1 = Math.floor(maxCount / div);
    const div2 = div1 + div1;

    this.tags = this.tagResult.tags
      .map((c) => {
        if (c.count <= div1) {
          c["size"] = "s";
        } else if (c.count <= div2) {
          c["size"] = "m";
        } else {
          c["size"] = "l";
        }

        return c;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }
}