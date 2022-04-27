import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  constructor(
    private httpClient: _HttpClient,
    private http: HttpClient,
  ) {
  }

  stackList(params: any): Observable<any> {
    return this.httpClient.get('yard/stack/list', params);
  }

  listLoader(params: any): Observable<any> {
    return this.httpClient.get('yard/mobileMachinery/list', params);
  }

  listCard(params: any): Observable<any> {
    return this.httpClient.get('yard/card/issueStatusTruckList', params);
  }

  getPoint(deviceNo: string): Observable<any> {
    return this.http.post('cardapi/workcard',
      'select last(*) from devices where device_no in (' + deviceNo + ') and latitude > 0 group by device_no;'
      , {
        headers: {
          Authorization: 'Basic cm9vdDo1eGU4TFlTRQ==',
        },
      }).pipe(
      map(({ status, data, head }: any) => {
        if (status === 'succ') {
          const device_no = head.indexOf('device_no');
          const latitude = head.indexOf('latitude');
          const longitude = head.indexOf('longitude');

          const res = {};
          data.forEach((v) => {
            res[v[device_no] as string] = [v[latitude], v[longitude]];
          });
          return res;
        }
      })
    );
  }

  getHistoryPoint(deviceNo: string, startDate: string, endDate: string): Observable<any> {
    return this.http.post('cardapi/workcard',
      'select * from d' + deviceNo + ' where ts > \'' + startDate + '\' and ts <= \'' + endDate + '\' and latitude > 0;'
      , {
        headers: {
          Authorization: 'Basic cm9vdDo1eGU4TFlTRQ==',
        },
      }).pipe(
      map(({ status, data, head }: any) => {
        if (status === 'succ') {
          const ts = head.indexOf('ts');
          const latitude = head.indexOf('latitude');
          const longitude = head.indexOf('longitude');

          const res = [];
          data.forEach((v) => {
            res.push({
              deviceNo,
              timespan: v[ts],
              point: [v[latitude], v[longitude]]
            });
          });
          return res;
        }
      })
    );
  }
}
