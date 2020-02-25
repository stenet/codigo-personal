import { inject, bindable, BindingMode } from "aurelia";
import { BlogService, ICategoryResult, ICategory } from "../../services/blog-service";

@inject()
export class CodigoBlogCategories {
  constructor(
    private _blogService: BlogService
  ) {}

  categoryResult: ICategoryResult;
  categories: ICategory[];

  @bindable({mode: BindingMode.twoWay}) selectedCategory: ICategory;

  afterBind() {
    this.loadCategories();
  }

  onCategoryClick(category: ICategory) {
    this.selectedCategory = this.selectedCategory == category
      ? null
      : category;
  }

  private async loadCategories() {
    this.categoryResult = await this._blogService.loadCategories();
    this.categories = this.categoryResult.categories;
  }
}