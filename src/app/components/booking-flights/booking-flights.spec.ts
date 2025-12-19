import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingFlights } from './booking-flights';

describe('BookingFlights', () => {
  let component: BookingFlights;
  let fixture: ComponentFixture<BookingFlights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingFlights]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingFlights);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
