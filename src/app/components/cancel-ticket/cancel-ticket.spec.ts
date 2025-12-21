import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelTicket } from './cancel-ticket';

describe('CancelTicket', () => {
  let component: CancelTicket;
  let fixture: ComponentFixture<CancelTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelTicket]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelTicket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
