import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {baseUrl} from '../../shared/constants/baseUrl';
import {Observable} from 'rxjs';
import {Ventas} from '../interfaces/ventas';
import {Gastos} from '../../gastos/interfaces/gastos.interface';


@Injectable({
  providedIn: 'root'
})
export class VentasService{

  private readonly httpClient = inject(HttpClient);

  public get(): Observable<Ventas[]>{
    return this.httpClient.get<Ventas[]>(`${baseUrl}/ventas`)
  }

  public post(venta: Ventas): Observable<Ventas>{
    return this.httpClient.post<Ventas>(`${baseUrl}/ventas`, venta);
  }
  public put(ventas: Ventas): Observable<Ventas> {
    return this.httpClient.put<Ventas>(`${baseUrl}/ventas/${ventas.ventaId}`, ventas)
  }
  public calculateDashboard(ventas: Ventas[]){
    const amountTotal = ventas.reduce((accum, gasto) =>accum + gasto.monto,0)
    const countTotal = ventas.reduce((accum, gasto) =>accum + 1,0)
    const maxAmount = ventas.reduce((max, gasto) =>
      gasto.monto > max.monto ? gasto : max
    );

    return {
      amountTotal,
      countTotal,
      maxAmount,
    }
  }

}
