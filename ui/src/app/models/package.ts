import { Base } from "./base";

export class Package {
  name: string;
  version: string;
  installable: boolean;
  location: string;
  provider: string;
  description: string;
  installed: boolean;
  resolvers: string[];
  group: string;
  artifact: string;
}

export class Packages extends Base {
  //code: number;
  result: {
    current_page: number;
    total_page: number;
    page_size: number;
    total_num: number;
    objects: Package[];
  }
}

export class PackageExact extends Base {
  result: Package;
}