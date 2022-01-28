import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";

const SERVER_API_URL = `${environment.apiUrl}`;

@Injectable({
    providedIn: 'root',
})
export class UserCartService {

    private currentCartCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    currentMessage = this.currentCartCount.asObservable();

    constructor(private http: HttpClient) {}

    addToCart(id: any) {
        return this.http.post<{ result: any }>(
            `${SERVER_API_URL}/cart/add-to-cart`,
            { productId: id }
        );
    }

    addOfferToCart(id: string) {
        const cartData = { offerId: id };
        return this.http.post<{ result: any }>(
            `${SERVER_API_URL}/cart/add-offer-to-cart`,
            cartData
        );
    }

    removeFromCart(id: string) {
        const cartData = { productId: id };
        return this.http.post<{ result: any }>(
            `${SERVER_API_URL}/cart/remove-from-cart`,
            cartData
        );
    }

    removeOfferFromCart(id: string) {
        const cartData = { productId: id };
        return this.http.post<{ result: any }>(
            `${SERVER_API_URL}/remove-offer-from-cart`,
            cartData
        );
    }

    getCart() {
        return this.http.get<{ prod_items: any[]; offer_items: any[] }>(
            `${SERVER_API_URL}/cart/all-cart`
        );
    }

    updateCartCount(count: number) {
        this.currentCartCount.next(count);
    }

    getCartItems() {
        return this.currentCartCount.asObservable();
    }

}