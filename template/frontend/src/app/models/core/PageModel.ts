export class PageModel {
    page: number;
    size: number;
    order: string;
  
    constructor(page: number = 1, size: number = 10, order: string = "asc") {
      this.page = page;
      this.size = size;
      this.order = order;
    }
  }
  