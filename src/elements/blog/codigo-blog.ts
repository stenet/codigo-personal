import { inject, IScheduler } from "aurelia";
import { BlogService, IPostResult, ITag, ICategory } from "../../services/blog-service";

@inject()
export class CodigoBlog {
  private PAGE_SIZE = 5;

  private _currentPage: number;
  private _search: string;
  private _selectedTag: ITag;
  private _selectedCategory: ICategory;

  constructor(
    private _element: Element,
    private _blogService: BlogService,
    @IScheduler private _scheduler: IScheduler
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

  get selectedTag(): ITag {
    return this._selectedTag;
  }
  set selectedTag(value: ITag) {
    this._selectedTag = value;
    this.loadNextEntries(true);
  }

  get selectedCategory(): ICategory {
    return this._selectedCategory;
  }
  set selectedCategory(value: ICategory) {
    this._selectedCategory = value;
    this.loadNextEntries(true);
  }

  afterBind() {
    this.loadNextEntries(true);
  }

  onLoadMoreClick() {
    this.loadNextEntries(false);
  }

  private isSafari() {
    const agent = navigator.userAgent.toLowerCase(); 
    
    if (agent.indexOf("safari") < 0) {
      return false;
    }
    
    if (agent.indexOf("chrome") >= 0) {
      return false;
    }

    return true;
  }
  private async loadNextEntries(reset: boolean) {
    this.isLoading = true;

    if (reset) {
      this._currentPage = 0;
    }

    try {
      this.postResult = await this._blogService.loadPosts({
        page: this._currentPage,
        perPage: this.PAGE_SIZE,
        search: this.search,
        tag: this.selectedTag,
        category: this.selectedCategory
      });

      this.showLoadMore = this.postResult.totalPosts > this.postResult.loadedPosts;
      this._currentPage++;
  
      if (reset) {
        this.posts = [...this.postResult.posts];
      } else {
        this.posts.push(...this.postResult.posts);
      }

      this.scheduleSafariSrcsetFix();
    } finally {
      this.isLoading = false;
    }
  }

  private scheduleSafariSrcsetFix() {
    if (!this.isSafari()) {
      return;
    }

    this._scheduler.queuePostRenderTask(() => {
      const images = this._element.querySelectorAll("img[srcset][src]");
      images.forEach((image: HTMLImageElement) => image.src += "");
    });
  }
}