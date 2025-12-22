import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightInventory } from './flight-inventory';

describe('FlightInventory', () => {
  let component: FlightInventory;
  let fixture: ComponentFixture<FlightInventory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightInventory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightInventory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
