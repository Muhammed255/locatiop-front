import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const SERVER_API_URL = `${environment.apiUrl}`;

@Injectable({
    providedIn: 'root',
})
export class UserOffersService {
    constructor(private http: HttpClient) {}

    getUserOffers() {
        return this.http.get<{ offers: any[] }>(
            `${SERVER_API_URL}/offer/user-offers`
        );
    }


    finOneOffer(id: string) {
        return this.http.get<{ offer: any }>(`${SERVER_API_URL}/offer/` + id);
    }

    // Function to post a comment on a offer
    postOfferComment(id, comment) {
        // Create blogData to pass to backend
        const commentData = {
            id: id,
            comment: comment,
        };
        return this.http.post(
            `${SERVER_API_URL}/offer/offer-comment`,
            commentData
        );
    }


    postOfferCommentReply(offerId, commentId, reply) {
        // Create blogData to pass to backend
        const commentReplyData = {
            reply: reply,
            commentId: commentId,
        };
        return this.http.put(
            `${SERVER_API_URL}/offer/do-reply/${offerId}`,
            commentReplyData
        );
    }


    addOfferToWishlist(id: string) {
        return this.http.post(
            `${SERVER_API_URL}/wishlist/add-offer-to-wishlist/` + id,
            id
        );
    }


    getOffersWishlist() {
        return this.http.get<{ offer_wishlist: any[] }>(
            `${SERVER_API_URL}/wishlist/offers`
        );
    }
    

    removeOfferFromWishlist(id: string) {
        return this.http.delete<{ msg: string; updatedWishlist: any[] }>(
            `${SERVER_API_URL}/wishlist/offer/` + id
        );
    }
}
