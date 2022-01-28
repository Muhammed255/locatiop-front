import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const SERVER_API_URL = `${environment.apiUrl}`;

@Injectable({
    providedIn: 'root',
})
export class UserStoreAdminsService {

    constructor(private http: HttpClient) {}


    getUserStoreAdmins() {
        return this.http.get<{ msg: String; admins: any[] }>(
            `${SERVER_API_URL}/store-admin/user-list`
        );
    }


    getRandomStoreAdmins() {
        return this.http.get<{ admins: any[] }>(
            `${SERVER_API_URL}/store-admin/random-admins`
        );
    }


    finOneStoreAdmin(id: string) {
        return this.http.get<{ data: any }>(
            `${SERVER_API_URL}/store-admin/` + id
        );
    }


    findOneUser(id: string) {
        return this.http.get<{ user: any }>(`${SERVER_API_URL}/user/` + id);
    }


    followStoreAdmin(id: string) {
        return this.http.patch<{ update: any }>(
            `${SERVER_API_URL}/follow/following/` + id,
            id
        );
    }
    

    unfollowStoreAdmin(id: string) {
        return this.http.patch<{ update: any }>(
            `${SERVER_API_URL}/follow/unfollow/` + id,
            id
        );
    }
}
