import {Component, effect, inject, input, InputSignal, OnInit, output, signal, WritableSignal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Gastos} from '../../interfaces/gastos.interface';
import {GastosService} from '../../service/gastos.service';
import {catchError, of, switchMap} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {FormUtills} from '../../../utils/form-utills';
import {DateUtils} from '../../../utils/date-utils';

@Component({
  selector: 'gastos-edit-modal',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.css'
})
export class EditModalComponent implements OnInit{

  readonly showEditModal = output<boolean>();
  readonly onGastosChange = output<Gastos[]>()
  readonly gastoToEdit  = input<Gastos | null>();
  protected readonly fb:FormBuilder = inject(FormBuilder);
  protected readonly gastoService = inject(GastosService);
  protected readonly toastService = inject(ToastrService);
  protected editForm!: FormGroup
  protected readonly dateUtils = DateUtils;
  protected readonly formUtils = FormUtills;

  ngOnInit(): void {
    const gasto =this.gastoToEdit()
    const fechaISO = gasto?.fecha
      ? new Date(gasto.fecha).toISOString().split('T')[0] // "YYYY-MM-DD"
      : '';
    this.editForm = this.fb.group({
      gastoId: [this.gastoToEdit()?.gastoId , Validators.required],
      tipoGastoId: [this.gastoToEdit()?.tipoGastoId],
      descripcion: [this.gastoToEdit()?.descripcion, [Validators.required, Validators.minLength(4)]],
      monto: [this.gastoToEdit()?.monto, [Validators.required, Validators.min(1)]],
      fecha: [fechaISO, Validators.required],
    })
  }

  public putGasto(){
    if(this.editForm.invalid){
      console.log('IValidooo');
      return;
    }
    this.gastoService.put(this.editForm.value).pipe(
      switchMap(() => this.gastoService.get()),
      catchError(() => {
        return of([])
      })
    ).subscribe({
      next: (gastosUpdated)=> {
        if(gastosUpdated.length !== 0 ){
          console.log(gastosUpdated)
          this.onGastosChange.emit(gastosUpdated);
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

  public onCloseEditModal() {
    this.showEditModal.emit(false)
  }

}
