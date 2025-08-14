import {Component, effect, inject, input, signal} from '@angular/core';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {Ventas} from '../../interfaces/ventas';
import {VentasService} from '../../services/ventas.service';

@Component({
  selector: 'ventas-mini-dashboard',
  imports: [
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './mini-dashboard.component.html',
})
export class MiniDashboardVentasComponent {

  private readonly ventasService = inject(VentasService)

  public ventas = input.required<Ventas[]>();
  public amountTotal = signal(0)
  public counTotal = signal(0)
  public maxAmount = signal<Ventas | null>(null)


  updateChartOnGastosChange = effect(() =>{
    const gastos = this.ventas()

    if(!gastos || gastos.length === 0)
      return;

    const {amountTotal, countTotal, maxAmount} = this.ventasService.calculateDashboard(gastos);

    this.amountTotal.set(amountTotal);
    this.counTotal.set(countTotal);
    this.maxAmount.set(maxAmount);
  })

}
