import { TestBed, inject } from '@angular/core/testing';

import { MqttMessageService } from './mqtt-message.service';

describe('MqttMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MqttMessageService]
    });
  });

  it('should be created', inject([MqttMessageService], (service: MqttMessageService) => {
    expect(service).toBeTruthy();
  }));
});
