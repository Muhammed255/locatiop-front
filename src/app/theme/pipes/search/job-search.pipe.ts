import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'JobSearchPipe', pure: false
})
export class JobSearchPipe implements PipeTransform {

  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(job => {
        if (job.title) {
          return job.title.search(searchText) !== -1;
        }
        else if (job.description){
          return job.description.search(searchText) !== -1;
        }
        else if (job.job_type){
          return job.job_type.search(searchText) !== -1;
        }
        else if (job.location){
          return job.location.search(searchText) !== -1;
        }
        else if (job.description){
          return job.description.search(searchText) !== -1;
        }
      });
    }
  }

}
