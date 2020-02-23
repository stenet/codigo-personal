import { inject } from "aurelia";
import { BlogService } from "../../services/blog-service";

@inject()
export class CodigoBlog {
  private PAGE_SIZE = 5;

  private _currentPage: number;
  private _search: string;

  constructor(
    private _blogService: BlogService
  ) {}

  posts: any[];

  isLoading: boolean;
  showLoadMore: boolean;

  get search() {
    return this._search;
  }
  set search(value: string) {
    this._search = value;
    this.loadNextEntries(true);
  }

  afterBind() {
    this.loadNextEntries(true);
  }

  onLoadMoreClick() {
    this.loadNextEntries(false);
  }

  private async loadNextEntries(reset: boolean) {
    this.isLoading = true;

    if (reset) {
      this._currentPage = 0;
    }

    try {
      const posts = await this._blogService.load(this._currentPage, this.PAGE_SIZE, this.search);
      this.showLoadMore = posts.length == this.PAGE_SIZE;
      this._currentPage++;
  
      if (reset) {
        this.posts = [...posts];
      } else {
        this.posts.push(...posts);
      }
    } finally {
      this.isLoading = false;
    }
  }
}