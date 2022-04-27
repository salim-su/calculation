import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalHelper } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CardService } from '../../card.service';
import { CardPlanEditComponent } from '../card-plan-edit/card-plan-edit.component';

@Component({
  selector: 'app-card-plan-list',
  templateUrl: './card-plan-list.component.html',
  styles: [],
})
export class CardPlanListComponent implements OnInit {
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
      planNo: null,
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
    };
    this.pageInfo.loading = true;
    this.cardService.planPage(params).subscribe((res) => {
      console.log(res);
      this.dataList = res.records;
      this.pageInfo.total = res.total;
      this.pageInfo.loading = false;
    });
  }

  stop(data: any): void {
    this.cardService.planFinish(data?.id).subscribe((res) => {
      this.load();
    });
  }

  edit(record: any): void {
    this.modalService
      .create({
        nzContent: CardPlanEditComponent,
        nzTitle: '垛场明细' + (record?.stackName ? '-' + record?.stackName : ''),
        nzFooter: null,
        nzWidth: '1300px',
        nzComponentParams: { record },
        nzBodyStyle: { height: '650px', overflow: 'auto' },
      })
      .afterClose.subscribe((res) => {
        if (res) {
          this.load();
        }
      });
  }

  remove(data: any): void {
    this.cardService.planRemove(data?.id).subscribe((res) => {
      this.load();
    });
  }

  add(): void {
    this.modalService
      .create({
        nzContent: CardPlanEditComponent,
        nzTitle: '垛场明细',
        nzFooter: null,
        nzWidth: '900px',
        nzBodyStyle: { height: '500px', overflow: 'auto' },
      })
      .afterClose.subscribe((res) => {
        if (res) {
          this.load();
        }
      });
  }
}
