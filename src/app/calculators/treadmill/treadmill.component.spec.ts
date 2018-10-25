import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreadmillComponent } from './treadmill.component';

describe('TreadmillComponent', () => {
  let component: TreadmillComponent;
  let fixture: ComponentFixture<TreadmillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreadmillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreadmillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
