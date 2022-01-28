import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { scan } from 'rxjs/operators';

const SERVER_API_URL = 'http://localhost:3000/api/store';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  constructor(private http: HttpClient) {}

// storesPerPage: number, currentPage: number
  getStores() {
    // const queryParams = `?pageSize=${storesPerPage}&page=${currentPage}`;${queryParams}
    return this.http.get<{msg: string, stores: any[], maxStores: number }>(`${SERVER_API_URL}/list`);
  }

  createStore(name: string, latitude: any, longitude: any, logo: File, catId: string) {
    const storeData = new FormData();
    storeData.append("name", name);
    storeData.append("latitude", latitude);
    storeData.append("longitude", longitude);
    storeData.append("logo", logo, name);
    storeData.append("catId", catId);
    return this.http.post(`${SERVER_API_URL}/create`, storeData);
  }

  findOneStore(id: string) {
    return this.http.get<{msg: string, store: any, products: any[], offers: any[], jobs: any[]}>(`${SERVER_API_URL}/` + id);
  }

  popCats(id: string) {
    return this.http.get<{msg: string, data: any[]}>(`${SERVER_API_URL}/pop` + id);
  }

  countStores() {
    return this.http.get<{count: number}>(`${SERVER_API_URL}/countstr`);
  }

  deleteStore(id: string) {
    return this.http.delete(`${SERVER_API_URL}/` + id);
  }


  getStoreNames() {
    return this.http.get<{listNames: any[]}>(`${SERVER_API_URL}/names`);
}
  
}
