import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CalculationService } from '../../service/calculation.service';

@Component({
  selector: 'app-outin-set-list',
  templateUrl: './outin-set-list.component.html',
  styles: [],
})
export class OutinSetListComponent implements OnInit {
  searchForm: FormGroup;
  dataList = [];
  pageInfo = {
    pi: 1,
    ps: 10,
    total: 0,
    loading: false,
  };

  constructor(
    private calculationService: CalculationService,
    private messageService: NzMessageService,
  ) {
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.pageInfo.loading = true;
    this.calculationService.inOutConfig().subscribe((res) => {
      console.log(res);
      this.dataList = res;
      this.pageInfo.loading = false;
    });
  }

  clickIn(e: any, data: any): any {
    console.log(e);
    console.log(data);
    if (e) {
      const postData = {
        type: 'IN',
        id: data?.id,
      };
      this.calculationService.modifyConfig(postData).subscribe(res => {
        this.messageService.success('操作成功');
        this.load();
      });
    }else{
      const postData = {
        type: '',
        id: data?.id,
      };
      this.calculationService.modifyConfig(postData).subscribe(res => {
        this.messageService.success('操作成功');
        this.load();
      });
    }

  }

  clickOut(e: any, data: any): any {
    if (e) {
      const postData = {
        type: 'OUT',
        id: data?.id,
      };
      this.calculationService.modifyConfig(postData).subscribe(res => {
        this.messageService.success('操作成功');
        this.load();
      });
    }else{
      const postData = {
        type: '',
        id: data?.id,
      };
      this.calculationService.modifyConfig(postData).subscribe(res => {
        this.messageService.success('操作成功');
        this.load();
      });
    }
  }
}
