import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProductPaginateRes, Product } from '../classes/product';

const SERVER_API_URL = `${environment.apiUrl}/product`;

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private http: HttpClient) {}

    productList(prodsPerPage: number, currentPage: number) {
        const queryParams = `?pageSize=${prodsPerPage}&page=${currentPage}`;
        return this.http.get<{products: any[], count: number}>(`${SERVER_API_URL}/all${queryParams}`);
    }

    createPoduct(
        title: string,
        desc: string,
        price: number,
        image: File,
        prod_date: Date,
        exp_date: Date
    ) {
        const productData = new FormData();
        productData.append('title', title);
        productData.append('description', desc);
        productData.append('price', price.toString());
        productData.append('image', image, title);
        productData.append('production_date', prod_date.toString());
        productData.append('expire_date', exp_date.toString());

        this.http
            .post<{ msg: string; product: any; left_time: number, message_date: string }>(
                `${SERVER_API_URL}/create`,
                productData
            )
            .subscribe(response => {
                this.productList(3, 1);
                setTimeout(() => {
                    this.deleteProduct(response.product._id);
                }, response.left_time);
            });
    }

    updateProduct(
        id: string,
        title: string,
        desc: string,
        price: number,
        image: File | string,
        production_date: Date,
        expire_date: Date
    ) {
        let productData: FormData | Product;
        if (typeof image === 'object') {
            productData = new FormData();
            productData.append('title', title);
            productData.append('description', desc);
            productData.append('price', price.toString());
            productData.append('image', image, title);
            productData.append('production_date', production_date.toString());
            productData.append('expire_date', expire_date.toString());
        } else {
            productData = {
                _id: id,
                title: title,
                description: desc,
                price: price,
                image: image,
                production_date: production_date,
                expire_date: expire_date
            };
        }

        return this.http
            .put<{ msg: string; product: any; left_time: number, message_date: string }>(
                `${SERVER_API_URL}/` + id,
                productData
            )
            .subscribe(response => {
                this.productList(5, 1);
                setTimeout(() => {
                    this.deleteProduct(response.product._id);
                }, response.left_time);
            });
    }

    finoneProduct(id: string) {
        return this.http.get<{product: any}>(`${SERVER_API_URL}/` + id);
    }

    deleteProduct(id: string) {
        return this.http.delete(`${SERVER_API_URL}/` + id);
    }

    getPoductsNames() {
        return this.http.get<{names: any[]}>(`${SERVER_API_URL}/names`);
    }

    getProductsCategory(id) {
        return this.http.get<{products: any[]}>(`${SERVER_API_URL}/cat-src/` + id);
    }
}
