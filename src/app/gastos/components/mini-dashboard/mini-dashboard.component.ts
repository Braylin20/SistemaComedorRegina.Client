import {Component, effect, inject, input, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Gastos} from '../../interfaces/gastos.interface';
import {GastosService} from '../../service/gastos.service';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'index-mini-dashboard',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './mini-dashboard.component.html',
})
export class MiniDashboardComponent {

  private readonly gastoService = inject(GastosService)

  public gastos = input.required<Gastos[]>();
  public amountTotal = signal(0)
  public counTotal = signal(0)
  public maxExpense = signal<Gastos | null>(null)


  updateChartOnGastosChange = effect(() =>{
    const gastos = this.gastos()

    if(!gastos || gastos.length === 0)
      return;

    const {amountTotal, countTotal, maxExpense} = this.gastoService.calculateDashboard(gastos);

    this.amountTotal.set(amountTotal);
    this.counTotal.set(countTotal);
    this.maxExpense.set(maxExpense);
  })

}
