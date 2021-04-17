import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMasterAddEditComponent } from './product-master-add-edit.component';

describe('ProductMasterAddEditComponent', () => {
  let component: ProductMasterAddEditComponent;
  let fixture: ComponentFixture<ProductMasterAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMasterAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMasterAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
