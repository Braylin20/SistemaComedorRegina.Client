import {HttpParams} from '@angular/common/http';

export class ParamsUtils{
  static buildDateFilterParams(from: string, to: string, description: string) {
    return new HttpParams()
      .set('from', from)
      .set('to', to)
      .set('description', description);
  }
}
