import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalHelper } from '@delon/theme';
import * as moment from 'moment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { CardManageEditComponent } from '../../card/card-manage/card-manage-edit/card-manage-edit.component';
import { CardService } from '../../card/card.service';
import { AppointmentAuditComponent } from '../appointment-audit/appointment-audit.component';
import { AppointmentCheckComponent } from '../appointment-check/appointment-check.component';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styles: [],
})
export class AppointmentListComponent implements OnInit {
  searchForm: FormGroup;
  dataList = [];
  pageInfo = {
    pi: 1,
    ps: 10,
    total: 0,
    loading: false,
  };

  constructor(
    private fb: FormBuilder,
    private modal: ModalHelper,
    private modalService: NzModalService,
    private cardService: CardService,
    private drawerService: NzDrawerService,
  ) {
    this.searchForm = this.fb.group({
      appointmentDate: new Date(),
      licenseNumber: null,
      status: 'IN_APPLICATION',
    });
  }

  ngOnInit(): void {
    this.load();
  }

  search(): void {
    this.pageInfo.pi = 1;
    this.load();
  }

  reset(): void {
    this.pageInfo.pi = 1;
    this.searchForm.reset({
      appointmentDate: moment(new Date()).format('YYYY-MM-DD'),
      status: 'IN_APPLICATION',
    });
    this.load();
  }

  load(): void {
    this.searchForm.patchValue({
      appointmentDate: moment(this.searchForm.value.appointmentDate).format('YYYY-MM-DD'),
    });
    const params = {
      ...this.searchForm.value,
      current: this.pageInfo.pi,
      size: this.pageInfo.ps,
    };
    this.pageInfo.loading = true;
    this.cardService.inAppointmentPage(params).subscribe((res) => {
      console.log(res);
      this.dataList = res.records;
      this.pageInfo.total = res.total;
      this.pageInfo.loading = false;
    });
  }

  change($event: any): any {
    this.load();
  }

  check(record: any): any {
    this.drawerService
      .create({
        nzContent: AppointmentCheckComponent,
        nzContentParams: {
          record,
        },
        nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' },
        nzTitle: '预约详情',
        nzWidth: '500px',
        nzHeight: '100%',
      })
      .afterClose.subscribe((res: any) => {
        console.log(res);
        if (res) {
          this.load();
        }
      });
  }

  audit(record: any): any {
    this.drawerService
      .create({
        nzContent: AppointmentAuditComponent,
        nzContentParams: {
          record,
        },
        nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' },
        nzTitle: '预约审核',
        nzWidth: '500px',
        nzHeight: '100%',
      })
      .afterClose.subscribe((res: any) => {
        if (res) {
          this.load();
        }
      });
  }

  export(): any {
    const data = {
      ...this.searchForm.value,
      // baseUrl: environment.MOBILE_URL + 'tellId=',
    };
    this.cardService.approveExport(data);
  }
}
