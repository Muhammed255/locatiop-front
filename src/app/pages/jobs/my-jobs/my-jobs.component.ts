import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    FormGroup,
    FormBuilder
} from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { CreateEditJobComponent } from '../create-edit-job/create-edit-job.component';
import { JobService } from 'src/app/services/job.service';
import { SingleJobComponent } from '../single-job/single-job.component';

@Component({
    selector: 'app-my-jobs',
    templateUrl: './my-jobs.component.html',
    styleUrls: ['./my-jobs.component.scss']
})
export class MyJobsComponent implements OnInit {
    jobs: any[];
    isLoading = false;
    jobForm: FormGroup;
    public searchText: string;
    public page:any;
    public showSearch:boolean = false;

    constructor(
        private jobService: JobService,
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        this.fetchJobs();
    }

    fetchJobs() {
        this.jobService.getJobs().subscribe(res => {
            this.jobs = res.jobs;
        });
    }

    public onPageChanged(event){
        this.page = event;
        this.fetchJobs();    
        document.getElementById('main').scrollTop = 0;
    }



    onADialogOpenPressed(jobId: string) {
        let options = {
            width: '550px',
            height: '600px',
            data: {}
        };

        if (jobId) {
            options.data = {
                jobId: jobId
            };
        }

        let dialogRef = this.dialog.open(CreateEditJobComponent, options);
        dialogRef
            .afterClosed()
            // @ts-ignore
            .filter(jobParams => typeof jobParams === 'object')
            .flatMap(result => {
                if (jobId) {
                    this.jobService.updateJob(
                        jobId,
                        result
                    ).subscribe(res => {
                        const index = this.jobs.findIndex(job => job._id === jobId);
                        this.jobs[index] = this.jobs;
                        this.fetchJobs();
                    })
                } else {
                    this.jobService.uploadJob(result).subscribe(res => {
                        this.jobs.push(result);
                        this.fetchJobs();
                    })
                }
            })
            .subscribe(
                (data: any) => {
                    this.isLoading = false;
                    this.fetchJobs();
                    if (jobId) {
                        
                        this.snackBar.open(
                            'Updated Successfully! ❤😁',
                            'Success',
                            {
                                duration: 5000
                            }
                        );
                    } else {
                        this.snackBar.open(
                            'Added Successfully! ❤😁',
                            'Success',
                            {
                                duration: 5000
                            }
                        );
                    }
                },
                error =>
                    this.HandleMessage(error, 'Failed to create store admin')
            );
    }


    public openMoreDataDialog(id: any){
        let dialogRef = this.dialog.open(SingleJobComponent, {
            data: {id: id}
        });
        dialogRef.afterClosed().subscribe(() => {
            console.log('done.....');
        });
    }


    HandleMessage(error, message) {
        this.isLoading = false;
        console.error(error);
        this.snackBar.open(message, 'Error', { duration: 5000 });
    }

    onDeleteJob(id: string) {
        this.jobService.deleteJob(id).subscribe(res => {
            this.isLoading = true;
            this.fetchJobs();
        })
    }

}
