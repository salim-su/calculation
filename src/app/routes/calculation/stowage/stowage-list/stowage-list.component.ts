import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalHelper } from '@delon/theme';
import * as moment from 'moment';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ChangePasswordComponent } from '../../../../layout/passport/change-password/change-password.component';
import {
  AppointmentCheckComponent,
} from '../../../goodsyard/appointment/appointment-check/appointment-check.component';
import { CalculationService } from '../../service/calculation.service';
import { StowageDetailComponent } from '../stowage-detail/stowage-detail.component';
import { StowageTemplateComponent } from '../stowage-template/stowage-template.component';

@Component({
  selector: 'app-stowage-list',
  templateUrl: './stowage-list.component.html',
  styles: [],
})
export class StowageListComponent implements OnInit {
  searchForm: FormGroup;
  dataList = [];
  pageInfo = {
    pi: 1,
    ps: 10,
    total: 0,
    loading: false,
  };

  constructor(private calculationService: CalculationService, private fb: FormBuilder,
              private modal: ModalHelper,
              private modalService: NzModalService,
              private drawerService: NzDrawerService,
  ) {
    this.searchForm = this.fb.group({
      shipName: null,
      cargoOwner: null,
      inDate: null,
      archive: '0',
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
      inDate: this.searchForm.value.inDate ? moment(this.searchForm.value.inDate).format('YYYY-MM-DD') : '',
    };
    this.pageInfo.loading = true;
    this.calculationService.pageReportForms(params).subscribe((res) => {
      console.log(res);
      this.dataList = res.records;
      this.pageInfo.total = res.total;
      this.pageInfo.loading = false;
    });
  }

  edit(data: any) {

  }

  remove(data: any) {

  }

  stop(data: any) {

  }

  search(): void {
    this.pageInfo.pi = 1;
    this.load();
  }

  reset(): void {
    this.pageInfo.pi = 1;
    this.searchForm.reset({
      archive: '0',
    });
  }

  pigeonhole(data: any): any {
    const postData = {
      outPlanId: data?.outPlanId,
      inPlanId: data?.inPlanId,
    };
    this.calculationService.archiveSubmit(postData).subscribe(res => {
      console.log(res);
      this.load();
    });
  }

  change($event: any): any {
    this.dataList = [];
    setTimeout(res => {
      // console.log(this.searchForm.value);
      this.load();
    }, 100);
  }


  template(data: any): any {
    const record = data?.billingRules;
    this.modalService.create({
      nzContent: StowageTemplateComponent,
      nzTitle: '计费模板',
      nzFooter: null,
      nzWrapClassName: 'dasModal',
      nzComponentParams: { record },
      nzBodyStyle: { height: '350px', overflow: 'auto', paddingBottom: '48px' },
    }).afterClose.subscribe((res) => {
      if (res) {
        // billingRules
      }
    });
  }

  details(record: any): any {
    this.drawerService
      .create({
        nzContent: StowageDetailComponent,
        nzContentParams: {
          record,
        },
        nzBodyStyle: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          'padding-bottom': '53px',
        },
        nzTitle: '仓储费明细表',
        nzWidth: 'calc(100% - 200px)',
        nzHeight: '100%',
      })
      .afterClose.subscribe((res: any) => {
      console.log(res);
      if (res) {
        // this.load();
      }
    });
  }
}
