import {Observable} from 'rxjs';
import {Gastos} from '../gastos/interfaces/gastos.interface';
import {HttpParams} from '@angular/common/http';
import {ParamsUtils} from './params-utils';
import {inject} from '@angular/core';
import {HttpServices} from '../Services/Http.Services';

export class DateUtils{

  static paramsUtils = ParamsUtils;

  public static getTodayDateString(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  public static getFirstDayOfCurrentMonth():string{
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}-1`;
  }
  public static getThreeLastMonths():string{
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1 -3).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  public static getStartOfYear():string{
    const today = new Date();
    const year = today.getFullYear();
    return `${year}-1-1`;
  }

  static getByDate(
    httpService: HttpServices,
    endpoint: string,
    type: string,
    description?: string,
    from?: string,
    to?: string,
  ): Observable<Gastos[]> {
    const desc = description ?? '';
    switch (type) {
      case 'today':
        const todayParams = this.paramsUtils.buildDateFilterParams(
          DateUtils.getTodayDateString(),
          DateUtils.getTodayDateString(),
          desc
        )
        return httpService.getGastosByParams(endpoint,todayParams);
      case 'month':
        const monthParams = this.paramsUtils.buildDateFilterParams(
          DateUtils.getFirstDayOfCurrentMonth(),
          DateUtils.getTodayDateString(),
          desc
        )
        return httpService.getGastosByParams(endpoint,monthParams);
      case '3 months':
        const threeLastMonthsParams = this.paramsUtils.buildDateFilterParams(
          DateUtils.getThreeLastMonths(),
          DateUtils.getTodayDateString(),
          desc
        )
        return httpService.getGastosByParams(endpoint,threeLastMonthsParams);
      case 'year':
        const currentYearParams = this.paramsUtils.buildDateFilterParams(
          DateUtils.getStartOfYear(),
          DateUtils.getTodayDateString(),
          desc
        )
        return httpService.getGastosByParams(endpoint,currentYearParams);
      case 'custom':
        const customDateParams =this.paramsUtils.buildDateFilterParams(from!, to!, desc)
        console.log('La fecha from es' +from);
        return httpService.getGastosByParams(endpoint,customDateParams);
      default:
        const descriptionParams = new HttpParams()
          .set('description', description ?? '')
        return httpService.getGastosByParams(endpoint,descriptionParams);
    }
  }
}
