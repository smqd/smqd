export const Config = {
  httpEndpoint: "localhost:8080",
  httpsEndpoint: "localhost:8443",
  apiBaseUrl : "api/v1",
  // mqtt
  mqttConnectOption: {
    host: '127.0.0.1',
    port: 8086,
    clientId: 'SubClient_' + parseInt((new Date().getTime()).toString().substring(8,10).concat(Math.floor(Math.random() * 100)+'', '0')),
    will: null,
    username: null,
    password: null,
    path: '/',
    reconnectPeriod: false
  },
  mqttMetricTopic: {
    'topic':'$SYS/metric/data/#',
    'qos':0
  },
  mqttPlugInTopic: {
    'topic':'$SYS/plugins/events/#',
    'qos':0
  }
}
