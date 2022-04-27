import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { saveAs } from 'file-saver/src/FileSaver';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { SUploadService } from './s-upload.service';

@Component({
  selector: 'app-s-upload',
  templateUrl: './s-upload.component.html',
  styles: [],
})
export class SUploadComponent implements OnInit, OnChanges {
  @Input()
  isPicture = false;
  @Input()
  showPicPreview;
  @Input()
  uploadSingleFile;
  @Input()
  onlyPic;
  @Input()
  fileList: any = [];
  @Output()
  fileListChange = new EventEmitter();
  @Input()
  nzMultipleFlag = false;
  @Input()
  isEdit = true;
  @Input()
  ossIds;
  @Input()
  nzAcceptType = '';
  @Input()
  disableFlag = false;
  @Input()
  isDel = true;
  @Input()
  attachmentTitleFlag = false;
  @Input()
  fllFlag = false;
  @Output()
  sDelete = new EventEmitter();
  fallback: '/assets/img/file.png';
  picTypes: string[] = ['.jpg', '.png', 'jpeg', '.JPG', '.PNG', 'JPEG', '.GIF', '.gif'];

  goOn = true;

  constructor(
    public http: _HttpClient,
    public sUploadService: SUploadService,
    private msgSrv: NzMessageService,
    private imageService: NzImageService,
  ) {}

  ngOnInit(): void {
    if (this.ossIds) {
      this.sUploadService.getIds(this.ossIds).subscribe((res) => {
        const addFile = [];
        res.forEach((element) => {
          addFile.push({ ...element, url: element.link });
        });
        this.fileList = addFile;
        this.fileListChange.emit(this.fileList);
        console.log(this.fileList);
      });
    } else {
      this.fileList = [];
    }
  }

  change($event: NzUploadChangeParam): void {
    if ($event.type === 'start' && this.onlyPic) {
      if ($event.file.type.substring(0, 5) !== 'image') {
        this.msgSrv.error('只能上传图片');
        this.goOn = false;
      } else {
        this.goOn = true;
      }
    }
    if ($event.type === 'error') {
      this.msgSrv.warning('文件上传失败');
    }

    if ($event.type === 'success' && this.goOn) {
      if (this.uploadSingleFile) {
        this.fileList = [];
        $event.file.response.id = $event.file.response.attachId;
        this.fileList.push($event.file.response);
      } else {
        $event.file.response.id = $event.file.response.attachId;
        this.fileList.push($event.file.response);
      }
      this.fileListChange.emit(this.fileList);
      this.msgSrv.success('文件上传成功');
    }
    console.log(this.fileList);
  }

  // singleChange($event: NzUploadChangeParam) {
  //     console.log($event);
  //     if ($event.type === 'start' && this.onlyPic) {
  //         if ($event.file.type.substring(0, 5) !== 'image') {
  //             this.msgSrv.error('只能上传图片');
  //             this.goOn = false;
  //         } else {
  //             this.goOn = true;
  //         }
  //     }
  //
  //     if ($event['type'] === 'error' && this.goOn) {
  //         this.msgSrv.warning('文件上传失败');
  //     }
  //
  //
  // }

  show(item: any): void {
    const u = encodeURIComponent(window.btoa(item?.link));
    const url = environment.FILE_PREVIEW_URL + 'onlinePreview?url=' + u;
    window.open(url);
  }

  // 下载
  download(item: any): void {
    const url = item.link;
    this.http.request('GET', url, { responseType: 'blob' }).subscribe((res) => {
      const fileName = item.originalName;
      const blob = new Blob([res], { type: 'application/octet-stream' });
      saveAs(blob, fileName);
    });
  }

  // 删除

  del(index: any): void {
    this.fileList.splice(index, 1);
    this.fileListChange.emit(this.fileList);
    this.sDelete.emit(index);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.ossIds && !changes.ossIds.firstChange) {
      this.sUploadService.getIds(this.ossIds).subscribe((res) => {
        const addFile = [];
        res.forEach((element) => {
          addFile.push({ ...element, url: element.link });
        });
        this.fileList = addFile;
        this.fileListChange.emit(this.fileList);
      });
    }
    console.log(this.fileList);
  }
}
