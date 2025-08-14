import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {CurrencyPipe, DatePipe} from "@angular/common";
import {Ventas} from '../../interfaces/ventas';
import {VentasService} from '../../services/ventas.service';
import {MiniDashboardVentasComponent} from '../../components/mini-dashboard/mini-dashboard.component';
import {TitleComponent} from '../../../shared/components/title/title.component';
import {FilterComponent} from '../../../gastos/components/filter/filter.component';
import {Gastos} from '../../../gastos/interfaces/gastos.interface';
import {EditModalComponent} from '../../../gastos/components/edit-modal/edit-modal.component';
import {EditVentasModalComponent} from '../../components/edit-ventas-modal/edit-ventas-modal.component';

@Component({
  selector: 'app-index',
  imports: [
    CurrencyPipe,
    DatePipe,
    MiniDashboardVentasComponent,
    TitleComponent,
    FilterComponent,
    EditModalComponent,
    EditVentasModalComponent,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexVentasComponent implements OnInit{

  readonly ventasService = inject(VentasService);
  protected ventas = signal<Ventas[]>([])
  protected showEditModal = signal(false);
  public ventaToEdit = signal<Ventas | null>(null)

  ngOnInit(): void {
      this.getVentas()
  }
  public onVentasChange(ventas: Ventas[]){
    this.ventas.set(ventas);
  }
  public getVentas(){
    this.ventasService.get().subscribe({
      next: data => {
        this.ventas.set(data);
      }
    })
  }
  public openEditModal(ventaToEdit: Ventas){
    this.ventaToEdit.set(ventaToEdit);
    this.showEditModal.set(true);
  }

  public closeEditModal(value: boolean){
    this.showEditModal.set(value);
  }
}
