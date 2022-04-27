import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalHelper } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CardService } from '../../card/card.service';
import { LibraryRecordEditComponent } from '../library-record-edit/library-record-edit.component';

@Component({
  selector: 'app-library-record-list',
  templateUrl: './library-record-list.component.html',
  styles: [],
})
export class LibraryRecordListComponent implements OnInit {
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
    this.cardService.stackRecord(params).subscribe((res) => {
      console.log(res);
      this.dataList = res.records;
      this.pageInfo.total = res.total;
      this.pageInfo.loading = false;
    });
  }

  edit(record: any): void {
    let title;
    if (record?.type === 'IN') {
      title = '入库信息编辑';
    } else if (record?.type === 'OUT') {
      title = '出库信息编辑';
    }
    this.modalService
      .create({
        nzContent: LibraryRecordEditComponent,
        nzTitle: title,
        nzFooter: null,
        nzWidth: '700px',
        nzComponentParams: {
          record,
        },
        nzBodyStyle: { height: '500px', overflow: 'auto' },
      })
      .afterClose.subscribe((res) => {
        this.load();
      });
  }

  add(): void {
    this.modalService
      .create({
        nzContent: LibraryRecordEditComponent,
        nzTitle: '添加出入库信息',
        nzFooter: null,
        nzWidth: '700px',
        nzBodyStyle: { height: '500px', overflow: 'auto' },
      })
      .afterClose.subscribe((res) => {
        this.load();
      });
  }
}
