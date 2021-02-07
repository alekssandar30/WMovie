import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef  } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.scss']
})
export class VideoModalComponent implements OnInit {

  @Input() public hostLink;

  constructor(public domSanitizer: DomSanitizer, public dialogRef: MatDialogRef<VideoModalComponent>) { }

  ngOnInit(): void {
    console.log(this.hostLink);
  }

  close() {
    this.dialogRef.close();
  }

}
