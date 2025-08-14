import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexGastosComponent } from './index-gastos.component';

describe('IndexComponent', () => {
  let component: IndexGastosComponent;
  let fixture: ComponentFixture<IndexGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexGastosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
