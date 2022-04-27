import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CardService } from '../../card.service';

@Component({
  selector: 'app-card-order-send',
  templateUrl: './card-order-send.component.html',
  styles: [],
})
export class CardOrderSendComponent implements OnInit {
  @Input()
  record;
  cardNo: any;

  constructor(private msgSrv: NzMessageService, private cardService: CardService, private modal: NzModalRef) {}

  ngOnInit(): void {
    console.log(this.record);
  }

  // appointmentIssueCard
  send(): void {
    if (!this.cardNo) {
      this.msgSrv.warning('请输入卡号');
    } else {
      const postData = {
        appointmentId: this.record.id,
        cardNo: this.cardNo,
      };
      this.cardService.appointmentIssueCard(postData).subscribe((res) => {
        this.msgSrv.success('预约发卡成功');
        this.close(true);
      });
    }
  }

  close(fg?: boolean): void {
    this.modal.close(fg);
  }
}
