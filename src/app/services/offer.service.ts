import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Offer } from '../classes/offer';

const SERVER_API_URL = `${environment.apiUrl}/offer`;

@Injectable({
    providedIn: 'root'
})
export class OfferService {
    constructor(private http: HttpClient, private router: Router) {}

    getOffers() {
        return this.http.get<{ offers: any[]; maxCount: number }>(
            `${SERVER_API_URL}/list`
        );
    }

    addOffer(
        offerType: string,
        new_price: number,
        desc: string,
        offer_image: File,
        start_date: Date,
        end_date: Date,
        productId: string
    ) {
        const offerData = new FormData();
        offerData.append('offerType', offerType);
        offerData.append('new_price', new_price.toString());
        offerData.append('description', desc);
        offerData.append('offer_image', offer_image, offerType);
        offerData.append('start_date', start_date.toString());
        offerData.append('end_date', end_date.toString());
        offerData.append('productId', productId);

        this.http
            .post<{
                msg: string;
                offer: any;
                left_time: number;
            }>(`${SERVER_API_URL}/create`, offerData)
            .subscribe(response => {
                this.router.navigate(['/offer/list']);
                this.getOffers();
                setTimeout(() => {
                    // this.deleteProduct(response.product._id);
                }, response.left_time);
            });
    }

    updateOffer(
        id: string,
        offerType: string,
        new_price: number,
        desc: string,
        offer_image: File,
        start_date: Date,
        end_date: Date,
        productId: string
    ) {
        let offerData: FormData | Offer;
        if (typeof offer_image === 'object') {
            offerData = new FormData();
            offerData.append('offerType', offerType);
            offerData.append('new_price', new_price.toString());
            offerData.append('description', desc);
            offerData.append('offer_image', offer_image, offerType);
            offerData.append('start_date', start_date.toString());
            offerData.append('end_date', end_date.toString());
            offerData.append('productId', productId);
        } else {
            offerData = {
                _id: id,
                offerType: offerType,
                new_price: new_price,
                description: desc,
                offer_image: offer_image,
                start_date: start_date,
                end_date: end_date,
                productId: productId
            };
        }

        return this.http
            .put<{
                msg: string;
                offer: any;
                left_time: number;
            }>(`${SERVER_API_URL}/` + id, offerData)
            .subscribe(response => {
                this.router.navigate(['/offer/list']);
                this.getOffers();
                setTimeout(() => {
                    this.deleteOffer(response.offer._id);
                }, response.left_time);
            });
    }

    finoneOffer(id: string) {
        return this.http.get<{ offer: any }>(`${SERVER_API_URL}/` + id);
    }

    deleteOffer(id: string) {
        return this.http.delete(`${SERVER_API_URL}/` + id);
    }
}
