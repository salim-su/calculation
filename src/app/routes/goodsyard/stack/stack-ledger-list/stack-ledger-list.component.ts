import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalHelper } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CardManageEditComponent } from '../../card/card-manage/card-manage-edit/card-manage-edit.component';
import { CardService } from '../../card/card.service';

@Component({
  selector: 'app-stack-ledger-list',
  templateUrl: './stack-ledger-list.component.html',
  styles: [],
})
export class StackLedgerListComponent implements OnInit {
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
      stackName: null,
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
    this.cardService.stackPage(params).subscribe((res) => {
      console.log(res);
      this.dataList = res.records;
      this.pageInfo.total = res.total;
      this.pageInfo.loading = false;
    });
  }

  //
  // gogogo() {
  //   this.modalService
  //     .create({
  //       nzContent: CardManageEditComponent,
  //       nzTitle: '新增',
  //       nzFooter: null,
  //       // nzWidth: '900px',
  //       nzBodyStyle: { height: '200px', overflow: 'auto' },
  //     });
  // }
  //
  // koko() {
  //   window.scrollTo(100,500);
  // }
  export(): any {
    const data = {
      ...this.searchForm.value,
      // baseUrl: environment.MOBILE_URL + 'tellId=',
    };
    this.cardService.stackExcelExport(data);
  }
}
