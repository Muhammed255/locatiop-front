import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { JobRequestData } from "../classes/job";

const SERVER_API_URL = `${environment.apiUrl}`;

@Injectable({
    providedIn: 'root',
})
export class UserJobsService {
    
    constructor(private http: HttpClient) {}

    getUserJobs() {
        return this.http.get<{ jobs: any[] }>(
            `${SERVER_API_URL}/job/user-jobs`
        );
    }

    finOneJob(id: string) {
        return this.http.get<{ job: any }>(`${SERVER_API_URL}/job/` + id);
    }

    // Function to post a comment on a job
    postJobComment(id, comment) {
        // Create blogData to pass to backend
        const commentData = {
            id: id,
            comment: comment,
        };
        return this.http.post(`${SERVER_API_URL}/job/job-comment`, commentData);
    }

    findOneUser(id: string) {
        return this.http.get<{ user: any }>(`${SERVER_API_URL}/user/` + id);
    }

    postJobCommentReply(jobId, commentId, reply) {
        // Create blogData to pass to backend
        const commentReplyData = {
            reply: reply,
            commentId: commentId,
        };
        return this.http.put(
            `${SERVER_API_URL}/job/do-reply/${jobId}`,
            commentReplyData
        );
    }

    addJobToShortlist(id: string) {
        return this.http.post(
            `${SERVER_API_URL}/wishlist/add-job-to-shortlist/` + id,
            id
        );
    }

    getJobToShortlist() {
        return this.http.get<{ shortlist: any[] }>(
            `${SERVER_API_URL}/wishlist/jobs`
        );
    }

    removeJobFromShortlist(id: string) {
        return this.http.delete(`${SERVER_API_URL}/wishlist/job/` + id);
    }

    getMostRecentJobs() {
        return this.http.get<{ jobs: any[] }>(
            `${SERVER_API_URL}/job/recent-jobs`
        );
    }

    applyForJob(jobId: string, uploaded_cv: File) {
        let jobReqData: FormData | JobRequestData;
        if (typeof uploaded_cv === 'object') {
            jobReqData = new FormData();
            jobReqData.append('jobId', jobId);
            jobReqData.append('uploaded_cv', uploaded_cv, jobId);
        } else {
            jobReqData = {
                jobId: jobId,
                uploaded_cv: uploaded_cv,
            };
        }
        return this.http.post(`${SERVER_API_URL}/job-req/apply`, jobReqData);
    }

    job_search(
        job_search: string,
        location: string,
        job_type: string,
        createdAt: string
    ) {
        return this.http.post<{ search_data: any[] }>(
            `${SERVER_API_URL}/job/search-job`,
            { job_search, location, job_type, createdAt }
        );
    }

}