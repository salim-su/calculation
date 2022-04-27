import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DashboardService } from './dashboard.service';

import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {
  i = 0;
  editId: string | null = null;
  listOfData = [];

  constructor(
    private dashboardService: DashboardService,
    private nzMessageService: NzMessageService,
  ) {
  }

  ngOnInit(): void {
    // const deviceNo = new Set(['res'].map(i => i.deviceNo).filter(i => i != null));
    const obj = { a: '123', b: '1' };
    // for (const key in obj) {
    //   if (!obj[key]) {
    //     return;
    //   }
    // }
    console.log(this.checkNull(obj));
  }

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        key: `${this.i}`,
        name: '',
        isDefault: ``,
      },
    ];
    this.i++;
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter((d) => d.key !== id);
  }

  sub(): any {
    // this.listOfData.forEach(res => {
    //   // this.checkNull(!res) ? this.nzMessageService.warning('请完善信息') : this.nzMessageService.warning('保存成功');
    //   if (this.checkNull(!res)) {
    //     this.nzMessageService.warning('请完善信息');
    //     return;
    //   }
    // });
    //
    // const a = [];
    for (const aElement of this.listOfData) {
      if (!this.checkNull(aElement)) {
        this.nzMessageService.warning('请完善信息');
        return;
      }
    }

    // this.nzMessageService.success('保存成功');
  }

  checkNull(params: any): any {
    const flag = true;
    for (const key in params) {
      if (params[key] !== '0' && !params[key]) {
        return false; // 终止程序
      }
    }
    return flag;
  }
}

