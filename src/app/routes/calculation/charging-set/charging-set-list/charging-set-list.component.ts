import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CalculationService } from '../../service/calculation.service';
import { StowageTemplateComponent } from '../../stowage/stowage-template/stowage-template.component';
import { ChargingSetEditComponent } from '../charging-set-edit/charging-set-edit.component';

@Component({
  selector: 'app-charging-set-list',
  templateUrl: './charging-set-list.component.html',
  styles: [],
})
export class ChargingSetListComponent implements OnInit {
  searchForm: FormGroup;
  dataList = [];
  pageInfo = {
    pi: 1,
    ps: 10,
    total: 0,
    loading: false,
  };

  constructor(private calculationService: CalculationService, private fb: FormBuilder, private drawerService: NzDrawerService, private modalService: NzModalService) {
    this.searchForm = this.fb.group({
      name: null,
    });
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    const params = {
      ...this.searchForm.value,
      current: this.pageInfo.pi,
      size: this.pageInfo.ps,
      parentId: '0',
    };

    this.pageInfo.loading = true;
    this.calculationService.pageBillingRules(params).subscribe((res) => {
      console.log(res);
      this.dataList = res.records;
      this.pageInfo.total = res.total;
      this.pageInfo.loading = false;
    });
  }

  search(): any {
    this.pageInfo.pi = 1;
    this.load();
  }

  reset(): any {
    this.pageInfo.pi = 1;
    this.searchForm.reset();
    this.load();
  }

  add(): any {
    this.modalService.create({
      nzContent: ChargingSetEditComponent,
      nzTitle: '新建计费规则',
      nzFooter: null,
      nzWrapClassName: 'dasModal',
      nzWidth: '800px',
      nzBodyStyle: { height: '550px', overflow: 'auto', paddingBottom: '48px' },
    }).afterClose.subscribe((res) => {
      if (res) {
        // billingRules
        this.load();
      }
    });
  }

  template(data: any) {

  }

  details(data: any) {

  }

  remove(data: any) {

  }
}
