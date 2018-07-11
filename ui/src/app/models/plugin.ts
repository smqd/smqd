import { Base } from "./base";

class Instance {
  plugin: string;
  package: string;
  name: string;
  'auto-start': boolean;
  status: string;
}

class Plugin {
  package: string;
  name: string;
  instantiability: string;
  instances: Instance[];
  'class-archive': string;
  version: string;
  class: string;
  type: string;
}

export class PluginsResult extends Base {
  //code: number;
  result: {
    current_page: number;
    total_page: number;
    page_size: number;
    total_num: number;
    objects: Plugin[];
  }
}

export class PluginResult extends Base {
  //code: number;
  result: Plugin;
}

export class InstanceResult extends Base {
  constructor(obj) {
    super();
    obj && Object.assign(this, obj);
  }

  result: Instance;
}

export class ConfigResult extends Base {
  constructor(obj) {
    super();
    obj && Object.assign(this, obj);
  }
  
  result: {

  }
}