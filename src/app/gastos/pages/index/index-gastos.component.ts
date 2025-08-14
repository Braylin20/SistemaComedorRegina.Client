import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {GastosService} from '../../service/gastos.service';
import {Gastos} from '../../interfaces/gastos.interface';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {TitleComponent} from '../../../shared/components/title/title.component';
import {FilterComponent} from '../../components/filter/filter.component';
import {MiniDashboardComponent} from '../../components/mini-dashboard/mini-dashboard.component';
import {EditModalComponent} from '../../components/edit-modal/edit-modal.component';
import {baseUrl} from '../../../shared/constants/baseUrl';

@Component({
  selector: 'app-index',
  imports: [
    DatePipe,
    TitleComponent,
    FilterComponent,
    MiniDashboardComponent,
    EditModalComponent,
    CurrencyPipe
  ],
  templateUrl: './index-gastos.component.html',
  styleUrl: './index-gastos.component.css'
})
export class IndexGastosComponent implements OnInit{
  ngOnInit(): void {
      this.get()
  }
  private readonly gastosService: GastosService = inject(GastosService);
  public gastos: Gastos[] = [];
  public gastoToEdit = signal<Gastos | null>(null)
  protected showEditModal = signal(false);

  public get(){
    console.log(baseUrl + '/gastos');
    this.gastosService.get().subscribe({
      next: data => this.gastos = data
    })
  }

  public onGastosChange(gastos: Gastos[]){
    this.gastos = [...gastos];
  }

  public openEditModal(gastoToEdit: Gastos){
    this.gastoToEdit.set(gastoToEdit);
    this.showEditModal.set(true);
  }

  public closeEditModal(value: boolean){
    this.showEditModal.set(value);
  }
}
