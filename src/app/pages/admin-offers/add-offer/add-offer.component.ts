import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material';
import { mimeType } from './../../../helper/mime-type.validator';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { OfferService } from 'src/app/services/offer.service';

@Component({
    selector: 'app-add-offer',
    templateUrl: './add-offer.component.html',
    styleUrls: ['./add-offer.component.scss']
})
export class AddOfferComponent implements OnInit {
    offerForm: FormGroup;

    imagePreview: string;
    startDate = new Date(2020, 0, 1);

    mode = 'create';
    private offerId: string;

    offersTypes = [
        {
            offer: 'Discount',
            desc: 'End of year sales, Closing down sale, Introductory specials.'
        },
        { offer: 'Bundle', desc: 'Buy 2 Get 1 Free' },
        { offer: 'Referral', desc: 'Refer a friend and receive a  ….' },
        { offer: 'Game', desc: 'Buy now pay later' },
        { offer: 'Free Gift', desc: 'Get your scratch card and WIN' },
        {
            offer: 'Piggy Backing',
            desc: 'Every purchase receives a …. Valued at $ ….'
        },
        { offer: 'Rewards', desc: 'Earn loyalty points on every purchase' },
        {
            offer: 'Membership',
            desc: 'Join our members club for special offers, competitions'
        },
        {
            offer: 'Low Cost Event',
            desc: 'Get your ticket to an exclusive event/seminar'
        },
        {
            offer: 'No Risk Offer',
            desc: 'Money back guarantee or a ‘no questions’ exchange'
        }
    ];

    products: any[];
    offer: any;

    constructor(
        private fb: FormBuilder,
        private ps: ProductService,
        private os: OfferService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        console.log("Add offer work");
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if(paramMap.has('offerId')) {
                this.mode = 'edit';
                this.offerId = paramMap.get('offerId');
                this.os.finoneOffer(this.offerId).subscribe(response => {
                    this.offer = {
                        offerType: response.offer.offerType,
                        new_price: response.offer.new_price,
                        description: response.offer.description,
                        offer_image: response.offer.offer_image,
                        start_date: response.offer.start_date,
                        end_date: response.offer.end_date,
                        productId: response.offer.productId,
                    };
                    this.offerForm.setValue({
                        offerType: this.offer.offerType,
                        new_price: this.offer.new_price,
                        description: this.offer.description,
                        offer_image: this.offer.offer_image,
                        start_date: this.offer.start_date,
                        end_date: this.offer.end_date,
                        productId: this.offer.productId,
                    })
                })
            } else {
                this.mode = 'create';
                this.offerId = null;
            }
        })
        this.initAddForm();
        this.ps.getPoductsNames().subscribe(response => {
            this.products = response.names;
        });
    }

    private initAddForm() {
        this.offerForm = this.fb.group({
            offerType: ['', Validators.required],
            description: ['', Validators.required],
            offer_image: ['', Validators.required, mimeType.bind(this)],
            start_date: ['', Validators.required],
            end_date: ['', Validators.required],
            productId: ['', Validators.required],
            new_price: ['']
        });
    }

    onSaveOffer() {
        if (this.offerForm.invalid) {
            return;
        }
        if(this.mode === 'create') {
            this.os.addOffer(
                this.offerForm.value.offerType,
                this.offerForm.value.new_price,
                this.offerForm.value.description,
                this.offerForm.value.offer_image,
                this.offerForm.value.start_date,
                this.offerForm.value.end_date,
                this.offerForm.value.productId
            );
        } else {
            this.os.updateOffer(
                this.offerId,
                this.offerForm.value.offerType,
                this.offerForm.value.new_price,
                this.offerForm.value.description,
                this.offerForm.value.offer_image,
                this.offerForm.value.start_date,
                this.offerForm.value.end_date,
                this.offerForm.value.productId
            );
        }
    }

    onImagePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.offerForm.patchValue({ offer_image: file });
        this.offerForm.get('offer_image').updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
    }
}
