import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankaddeditComponent } from './bankaddedit.component';

describe('BankaddeditComponent', () => {
  let component: BankaddeditComponent;
  let fixture: ComponentFixture<BankaddeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankaddeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankaddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
