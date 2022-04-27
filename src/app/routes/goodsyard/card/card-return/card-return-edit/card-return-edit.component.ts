import { Component, Input, OnInit } from '@angular/core';
import { ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CardService } from '../../card.service';

@Component({
  selector: 'app-card-return-edit',
  templateUrl: './card-return-edit.component.html',
  styles: [],
})
export class CardReturnEditComponent implements OnInit {
  @Input()
  record;

  constructor(
    private cardService: CardService,
    private modal: NzModalRef,
    private msgSrv: NzMessageService,


  ) {

  }

  ngOnInit(): void {
    console.log(this.record);
  }

  unbind(): void {
    this.cardService.truckBackCard(this.record?.id).subscribe(res => {
      this.msgSrv.success('解绑成功');
      this.close(true);
    });
  }

  close(fg?: boolean): void {
    this.modal.close(fg);
  }
}
