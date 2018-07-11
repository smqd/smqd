export class Base {
  code: number;
  result: {};
}

export class Page {
  code: number;
  result: {
    current_page: number;
    total_page: number;
    page_size: number;
    total_num: number;
    objects: object;
  }
}