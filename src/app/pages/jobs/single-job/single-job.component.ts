import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-single-job',
  templateUrl: './single-job.component.html',
  styleUrls: ['./single-job.component.scss']
})
export class SingleJobComponent implements OnInit {

  job: any;

  constructor(public dialogRef: MatDialogRef<SingleJobComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private jobService: JobService,
    public fb: FormBuilder) { }

  ngOnInit() {
    this.jobService.findOneJob(this.data.id).subscribe(response => {
      this.job = response.fetchedJob;
    })
  }

  close(): void {
    this.dialogRef.close();
  }

}
