import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSuComponent } from './dashboard-su.component';

describe('DashboardSuComponent', () => {
  let component: DashboardSuComponent;
  let fixture: ComponentFixture<DashboardSuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
