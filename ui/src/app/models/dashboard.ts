import { Base } from "./base";

export class Version extends Base {
  //code: number;
  result: {
    version: string;
    commitVersion: string;
    nodename: string;
    jvm: string;
  }
}

export class Node {
  nodeName: string;
  dataCenter: string;
  roles: [
    string
  ];
  isLeader: boolean;
  status: string;
  address: string;
  api: {
    address: string,
    secureAddress: string
  }
}

export class NodesResult extends Base {
  //code: number;
  result: Node[];
}

export class NodeResult extends Base {
  result: Node;
}

export class MetricsResult extends Base {
  result: {
  }
}