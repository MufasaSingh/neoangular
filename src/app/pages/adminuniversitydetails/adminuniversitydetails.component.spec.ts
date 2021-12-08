import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminuniversitydetailsComponent } from './adminuniversitydetails.component';

describe('AdminuniversitydetailsComponent', () => {
  let component: AdminuniversitydetailsComponent;
  let fixture: ComponentFixture<AdminuniversitydetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminuniversitydetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminuniversitydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
