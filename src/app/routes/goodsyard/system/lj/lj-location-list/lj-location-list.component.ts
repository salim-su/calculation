import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalHelper } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CardPlanEditComponent } from '../../../card/card-plan/card-plan-edit/card-plan-edit.component';
import { CardService } from '../../../card/card.service';
import { LjLocationEditComponent } from '../lj-location-edit/lj-location-edit.component';

@Component({
  selector: 'app-lj-location-list',
  templateUrl: './lj-location-list.component.html',
  styles: [],
})
export class LjLocationListComponent implements OnInit {
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
  ) {
    this.searchForm = this.fb.group({
      name: null,
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
    console.log(params);
    this.pageInfo.loading = true;
    this.cardService.ljPage(params).subscribe((res) => {
      console.log(res);
      this.dataList = res.records;
      this.pageInfo.total = res.total;
      this.pageInfo.loading = false;
    });
  }


  add(): void {
    this.modalService
      .create({
        nzContent: LjLocationEditComponent,
        nzTitle: '新增',
        nzFooter: null,
        nzBodyStyle: { height: '300px', overflow: 'auto' },
      })
      .afterClose.subscribe((res) => {
      if (res) {
        this.load();
      }
    });
  }

  edit(record: any): void {
    this.modalService
      .create({
        nzContent: LjLocationEditComponent,
        nzTitle: '编辑',
        nzFooter: null,
        nzComponentParams: { record },
        nzBodyStyle: { height: '300px', overflow: 'auto' },
      })
      .afterClose.subscribe((res) => {
      if (res) {
        this.load();
      }
    });
  }

  remove(data: any): void {
    this.cardService.mobileMachineryRemove(data?.id).subscribe(res => {
      this.load();
    });
  }
}
