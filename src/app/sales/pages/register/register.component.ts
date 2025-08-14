import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DateUtils} from '../../../utils/date-utils';
import {FormUtills} from '../../../utils/form-utills';
import {VentasService} from '../../services/ventas.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterVentasComponent {

  private readonly ventasService = inject(VentasService)
  private readonly toastr = inject(ToastrService)
  fb = inject(FormBuilder)
  dateUtils = DateUtils
  formUtils = FormUtills
  ventasForm: FormGroup = this.fb.group({
    ventaId:[0, Validators.required],
    monto: [0, Validators.required],
    fecha: [this.dateUtils.getTodayDateString(), Validators.required],
  })

  public save(): void {
    if(this.ventasForm.invalid){
      console.log('invalid')
      this.ventasForm.markAllAsTouched()
      return;
    }
    this.ventasService.post(this.ventasForm.value)
      .subscribe({
        complete: () => {
          this.ventasForm.patchValue({
            fecha: this.dateUtils.getTodayDateString(),
            monto: 0
          });

          this.toastr.success("Agregado correctamente", 'Sucesso', {
            progressBar: true,
          });
        },
        error: (error) => {
          this.toastr.error(error);
        }
      })
  }
}
