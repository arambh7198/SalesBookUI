import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustvendaddeditComponent } from './custvendaddedit.component';

describe('CustvendaddeditComponent', () => {
  let component: CustvendaddeditComponent;
  let fixture: ComponentFixture<CustvendaddeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustvendaddeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustvendaddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
