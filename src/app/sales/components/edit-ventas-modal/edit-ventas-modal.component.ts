import {Component, inject, input, OnInit, output} from '@angular/core';
import {Gastos} from '../../../gastos/interfaces/gastos.interface';
import {Ventas} from '../../interfaces/ventas';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {GastosService} from '../../../gastos/service/gastos.service';
import {ToastrService} from 'ngx-toastr';
import {DateUtils} from '../../../utils/date-utils';
import {FormUtills} from '../../../utils/form-utills';
import {VentasService} from '../../services/ventas.service';
import {catchError, of, switchMap} from 'rxjs';

@Component({
  selector: 'edit-ventas-modal',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-ventas-modal.component.html',
  styleUrl: './edit-ventas-modal.component.css'
})
export class EditVentasModalComponent implements OnInit{

  readonly showEditModal = output<boolean>();
  readonly onVentasChange = output<Ventas[]>()
  readonly ventaToEdit  = input<Ventas | null>();

  protected readonly fb:FormBuilder = inject(FormBuilder);
  protected readonly ventasService = inject(VentasService);
  protected readonly toastService = inject(ToastrService);
  protected editForm!: FormGroup
  protected readonly dateUtils = DateUtils;
  protected readonly formUtils = FormUtills;

  ngOnInit(): void {
    this.buildForm()
  }
  public putGasto(){
    if(this.editForm.invalid){
      console.log('IValidooo');
      return;
    }
    console.log(this.editForm.value);
    this.ventasService.put(this.editForm.value).pipe(
      switchMap(() => this.ventasService.get()),
      catchError(() => {
        return of([])
      })
    ).subscribe({
      next: (ventasUpdated)=> {
        if(ventasUpdated.length !== 0 ){
          this.onVentasChange.emit(ventasUpdated);
          this.showEditModal.emit(false);
        }
      },
      complete: () => {
        this.toastService.success('Actualizado correntamente', 'Succeso',{
          progressBar: true,
          timeOut: 2000,
        })
      }
    });
  }

  public buildForm(){
    const venta =this.ventaToEdit()
    const fechaISO = venta?.fecha
      ? new Date(venta.fecha).toISOString().split('T')[0] // "YYYY-MM-DD"
      : '';
    this.editForm = this.fb.group({
      ventaId: [this.ventaToEdit()?.ventaId , Validators.required],
      monto: [this.ventaToEdit()?.monto, [Validators.required, Validators.min(1)]],
      fecha: [fechaISO, Validators.required],
    })
  }

  public onCloseEditModal() {
    this.showEditModal.emit(false)
  }

}
