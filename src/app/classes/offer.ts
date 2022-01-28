export class Offer {
    _id: string;
    offerType: string;
    new_price?: number;
    description: string;
    offer_image: File | string;
    start_date: Date;
    end_date: Date;
    productId: string;
}
