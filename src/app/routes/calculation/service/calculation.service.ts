import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FileUtils } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {

  constructor(private httpClient: _HttpClient, private fileUtils: FileUtils) {
  }

  pageReportForms(queryData: any): any {
    return this.httpClient.get('reportForms/pageReportForms', queryData);
  }

  /*归档*/
  archiveSubmit(data: any): any {
    return this.httpClient.post('reportForms/archive', data);
  }

  /*规则page*/
  pageBillingRules(data: any): any {
    return this.httpClient.get('config/pageBillingRules', data);
  }

  /*规则list  config/listBillingRules*/
  listBillingRules(data: any): any {
    return this.httpClient.get('config/listBillingRules', data);
  }

  // /reportForms/calculate
  calculate(data: any): any {
    return this.httpClient.post('reportForms/calculate', data);
  }

  /*日报表*/
  pageDaily(data: any): any {
    return this.httpClient.get('reportForms/pageDaily', data);
  }

  /*进出库配置*/
  inOutConfig(): any {
    return this.httpClient.get('config/inOutConfig');
  }

  // /config/modifyConfig
  modifyConfig(data: any): any {
    // return this.httpClient.post('config/modifyConfig', data);
    return this.httpClient.post('config/modifyConfig?id=' + data.id + '&type=' + data.type);
  }

  ///
  saveBillingRules(data: any): any {
    return this.httpClient.post('config/saveBillingRules', data);

  }

}
