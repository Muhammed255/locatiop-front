import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog, MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { CreateProductComponent } from '../create-product/create-product.component';
import * as moment from 'moment';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { filter } from "rxjs/operators";

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {
    expansion = true;
    userIsAuthenticated = false;
    isLoading = false;
    userId: string;
    imagePre: any;
    productsData: any[];

    totalProds = 0;
    prodsPerPage = 3;
    currentPage = 1;
    pageSizeOptions = [1, 3, 5, 10];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private prodService: ProductService,
        private router: Router,
        private snackBar: MatSnackBar,
        public dialog: MatDialog,
        private authService: AuthService
    ) {}

    

    ngOnInit() {
        this.isLoading = true;
        this.fetchProducts();
        this.userId = this.authService.getUserId();
        this.userIsAuthenticated = this.authService.getIsAuth();
    }

    fetchProducts() {
        this.prodService.productList(this.prodsPerPage, this.currentPage).subscribe(
            response => {
                this.productsData = response.products;
                this.totalProds = response.count;
                this.isLoading = false;
            },
            err => this.HandleMessage(err, 'Failed To Fetch Products'),
            () => {
                this.isLoading = false;
            }
        );
    }

    onChangePage(pageData: PageEvent) {
        this.isLoading = true;
        this.currentPage = pageData.pageIndex + 1;
        this.prodsPerPage = pageData.pageSize;
        this.fetchProducts();
      }

    filterProducts(filterValue: string) {
        this.productsData.forEach(product => {
            if(filterValue === product.title.trim().toLowerCase()) {
                console.log(product);
            }
        });
        return null;
    }

    onDeleteProduct(id: string) {
        this.prodService.deleteProduct(id).subscribe(response => {
            this.fetchProducts();
        });
    }

    onADialogOpenPressed(prodId: string) {
        let options = {
            width: '550px',
            height: '500px',
            data: {}
        };

        if (prodId) {
            options.data = {
                productId: prodId
            };
        }

        let dialogRef = this.dialog.open(CreateProductComponent, options);
        dialogRef
            .afterClosed()
            .pipe(filter(prodParams => typeof prodParams === 'object'))
            // @ts-ignore
            .flatMap(result => {
                this.isLoading = true;
                if (
                    moment(result.production_date.toString()).isAfter(result.expire_date.toString())
                ) {
                    this.HandleMessage(
                        'Error',
                        'Expire date should be After production date'
                    );
                    this.isLoading = false;
                    return;
                }
                if (prodId) {
                    console.log(result.description)
                    this.prodService.updateProduct(
                        prodId,
                        result.title,
                        result.description,
                        result.price,
                        result.image,
                        result.production_date,
                        result.expire_date
                    );
                    this.isLoading = false;
                    return this.fetchProducts();
                } else {
                    this.prodService.createPoduct(
                        result.title,
                        result.description,
                        result.price,
                        result.image,
                        result.production_date,
                        result.expire_date
                    );
                    this.isLoading = false;
                    return this.fetchProducts();
                }
            })
            .subscribe(
                (data: any) => {
                    this.isLoading = false;
                    this.fetchProducts();
                    if (prodId) {
                        const index = this.productsData.findIndex(prod => prod._id === prodId);
                        this.productsData[index] = this.productsData;
                        this.fetchProducts();
                        this.snackBar.open(
                            'Updated Successfully! ❤😁',
                            'Success',
                            {
                                duration: 5000
                            }
                        );
                    } else {
                        this.productsData.push(data);
                        this.snackBar.open(
                            'Added Successfully! ❤😁',
                            'Success',
                            {
                                duration: 5000
                            }
                        );
                    }
                },
                error =>
                    this.HandleMessage(error, 'Failed to create store admin')
            );
    }

    HandleMessage(error, message) {
        this.isLoading = false;
        console.error(error);
        this.snackBar.open(message, 'Error', { duration: 5000 });
    }

    ngOnDestroy() {}
}
