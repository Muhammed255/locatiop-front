import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { JobData } from '../classes/job';

const SERVER_API_URL = `${environment.apiUrl}/job`;

@Injectable({
    providedIn: 'root'
})
export class JobService {
    constructor(private http: HttpClient) {}

    getJobs() {
        return this.http.get<{ totalItems: number; jobs: any[] }>(
            `${SERVER_API_URL}/all`
        );
    }

    uploadJob(body: JobData) {
        return this.http.post<{ msg: string; job: JobData }>(
            `${SERVER_API_URL}/create`,
            body
        );
    }

    updateJob(
        id: string,
        body: JobData
    ) {
        return this.http.put<{ msg: string; job: JobData }>(
            `${SERVER_API_URL}/` + id,
            body
        );
    }

    findOneJob(id: string) {
        return this.http.get<{ fetchedJob: any }>(`${SERVER_API_URL}/` + id);
    }

    deleteJob(id: string) {
        return this.http.delete(`${SERVER_API_URL}/` + id);
    }
}
