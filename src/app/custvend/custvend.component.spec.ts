import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustvendComponent } from './custvend.component';

describe('CustvendComponent', () => {
  let component: CustvendComponent;
  let fixture: ComponentFixture<CustvendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustvendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustvendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
