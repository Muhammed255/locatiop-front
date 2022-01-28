import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserJobsService } from 'src/app/services/user-jobs.service';

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.scss']
})
export class AllJobsComponent implements OnInit, OnDestroy {

  jobs: any[];
  auth_user: any;
  fav_icon: string = '';
  searchForm: FormGroup;

  now: any = new Date();

  lastHour: any = 0;
  last1Days: any = 0;
  last7Days: any = 0;
  last14Days: any = 0;
  last1Month: any = 0;

  /* lastHour: any = this.now.getHours() - 1;
  last1Days: any = this.now.getDay() - 1;
  last7Days: any = this.now.getDay() - 7;
  last14Days: any = this.now.getDay() - 14;
  last1Month: any = this.now.getMonth() - 1; */


  constructor(
    private userservice: UserJobsService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getJobs();
    this.renderer.addClass(this.document.body, 'body');
    this.userservice.findOneUser(localStorage.getItem('userId')).subscribe(result => {
      this.auth_user = result.user;
    })
    this.initForm();
  }

  initForm() {
    this.searchForm = this.fb.group({
      job_search: [''],
      job_type: [''],
      createdAt: ['']
    })
  }

  onAddToShortList(jobId) {
    if (this.fav_icon === 'favorite_border') {
      this.userservice.addJobToShortlist(jobId).subscribe(res => {
        this.fav_icon === 'favorite';
        this.snackBar.open('Job added to your shortlist', 'success', {duration: 5000})
      })
    } else {
      this.userservice.removeJobFromShortlist(jobId).subscribe(res => {
        this.fav_icon === 'favorite_border';
        this.snackBar.open('Job removed from your shortlist', 'success', {duration: 5000})
      })
    }
  /*   this.userservice.findOneUser(localStorage.getItem('userId')).subscribe(result => {
      if(result.user.job_shortlist.includes(jobId)) {
        this.userservice.addJobToShortlist(jobId).subscribe(res => {
          this.snackBar.open('Job added to your shortlist', 'success', {duration: 5000})
        })
      } else {
        this.userservice.removeJobFromShortlist(jobId).subscribe(res => {
          this.snackBar.open('Job removed from your shortlist', 'success', {duration: 5000})
        })
      }
    }) */
  }

  getJobs() {
    this.userservice.getUserJobs().subscribe(result => {
      this.jobs = result.jobs;
      this.userservice.findOneUser(localStorage.getItem('userId')).subscribe(response => {
        this.auth_user = response.user;
        this.jobs.forEach(job => {
          if(response.user.job_shortlist.includes(job._id)) {
            this.fav_icon = 'favorite';
          } else {
            this.fav_icon = 'favorite_border';
          }
        });
      })
    })
  }

  onSearch() {
    this.lastHour = this.now.getHours() - 1;
    this.last1Days = this.now.getDay() - 1;
    this.last7Days = this.now.getDay() - 7;
    this.last14Days = this.now.getDay() - 14;
    this.last1Month = this.now.getMonth() - 1;
    const jobType = this.searchForm.get('job_type').value;
    const createdAt = this.searchForm.get('createdAt').value;
    const location = this.searchForm.get('location').value;
    const jobSearch = this.searchForm.get('job_search').value;

    this.userservice.job_search(jobSearch, location, createdAt, jobType).subscribe(result => {
      console.log(result.search_data);
    })
  }



  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'body');
  }

}
