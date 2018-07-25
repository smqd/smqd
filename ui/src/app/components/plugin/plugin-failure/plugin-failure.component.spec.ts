import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PluginFailureComponent } from './plugin-failure.component';

describe('PluginFailureComponent', () => {
  let component: PluginFailureComponent;
  let fixture: ComponentFixture<PluginFailureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PluginFailureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PluginFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
