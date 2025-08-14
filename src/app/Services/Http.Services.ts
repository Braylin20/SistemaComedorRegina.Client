import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Gastos} from '../gastos/interfaces/gastos.interface';
import {baseUrl} from '../shared/constants/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class HttpServices{
  private readonly httpClient = inject(HttpClient)


  public getGastosByParams(endpoint: string, params: HttpParams): Observable<any> {
    return this.httpClient.get<any>(`${baseUrl}/${endpoint}/filter`, {params});
  }
}
