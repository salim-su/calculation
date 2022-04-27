import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FileUtils } from '../../../shared/utils/fileUtils';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  baseUrl = 'tjpn4-tiog/';

  constructor(private httpClient: _HttpClient, private fileUtils: FileUtils, private http: HttpClient) {}

  planPage(queryData: any): any {
    return this.httpClient.get('yard/card/planPage', queryData);
  }

  fieldPage(queryData: any): any {
    return this.httpClient.get('yard/field/page', queryData);
  }

  devicePage(queryData: any): any {
    return this.httpClient.get('yard/device/page', queryData);
  }

  // yard/card/unapprovedAppointment appointmentId
  // yard/card/approvedAppointment

  unapprovedAppointment(data: any): any {
    return this.httpClient.post('yard/card/unapprovedAppointment', data);
  }

  approvedAppointment(appointmentId: any): any {
    // alert(appointmentId);
    return this.httpClient.post('yard/card/approvedAppointment?appointmentId=' + appointmentId);
  }

  truckListByPlanId(queryData: any): any {
    return this.httpClient.get('yard/card/truckListByPlanId', queryData);
  }

  appointmentDetailsById(queryData: any): any {
    return this.httpClient.get('yard/card/detailsById', queryData);
  }

  fieldList(): any {
    return this.httpClient.get('yard/field/list');
  }

  stackList(params: any): any {
    return this.httpClient.get('yard/stack/list', params);
  }

  inAppointmentList(params: any): any {
    return this.httpClient.get('yard/card/inAppointmentList', params);
  }

  inAppointmentPage(params: any): any {
    return this.httpClient.get('yard/card/inAppointmentPage', params);
  }

  planSubmit(data: any): any {
    return this.httpClient.post('yard/card/planSubmit', data);
  }

  fieldSubmit(data: any): any {
    return this.httpClient.post('yard/field/submit', data);
  }

  deviceSubmit(data: any): any {
    return this.httpClient.post('yard/device/submit', data);
  }

  planRemove(id: any): any {
    return this.httpClient.post('yard/card/planRemove?ids=' + id);
  }

  fieldRemove(id: any): any {
    return this.httpClient.post('yard/field/remove?ids=' + id);
  }

  removeRemove(id: any): any {
    return this.httpClient.post('yard/device/remove?ids=' + id);
  }

  removePlanTruck(id: any): any {
    return this.httpClient.post('yard/card/removePlanTruck?ids=' + id);
  }

  planFinish(id: any): any {
    return this.httpClient.post('yard/card/planFinish?id=' + id);
  }

  truckIssueCard(data: any): any {
    return this.httpClient.post('yard/card/truckIssueCard', data);
  }

  issueStatusTruckPage(queryData: any): any {
    return this.httpClient.get('yard/card/issueStatusTruckPage', queryData);
  }

  truckBackCard(id: any): any {
    return this.httpClient.post('yard/card/truckBackCard?id=' + id);
  }

  /*预约发卡*/
  appointmentIssueCard(data: any): any {
    return this.httpClient.post('yard/card/appointmentIssueCard', data);
  }

  /*安全告知*/

  // yard/safetyInform/getContent
  safetyInform(): any {
    return this.httpClient.get('yard/safetyInform/getContent');
  }

  safetyInformSubmit(data: any): any {
    return this.httpClient.post('yard/safetyInform/submit', data);
  }

  getPoint(deviceNo: string): Observable<any> {
    return this.http
      .post('cardapi/workcard', 'select * from devices where device_no=' + deviceNo + ' order by TS desc limit 100', {
        headers: {
          Authorization: 'Basic cm9vdDo1eGU4TFlTRQ==',
        },
      })
      .pipe(
        map(({ status, data, head }: any) => {
          return data;
          // if (status === 'succ') {
          //   const device_no = head.indexOf('device_no');
          //   const latitude = head.indexOf('latitude');
          //   const longitude = head.indexOf('longitude');
          //
          //   const res = {};
          //   data.forEach((v) => {
          //     res[v[device_no] as string] = [v[latitude], v[longitude]];
          //   });
          //   return res;
          // }
        }),
      );
  }

  /*帐号管理*/
  userPage(params: any): any {
    return this.httpClient.get('blade-user/page', params);
  }

  roleList(data: any): any {
    return this.httpClient.get('blade-system/role/list', data);
  }

  userSubmit(data): any {
    return this.httpClient.post('blade-user/submit', data);
  }

  userUpdate(data): any {
    return this.httpClient.post('blade-user/update', data);
  }

  /*修改系统密码*/
  changePassword(oldPassword: any, newPassword: any, newPassword1: any): any {
    return this.httpClient.post(
      'blade-user/update-password?oldPassword=' + oldPassword + '&newPassword=' + newPassword + '&newPassword1=' + newPassword1,
    );
  }

  /*帐号管理*/

  /*垛位接口*/
  stackPage(queryData: any): any {
    return this.httpClient.get('yard/stack/page', queryData);
  }

  stackRecord(queryData: any): any {
    return this.httpClient.get('yard/stackRecord/page', queryData);
  }

  removeStackRecord(id: any): any {
    return this.httpClient.post('yard/stackRecord/remove?ids=' + id);
  }

  stackRecordSubmit(data: any): any {
    return this.httpClient.post('yard/stackRecord/submit', data);
  }

  stackExcelExport(params: any): any {
    return this.fileUtils.export('yard/stack/export', params);
  }

  approveExport(params: any): any {
    return this.fileUtils.export('yard/card/excelApprove', params);
  }

  /*垛位接口*/

  /*流机定位*/
  ljPage(queryData: any): any {
    return this.httpClient.get('yard/mobileMachinery/page', queryData);
  }

  mobileMachinerySubmit(data: any): any {
    return this.httpClient.post('yard/mobileMachinery/submit', data);
  }

  mobileMachineryRemove(ids: any): any {
    return this.httpClient.post('yard/mobileMachinery/remove?ids=' + ids);
  }

  /*流机定位*/

  getCoorganizerIssueList(params: any): any {
    return this.httpClient.get(this.baseUrl + 'coorganizr/page', params);
  }

  // 审核意见接口
  getAuditList(params: any): any {
    return this.httpClient.post(this.baseUrl + 'audit/audit?topicId=' + params.topicId);
  }

  // 提交主办意见
  postCoorganizrComment(params: any): any {
    return this.httpClient.post(this.baseUrl + 'coorganizr/determine', params);
  }

  remove(data: any): any {
    return this.httpClient.post(this.baseUrl + 'topic/remove?ids=' + data.topicId);
  }
}
