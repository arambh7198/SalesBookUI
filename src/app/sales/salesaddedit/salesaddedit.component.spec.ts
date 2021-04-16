import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesaddeditComponent } from './salesaddedit.component';

describe('SalesaddeditComponent', () => {
  let component: SalesaddeditComponent;
  let fixture: ComponentFixture<SalesaddeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesaddeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesaddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
