import { MonitoringModule } from './monitoring.module';

describe('MonitoringModule', () => {
  let monitoringModule: MonitoringModule;

  beforeEach(() => {
    monitoringModule = new MonitoringModule();
  });

  it('should create an instance', () => {
    expect(monitoringModule).toBeTruthy();
  });
});
