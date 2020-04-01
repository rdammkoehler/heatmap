import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValvestateComponent } from './valvestate.component';

describe('ValvestateComponent', () => {
  let component: ValvestateComponent;
  let fixture: ComponentFixture<ValvestateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValvestateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValvestateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
