import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFlightsAdmin } from './all-flights-admin';

describe('AllFlightsAdmin', () => {
  let component: AllFlightsAdmin;
  let fixture: ComponentFixture<AllFlightsAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllFlightsAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllFlightsAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
