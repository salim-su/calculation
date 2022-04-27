import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CardService } from '../../card/card.service';

@Component({
  selector: 'app-safety-notify-list',
  templateUrl: './safety-notify-list.component.html',
  styles: [],
})
export class SafetyNotifyListComponent implements OnInit {
  inputValue?: string;

  constructor(
    private cardService: CardService,
    private msgSrv: NzMessageService,
  ) {
  }

  ngOnInit(): void {
    this.cardService.safetyInform().subscribe(res => {
      console.log(res);
      this.inputValue = res;
    });
  }

  save(): void {
    const postData = {
      content: this.inputValue,
    };
    this.cardService.safetyInformSubmit(postData).subscribe(res => {
      this.msgSrv.success('保存成功');
    });
  }
}
