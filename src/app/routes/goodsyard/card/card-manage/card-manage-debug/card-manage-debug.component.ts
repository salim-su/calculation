import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CardService } from '../../card.service';

@Component({
  selector: 'app-card-manage-debug',
  templateUrl: './card-manage-debug.component.html',
  styles: [],
})
export class CardManageDebugComponent implements OnInit {
  @Input()
  record;
  dataSet = [];
  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cardService.getPoint(this.record?.deviceNo).subscribe((res) => {
      console.log(res);
      this.dataSet = res;
    });
  }
  timeMoment(time: any): any {
    return moment(time).format('YYYY-MM-DD HH:mm:ss');
  }
}
