export class Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    image: File | string;
    production_date: Date;
    expire_date: Date;
}

export class ProductPaginateRes {
    docs: Product[];
    total: number;
    pages: number;
    page: number;
    limit: number;
}
