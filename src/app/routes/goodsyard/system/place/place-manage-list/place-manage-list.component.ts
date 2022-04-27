import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalHelper } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CardPlanEditComponent } from '../../../card/card-plan/card-plan-edit/card-plan-edit.component';
import { CardService } from '../../../card/card.service';
import { PlaceManageEditComponent } from '../place-manage-edit/place-manage-edit.component';

@Component({
  selector: 'app-place-manage-list',
  templateUrl: './place-manage-list.component.html',
  styles: [],
})
export class PlaceManageListComponent implements OnInit {
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

  load(): void {
    const params = {
      ...this.searchForm.value,
      current: this.pageInfo.pi,
      size: this.pageInfo.ps,
    };
    this.pageInfo.loading = true;
    this.cardService.fieldPage(params).subscribe((res) => {
      this.dataList = res.records;
      this.pageInfo.total = res.total;
      this.pageInfo.loading = false;
    });
  }

  edit(record: any): void {
    this.modalService
      .create({
        nzContent: PlaceManageEditComponent,
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
    this.cardService.fieldRemove(data?.id).subscribe((res) => {
      this.load();
    });
  }

  reset(): void {
    this.pageInfo.pi = 1;
    this.searchForm.reset();
    this.load();
  }

  add(): void {
    this.modalService
      .create({
        nzContent: PlaceManageEditComponent,
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
}
