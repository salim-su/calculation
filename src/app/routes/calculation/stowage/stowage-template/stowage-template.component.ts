import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-stowage-template',
  templateUrl: './stowage-template.component.html',
  styles: [],
})
export class StowageTemplateComponent implements OnInit {
  @Input()
  record;
  listOfData: any;
  constructor(
    private nzModalRef: NzModalRef,
  ) {
  }

  ngOnInit(): void {
    console.log(this.record);
    this.listOfData = this.record;
  }

  close(): any {
    this.nzModalRef.close();
  }

  saveAndClose(): any {
    // this.nzModalRef.close();
  }
}
