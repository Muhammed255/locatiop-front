import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const SERVER_API_URL = `${environment.apiUrl}`;

@Injectable({
    providedIn: 'root',
})
export class UserProductsService {
    constructor(private http: HttpClient) {}

    getUserProducts() {
        return this.http.get<{ products: any[]; offer: any }>(
            `${SERVER_API_URL}/product/user-products`
        );
    }


    getSpecificAdminProducts(id: string) {
        return this.http.get<{ products: any[] }>(
            `${SERVER_API_URL}/product/spec-admin-products/` + id
        );
    }


    finOneProduct(id: string) {
        return this.http.get<{ product: any; offer: any }>(
            `${SERVER_API_URL}/product/` + id
        );
    }


    postComment(id, comment) {
        // Create blogData to pass to backend
        const commentData = {
            id: id,
            comment: comment,
        };
        return this.http.post(`${SERVER_API_URL}/product/comment`, commentData);
    }

    // Function to post a comment on a product
    postCommentReply(productId, commentId, reply) {
        // Create blogData to pass to backend
        const commentReplyData = {
            reply: reply,
            commentId: commentId,
            productId: productId,
        };
        return this.http.post(
            `${SERVER_API_URL}/product/do-reply`,
            commentReplyData
        );
    }


    likeProductComment(productId, commentId) {
        const likeCommentData = {
            productId: productId,
            commentId: commentId,
        };
        return this.http.post(
            `${SERVER_API_URL}/product/like-comment`,
            likeCommentData
        );
    }


    dislikeProductComment(productId, commentId) {
        const likeCommentData = {
            productId: productId,
            commentId: commentId,
        };
        return this.http.post(
            `${SERVER_API_URL}/product/dislike-comment`,
            likeCommentData
        );
    }


    addProductToWishlist(id: string) {
        return this.http.post<{ msg: string }>(
            `${SERVER_API_URL}/wishlist/add-product-to-wishlist/${id}`,
            id
        );
    }


    getProductsWishlist() {
        return this.http.get<{ wishlist: any[] }>(
            `${SERVER_API_URL}/wishlist/products`
        );
    }
    

    removeProductFromWishlist(id: string) {
        return this.http.delete<{ msg: string; updatedWishlist: any[] }>(
            `${SERVER_API_URL}/wishlist/product/` + id
        );
    }
}
