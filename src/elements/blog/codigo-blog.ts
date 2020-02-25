import { inject } from "aurelia";
import { BlogService, IPostResult } from "../../services/blog-service";

@inject()
export class CodigoBlog {
  private PAGE_SIZE = 5;

  private _currentPage: number;
  private _search: string;

  constructor(
    private _blogService: BlogService
  ) {}

  postResult: IPostResult;
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
      this.postResult = await this._blogService.loadPosts(this._currentPage, this.PAGE_SIZE, this.search);
      this.showLoadMore = this.postResult.totalPosts > this.postResult.loadedPosts;
      this._currentPage++;
  
      if (reset) {
        this.posts = [...this.postResult.posts];
      } else {
        this.posts.push(...this.postResult.posts);
      }
    } finally {
      this.isLoading = false;
    }
  }
}