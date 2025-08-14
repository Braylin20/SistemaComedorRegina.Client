import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Gastos} from '../interfaces/gastos.interface';
import {baseUrl} from '../../shared/constants/baseUrl';
import {DateUtils} from '../../utils/date-utils';

@Injectable({
  providedIn: 'root'
})
export class GastosService {

  private readonly httpLCient: HttpClient = inject(HttpClient);

  public get(): Observable<Gastos[]> {
    return this.httpLCient.get<Gastos[]>(`${baseUrl}/gastos`)
  }

  public save(gasto: Gastos): Observable<Gastos> {
    return this.httpLCient.post<Gastos>(`${baseUrl}/gastos`, gasto)
  }

  public put(gasto: Gastos): Observable<Gastos> {
    return this.httpLCient.put<Gastos>(`${baseUrl}/gastos/${gasto.gastoId}`, gasto)
  }

  public calculateDashboard(gastos: Gastos[]){
    const amountTotal = gastos.reduce((accum, gasto) =>accum + gasto.monto,0)
    const countTotal = gastos.reduce((accum, gasto) =>accum + 1,0)
    const maxExpense = gastos.reduce((max, gasto) =>
      gasto.monto > max.monto ? gasto : max
    );

    return {
      amountTotal,
      countTotal,
      maxExpense,
    }
  }

}
