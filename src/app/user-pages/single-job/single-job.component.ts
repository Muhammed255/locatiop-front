import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UserJobsService } from 'src/app/services/user-jobs.service';

@Component({
    selector: 'app-single-job',
    templateUrl: './single-job.component.html',
    styleUrls: ['./single-job.component.scss'],
})
export class SingleJobComponent implements OnInit {
    job: any;
    most_recent_jobs: any[];
    // public modalRef: BsModalRef;
    jobForm: FormGroup;

    constructor(
        private userJobsService: UserJobsService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('jobId')) {
                this.userJobsService
                    .finOneJob(paramMap.get('jobId'))
                    .subscribe((result) => {
                        this.job = result.job;
                    });
            }
        });

        this.userJobsService.getMostRecentJobs().subscribe((result) => {
            this.most_recent_jobs = result.jobs;
        });
        this.initForm();
    }

    public openModal(template: TemplateRef<any>) {
        // this.modalRef = this.modalService.show(template); // {3}
        console.log("clicked");
    }

    initForm() {
        this.jobForm = this.fb.group({
            uploaded_cv: ['', Validators.required],
            jobId: ['', Validators.required],
        });
    }

    applyForJob() {
        this.userJobsService
            .applyForJob(
                this.jobForm.value.jobId,
                this.jobForm.value.uploaded_cv
            )
            .subscribe((response) => {
                // this.modalRef.hide();
                this.snackBar.open(
                    'Your submittion to this job has been sent we will contact you soon on your mail',
                    'success',
                    { duration: 10000 }
                );
            });
    }
}
