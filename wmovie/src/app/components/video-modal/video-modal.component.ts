import {
  Component,
  OnInit,
  Inject,
  Input,
  ElementRef,
  Renderer2,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.scss'],
})
export class VideoModalComponent implements OnInit, AfterViewInit {
  // @Input() public hostLink;
  // 2. nacin za refresh iframe-a sa kesirajem iframea....
  // @Input()
  // public get cachedSrc(): string {
  //   return this.elRef.nativeElement.src;
  // }
  // public set cachedSrc(src: string) {
  //   if (this.elRef.nativeElement.src !== src) {
  //     this.renderer.setAttribute(this.elRef.nativeElement, 'src', src);
  //   }
  // }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // private elRef: ElementRef,
    // private renderer: Renderer2,
    public domSanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<VideoModalComponent>,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // console.log(this.hostLink);
  }

  ngAfterViewInit(): void {
    this.ref.detach();
  }

  close(): any {
    this.dialogRef.close();
  }
}
