import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserJobsService } from 'src/app/services/user-jobs.service';
import { UserOffersService } from 'src/app/services/user-offers.service';
import { UserCartService } from 'src/app/services/user-cart.service';

@Component({
    selector: 'app-all-offers',
    templateUrl: './all-offers.component.html',
    styleUrls: ['./all-offers.component.scss']
})
export class AllOffersComponent implements OnInit {
    offers: any[];
    cartItemCount: number = 0;
    offerAddedTocart: any[];
    items: any[];

    constructor(
        private userJobService: UserJobsService,
        private userOfferService: UserOffersService,
        private userCartService: UserCartService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.userOfferService.getUserOffers().subscribe(response => {
            this.offers = response.offers;
        });
        //this.userJobService.getCart().subscribe(response => {
        // this.items = response.offer_items;
        //})
    }

    onCartBtnClicked(id) {
        this.userCartService.getCart().subscribe(res => {
            this.offerAddedTocart = res.offer_items;

            if (
                this.offerAddedTocart === null ||
                this.offerAddedTocart === undefined
            ) {
                this.offerAddedTocart = [];
                this.offerAddedTocart.push(id);
                this.userCartService.addOfferToCart(id).subscribe(response => {
                    this.cartItemCount = this.offerAddedTocart.length;
                    this.userCartService.updateCartCount(this.cartItemCount);
                    this.snackBar.open('Offer added To cart', 'Success', {
                        duration: 3000
                    });
                });
            } else {
                let tempOffer = this.offerAddedTocart.find(p => p._id === id);
                if (tempOffer === null) {
                    this.offerAddedTocart.push(id);
                    this.userCartService.addOfferToCart(id).subscribe(response => {
                        this.cartItemCount = this.offerAddedTocart.length;
                        this.userCartService.updateCartCount(this.cartItemCount);
                        this.snackBar.open('Offer added To cart', 'Success', {
                            duration: 3000
                        });
                    });
                }
            }
        });
    }
}
