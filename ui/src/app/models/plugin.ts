import { Base } from "./base";

class Instance {
  plugin: string;
  package: string;
  name: string;
  'auto-start': boolean;
  status: string;
}

export class InstanceResult extends Base {
  constructor(obj) {
    super();
    obj && Object.assign(this, obj);
  }

  result: Instance;
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


export class PluginConfigResult extends Base {
  constructor(obj) {
    super();
    obj && Object.assign(this, obj);
  }
  
  result: {
    'defult-config': {},
    'config-schema': {}
  }
}

export class InstanceConfig {
  constructor(obj) {
    obj && Object.assign(this, obj);
  }

  'auto-start': boolean;
  config: {};
}

export class InstanceConfigResult extends Base {
  constructor(obj) {
    super();
    obj && Object.assign(this, obj);
  }
  
  result: InstanceConfig
}

export class Column {
  key: string;
  title: string;
  type: string;
  placeHolder: string;
  value: any;
}

export class Section {
  title: string;
  rows: [{
    columns: Column[];
    type: string;
  }];
}

export class ConfigSchema {
  constructor(obj) {
    obj && Object.assign(this, obj);
  }

  sections: Section[];
}


export class InstanceFailureResult extends Base{
  result: {
    plugin: string;
    failure: {
      message: string;
      stack: string;
    }
  }
}