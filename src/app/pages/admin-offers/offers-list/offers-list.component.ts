import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfferService } from 'src/app/services/offer.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-offers-list',
    templateUrl: './offers-list.component.html',
    styleUrls: ['./offers-list.component.scss']
})
export class OffersListComponent implements OnInit {
    offers: any[];

    countOffers = 0;

    constructor(
        private offerService: OfferService,
        private router: Router,
        private prodService: ProductService
    ) {}

    ngOnInit() {
        this.fetchOffers();
    }

    fetchOffers() {
        this.offerService.getOffers().subscribe(response => {
            this.offers = response.offers;
            this.countOffers = response.maxCount;
        });
    }

    OnAddBtnClicked() {
        this.router.navigate(['/offer/add']);
    }

    onDeleteOffer(id: string) {
        this.offerService.deleteOffer(id).subscribe(res => {
            this.fetchOffers();
        });
    }
}
