import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminstudentdetailsComponent } from './adminstudentdetails.component';

describe('AdminstudentdetailsComponent', () => {
  let component: AdminstudentdetailsComponent;
  let fixture: ComponentFixture<AdminstudentdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminstudentdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminstudentdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
