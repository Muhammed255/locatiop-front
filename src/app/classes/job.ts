export class JobData {
    _id?: string;
    title?: string;
    experience_years?: string;
    experiences?: string[];
    skills?: string[];
    age?: number;
    salary?: number;
    description?: string;
    location?: string;
    job_type?: string;
    job_gender?: string;
    qualification?: string;
    career_level?: string;
    storeId?: any;
}

export class JobRequestData {
    jobId: string;
    uploaded_cv: string | File
}