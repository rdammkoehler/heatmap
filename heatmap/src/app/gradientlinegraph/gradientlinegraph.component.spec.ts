import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientlinegraphComponent } from './gradientlinegraph.component';

describe('GradientlinegraphComponent', () => {
  let component: GradientlinegraphComponent;
  let fixture: ComponentFixture<GradientlinegraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradientlinegraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradientlinegraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
