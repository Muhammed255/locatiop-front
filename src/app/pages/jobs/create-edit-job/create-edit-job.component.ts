import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable, of } from 'rxjs';
import { TagModel } from 'ngx-chips/core/accessor';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { JobService } from 'src/app/services/job.service';

@Component({
    selector: 'app-create-edit-job',
    templateUrl: './create-edit-job.component.html',
    styleUrls: ['./create-edit-job.component.scss']
})
export class CreateEditJobComponent implements OnInit {
    jobForm: FormGroup;
    editableJobId: string;
    headerTitle = 'New Job';
    job: any;
    editor = ClassicEditor;

    constructor(
        public matDialogRef: MatDialogRef<CreateEditJobComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private jobService: JobService
    ) {}

    ngOnInit() {
        this.editableJobId = this.data.jobId;
        this.initForm();
        this.data = {
            title: this.jobForm.controls.title,
            description: this.jobForm.controls.description,
            experience_years: this.jobForm.controls.experience_years,
            experiences: this.jobForm.controls.experiences,
            skills: this.jobForm.controls.skills,
            age: this.jobForm.controls.age,
            salary: this.jobForm.controls.salary,
            location: this.jobForm.controls.location,
            job_type: this.jobForm.controls.job_type,
            job_gender: this.jobForm.controls.job_gender,
            qualification: this.jobForm.controls.qualification,
            career_level: this.jobForm.controls.career_level
        };

        if (this.editableJobId) {
            this.setProductToForm(this.editableJobId);
            this.headerTitle = 'Edit Job';
        }
    }

    onNoClick(): void {
        this.matDialogRef.close();
    }

    private initForm() {
        this.jobForm = this.fb.group({
            title: ['', Validators.required],
            experiences: ['', Validators.required],
            description: ['', Validators.required],
            experience_years: ['', Validators.required],
            skills: ['', Validators.required],
            age: ['', Validators.required],
            salary: ['', Validators.required],
            location: ['', Validators.required],
            job_type: ['', Validators.required],
            job_gender: ['', Validators.required],
            qualification: ['', Validators.required],
            career_level: ['', Validators.required]
        });
    }

    setProductToForm(id: string) {
        this.jobService.findOneJob(id).subscribe(response => {
            this.jobForm.patchValue(response.fetchedJob);
        });
    }

    onItemAdded(tag): Observable<string> {
        console.log(tag);
        return of(tag)
    }

    adding(item: TagModel) {
        console.log(item);
    }
}
