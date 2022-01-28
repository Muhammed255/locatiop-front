import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { StoreAdmin } from '../classes/store-admin';

const SERVER_API_URL = 'http://localhost:3000/api/store-admin';

@Injectable({providedIn: 'root'})
export class StoreAdminService {

    constructor(private http: HttpClient, private route: ActivatedRoute) {}

    getStoreAdmins() {
        return this.http.get<{msg: string, admins: any[]}>(`${SERVER_API_URL}/list`);
    }

    createStoreAdmin(body: StoreAdmin) {
        return this.http.post(`${SERVER_API_URL}/create`, body);
    }

    deleteStoreAdmin(id: String) {
        return this.http.delete(`${SERVER_API_URL}/` + id);
    }

    findOneStoreAdmin(id: String) {
        return this.http.get<{data: any}>(`${SERVER_API_URL}/` + id);
    }

}