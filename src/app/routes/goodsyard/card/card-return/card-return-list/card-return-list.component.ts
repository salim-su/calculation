import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalHelper } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CardService } from '../../card.service';
import { CardReturnEditComponent } from '../card-return-edit/card-return-edit.component';

@Component({
  selector: 'app-card-return-list',
  templateUrl: './card-return-list.component.html',
  styles: [],
})
export class CardReturnListComponent implements OnInit {
  searchForm: FormGroup;
  dataList = [];
  pageInfo = {
    pi: 1,
    ps: 100,
    total: 0,
    loading: false,
  };
  sel: any;

  constructor(private cardService: CardService, private modal: ModalHelper, private fb: FormBuilder, private modalService: NzModalService) {
    this.searchForm = this.fb.group({
      licenseNumber: null,
    });
  }

  ngOnInit(): void {
    this.load();
  }

  search(): void {
    this.load();
  }

  load(): void {
    const params = {
      ...this.searchForm.value,
      current: this.pageInfo.pi,
      size: this.pageInfo.ps,
    };
    this.pageInfo.loading = true;
    this.cardService.issueStatusTruckPage(params).subscribe((res) => {
      console.log(res);
      this.dataList = res.records;
      this.pageInfo.loading = false;
      // this.pageInfo.total = res.total;
      // this.pageInfo.loading = false;
    });
  }

  over(item: number): void {
    console.log(item);
    this.sel = item;
  }

  closeClick(record: any): void {
    this.modalService
      .create({
        nzContent: CardReturnEditComponent,
        nzTitle: '解绑车辆',
        nzFooter: null,
        // nzWidth: '900px',
        nzComponentParams: { record },
        nzBodyStyle: { height: '500px', overflow: 'auto' },
      })
      .afterClose.subscribe((res) => {
        if (res) {
          this.load();
        }
      });
  }

  reset(): void {
    this.pageInfo.pi = 1;
    this.searchForm.reset();
    this.load();
  }
}
