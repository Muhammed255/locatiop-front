import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const SERVER_API_URL = `${environment.apiUrl}`;

@Injectable({
    providedIn: 'root',
})
export class UserStoresService {
    
    constructor(private http: HttpClient) {}


    finOneStore(id: string) {
        return this.http.get<{
            msg: string;
            store: any;
            storeProducts: any[];
            storeOffers: any[];
            storeJobs: any[];
        }>(`${SERVER_API_URL}/store/` + id);
    }


    getAllStores() {
        return this.http.get<{ msg: string; stores: any[] }>(
            `${SERVER_API_URL}/store/list`
        );
    }
}
