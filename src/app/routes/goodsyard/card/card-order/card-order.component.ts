import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalHelper } from '@delon/theme';
import * as moment from 'moment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CardService } from '../card.service';
import { CardOrderSendComponent } from './card-order-send/card-order-send.component';

@Component({
  selector: 'app-card-order',
  templateUrl: './card-order.component.html',
  styles: [],
})
export class CardOrderComponent implements OnInit {
  dataList = [];
  searchForm: FormGroup;
  pageInfo = {
    pi: 1,
    ps: 100,
    total: 0,
    loading: false,
  };
  sel: any;

  constructor(private cardService: CardService, private modal: ModalHelper, private fb: FormBuilder, private modalService: NzModalService) {
    this.searchForm = this.fb.group({
      appointmentDate: new Date(),
      licenseNumber: null,
    });
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.searchForm.patchValue({
      appointmentDate: moment(this.searchForm.value.appointmentDate).format('YYYY-MM-DD'),
    });

    const params = {
      ...this.searchForm.value,
    };
    this.pageInfo.loading = true;
    this.cardService.inAppointmentList(params).subscribe((res) => {
      console.log(res);
      this.dataList = res;
      this.pageInfo.loading = false;
    });
  }

  search(): void {
    this.load();
  }

  closeClick(record: any): void {
    this.modalService
      .create({
        nzContent: CardOrderSendComponent,
        nzTitle: '预约发卡',
        nzFooter: null,
        // nzWidth: '900px',
        nzComponentParams: { record },
        nzBodyStyle: { height: '300px', overflow: 'auto' },
      })
      .afterClose.subscribe((res) => {
        if (res) {
          this.load();
        }
      });
  }

  reset(): void {
    this.searchForm.patchValue({
      licenseNumber: '',
    });

    this.load();
  }
}
