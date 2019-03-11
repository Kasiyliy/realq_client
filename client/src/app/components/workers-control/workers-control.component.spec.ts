import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersControlComponent } from './workers-control.component';

describe('WorkersControlComponent', () => {
  let component: WorkersControlComponent;
  let fixture: ComponentFixture<WorkersControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkersControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkersControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
