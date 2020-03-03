import { inject } from "aurelia";

@inject()
export class CodigoNav {
  onNavItemClick(ev: any) {
    ev.preventDefault();
    ev.stopPropagation();

    const target: HTMLAnchorElement = ev.target;
    const hash = target.hash;

    if (!hash) {
      window.scrollTo({top: 0, behavior: "smooth"});
      return;
    }

    const el = document.querySelector(hash);
    if (!el) {
      return;
    }

    const offset = -50;
    const y = el.getBoundingClientRect().top + window.pageYOffset + offset;

    window.scrollTo({top: y, behavior: "smooth"});
  }
}