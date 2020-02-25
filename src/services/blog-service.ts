import { inject } from "aurelia";
import { MeService } from "./me-services";

@inject() 
export class BlogService {
  constructor(
    private _meService: MeService
  ) {}

  async loadPosts(options: ILoadPostOptions): Promise<IPostResult> {
    let url = `${this._meService.getInfo().wordpressUrl}/wp-json/wp/v2/posts?page=${options.page + 1}&per_page=${options.perPage}`;

    if (options.search) {
      url += "&search=".concat(encodeURIComponent(options.search));
    }
    if (options.tag) {
      url += "&tags=".concat(options.tag.id.toString());
    }

    const result = await fetch(url);
    const posts: IPost[] = await result.json();

    const totalPosts = parseInt(result.headers.get("x-wp-total"));

    return {
      posts,
      totalPosts,
      loadedPosts: (options.page * options.perPage) + posts.length
    };
  }
  async loadTags(): Promise<ITagResult> {
    const url = `${this._meService.getInfo().wordpressUrl}/wp-json/wp/v2/tags?per_page=25&orderby=count&order=desc`;

    const result = await fetch(url);
    const tags: ITag[] = await result.json();

    const totalTags = parseInt(result.headers.get("x-wp-total"));

    return {
      tags,
      totalTags,
      loadedTags: tags.length
    };
  }
  async loadCategories(): Promise<ICategoryResult> {
    const url = `${this._meService.getInfo().wordpressUrl}/wp-json/wp/v2/categories?per_page=100&orderby=description&order=asc`;

    const result = await fetch(url);
    const categories: ICategory[] = await result.json();

    const totalCategories = parseInt(result.headers.get("x-wp-total"));

    return {
      categories,
      totalCategories,
      loadedCategories: categories.length
    };
  }
}

export interface ILoadPostOptions {
  page: number;
  perPage: number;
  search: string;
  tag: ITag;
}
export interface IPostResult {
  posts: IPost[];
  loadedPosts: number;
  totalPosts: number;
}
export interface IPost {
  date: Date;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
}
export interface ITagResult {
  tags: ITag[];
  loadedTags: number;
  totalTags: number;
}
export interface ITag {
  id: number;
  name: string;
  description: string;
  count: number;
}
export interface ICategoryResult {
  categories: ICategory[];
  loadedCategories: number;
  totalCategories: number;
}
export interface ICategory {
  id: number;
  name: string;
  description: string;
  count: number;
}