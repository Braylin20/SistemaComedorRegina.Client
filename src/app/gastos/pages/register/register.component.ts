import {Component, inject, OnInit} from '@angular/core';
import {GastosService} from '../../service/gastos.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Gastos} from '../../interfaces/gastos.interface';
import {ToastrService} from 'ngx-toastr';
import {FormUtills} from '../../../utils/form-utills';
import {DateUtils} from '../../../utils/date-utils';

@Component({
  selector: 'gastos-register',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{

  private readonly gastosService: GastosService = inject(GastosService);
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly toastr: ToastrService = inject(ToastrService);
  public readonly formUtils = FormUtills;
  public readonly dateUtils = DateUtils;

  public gastosForm: FormGroup = this.fb.group({
    tipoGastoId: [1],
    descripcion: [null, [Validators.required, Validators.minLength(4)]],
    monto: [0, [Validators.required, Validators.min(0)]],
    fecha: [this.dateUtils.getTodayDateString(), Validators.required],
  })

  public save(){
    if(this.gastosForm.invalid){
      this.gastosForm.markAllAsTouched()
      return;
    }
    this.gastosService.save(this.gastosForm.value).subscribe({
      next: result => {
        if (result) {
          console.log('Agregado com sucesso');
        }
      },
      complete: () => {
        this.gastosForm.reset({
          fecha: this.dateUtils.getTodayDateString(),
          tipoGastoId: 1
        })
        this.toastr.success("Agregado correctamente", 'Sucesso', {
          progressBar: true,
        });
      },
      error: err => {
        console.log(this.gastosForm.value)
        console.error('Error al guardar gasto', err);
        this.toastr.error('Ocurrió un error al guardar', 'Error');
      }
    })
  }

}
