import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalHelper } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CardService } from '../../card.service';
import { CardManageDebugComponent } from '../card-manage-debug/card-manage-debug.component';
import { CardManageEditComponent } from '../card-manage-edit/card-manage-edit.component';

@Component({
  selector: 'app-card-manage-list',
  templateUrl: './card-manage-list.component.html',
  styles: [],
})
export class CardManageListComponent implements OnInit {
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
      deviceNo: null,
    });
  }

  ngOnInit(): void {
    this.load();
  }

  search(): void {
    this.pageInfo.pi = 1;
    this.load();
  }

  load(): void {
    const params = {
      ...this.searchForm.value,
      current: this.pageInfo.pi,
      size: this.pageInfo.ps,
    };
    this.pageInfo.loading = true;
    this.cardService.devicePage(params).subscribe((res) => {
      this.dataList = res.records;
      this.pageInfo.total = res.total;
      this.pageInfo.loading = false;
    });
  }

  add(): void {
    this.modalService
      .create({
        nzContent: CardManageEditComponent,
        nzTitle: '新增',
        nzFooter: null,
        // nzWidth: '900px',
        nzBodyStyle: { height: '200px', overflow: 'auto' },
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
        nzContent: CardManageEditComponent,
        nzTitle: '编辑',
        nzFooter: null,
        nzComponentParams: { record },
        // nzWidth: '900px',
        nzBodyStyle: { height: '200px', overflow: 'auto' },
      })
      .afterClose.subscribe((res) => {
        if (res) {
          this.load();
        }
      });
  }

  remove(data: any): void {
    this.cardService.removeRemove(data?.id).subscribe((res) => {
      this.load();
    });
  }

  reset(): void {
    this.pageInfo.pi = 1;
    this.searchForm.reset();
    this.load();
  }

  debug(record: any): void {
    this.modalService.create({
      nzContent: CardManageDebugComponent,
      nzTitle: '调试',
      nzFooter: null,
      nzWidth: '1200px',
      nzComponentParams: { record },
      nzBodyStyle: { height: '700px', overflow: 'auto' },
    });
  }
}
