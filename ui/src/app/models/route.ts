import { Base } from "./base";

export class Routes extends Base {
  //code: number;
  result: {
    current_page: number;
    total_page: number;
    page_size: number;
    total_num: number;
    objects: [
      {
        topic: string;
        nodes: string;
      }
    ]
  }
}

// export class Route extends Page {
//   //code: number;
//   result: {
//     current_page: number;
//     total_page: number;
//     page_size: number;
//     total_num: number;
//     objects: [
//       {
//         topic: string;
//         nodes: string;
//       }
//     ]
//   }
// }

