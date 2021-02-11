import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.scss'],
})
export class VideoModalComponent implements OnInit {
  // @Input() public hostLink;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public domSanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<VideoModalComponent>
  ) {}

  ngOnInit(): void {
    // console.log(this.hostLink);
  }

  close(): any {
    this.dialogRef.close();
  }
}
