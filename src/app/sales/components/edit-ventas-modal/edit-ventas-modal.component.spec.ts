import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVentasModalComponent } from './edit-ventas-modal.component';

describe('EditVentasModalComponent', () => {
  let component: EditVentasModalComponent;
  let fixture: ComponentFixture<EditVentasModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditVentasModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVentasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
