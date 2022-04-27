import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalHelper } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CardPlanEditComponent } from '../../card-plan/card-plan-edit/card-plan-edit.component';
import { CardService } from '../../card.service';
import { CarBindEditComponent } from '../car-bind-edit/car-bind-edit.component';

@Component({
  selector: 'app-card-send-list',
  templateUrl: './card-send-list.component.html',
  styles: [],
})
export class CardSendListComponent implements OnInit {
  searchForm: FormGroup;
  dataList = [];
  pageInfo = {
    pi: 1,
    ps: 10,
    total: 0,
    loading: false,
  };

  constructor(private fb: FormBuilder, private modal: ModalHelper, private modalService: NzModalService, private cardService: CardService) {
    this.searchForm = this.fb.group({
      planName: null,
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
    this.searchForm.reset();
    this.load();
  }

  load(): void {
    const params = {
      ...this.searchForm.value,
      current: this.pageInfo.pi,
      size: this.pageInfo.ps,
      isFinished: 0,
    };
    this.pageInfo.loading = true;
    this.cardService.planPage(params).subscribe((res) => {
      console.log(res);
      this.dataList = res.records;
      this.pageInfo.total = res.total;
      this.pageInfo.loading = false;
    });
  }

  bind(record: any): void {
    this.modalService
      .create({
        nzContent: CarBindEditComponent,
        nzTitle: '发卡',
        nzFooter: null,
        nzWidth: '900px',
        nzComponentParams: {
          record,
        },
        nzBodyStyle: { height: '500px', overflow: 'auto' },
      })
      .afterClose.subscribe((res) => {
        this.load();
      });
  }
}
