import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { Category } from '../classes/category.model';

const SERVER_API_URL = 'http://localhost:3000/api/store-category';

@Injectable()
export class CategoryService {
    private categories: Category[] = [];
    private catUpdated = new Subject<Category[]>();

    constructor(private http: HttpClient, private router: Router) {}

    createCategory(name: string, description: string) {
        const categoryData: Category = {
            _id: null,
            name: name,
            description: description
        };
        return this.http.post(`${SERVER_API_URL}/create`, categoryData);
    }

    getCategory(id: string) {
        return this.http.get<{ msg: string; category: Category }>(
            `${SERVER_API_URL}/` + id
        );
    }

    getAllCategories(catsPerPage: number, currentPage: number) {
        const queryParams = `?pageSize=${catsPerPage}&page=${currentPage}`;
        return this.http.get<{
            msg: string;
            categories: Category[];
            maxCats: number;
        }>(`${SERVER_API_URL}/list${queryParams}`);
    }

    getCatNames() {
        return this.http.get<{ listNames: Category[] }>(
            `${SERVER_API_URL}/list-names`
        );
    }

    updateCategory(id: string, name: string, desc: string) {
        const cat: Category = { _id: id, name: name, description: desc };
        this.http.put(`${SERVER_API_URL}/` + id, cat).subscribe(response => {
            this.router.navigate(['/account/categories']);
        });
    }

    deleteCategory(catId: string) {
        return this.http.delete(`${SERVER_API_URL}/` + catId);
    }

    countCategories() {
        return this.http.get<{ count: number }>(`${SERVER_API_URL}/count`);
    }

    bigChart() {
        return [
            {
                name: 'Asia',
                data: [502, 635, 809, 947, 1402, 3634, 5268]
            },
            {
                name: 'Africa',
                data: [106, 107, 111, 133, 221, 767, 1766]
            },
            {
                name: 'Europe',
                data: [163, 203, 276, 408, 547, 729, 628]
            },
            {
                name: 'America',
                data: [18, 31, 54, 156, 339, 818, 1201]
            },
            {
                name: 'Oceania',
                data: [2, 2, 2, 6, 13, 30, 46]
            }
        ];
    }

    cards() {
        return [71, 78, 39, 66];
    }

    pieChart() {
        return [
            {
                name: 'Chrome',
                y: 61.41,
                sliced: true,
                selected: true
            },
            {
                name: 'Internet Explorer',
                y: 11.84
            },
            {
                name: 'Firefox',
                y: 10.85
            },
            {
                name: 'Edge',
                y: 4.67
            },
            {
                name: 'Safari',
                y: 4.18
            },
            {
                name: 'Sogou Explorer',
                y: 1.64
            },
            {
                name: 'Opera',
                y: 1.6
            },
            {
                name: 'QQ',
                y: 1.2
            },
            {
                name: 'Other',
                y: 2.61
            }
        ];
    }
}
