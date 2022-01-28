import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { MatSnackBar, MatIcon } from '@angular/material';
import * as io from 'socket.io-client';
import { UserProductsService } from 'src/app/services/user-products.service';
import { UserStoreAdminsService } from 'src/app/services/user-storeadmins.service';
import { UserCartService } from 'src/app/services/user-cart.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  products: any[];
  cartItemCount: number = 0;
  productAddedTocart: any[] = [];
  offersAddedTocart: any[];
  socket: any;
  fav_icon: string = '';

  showData: boolean;
  auth_user: any;
  readonly url: string = "http://localhost:3000"

  @ViewChild('button', {static: false}) button: ElementRef;

  @ViewChild('icon', {static: false}) icon: MatIcon;

  constructor(
    private userService: UserProductsService,
    private userStoreadminService: UserStoreAdminsService,
    private userCartService: UserCartService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) {
    this.showData = false;
    this.socket = io(this.url);
  }

  ngOnInit() {
    this.getProducts();
    this.userCartService.getCart().subscribe(res => {
      this.productAddedTocart = res.prod_items;
    });
    this.socket.on('product', data => {
      if(data.action === 'create') {
        this.addProduct(data.product)
      } else if(data.action === 'update') {
        this.updateProduct(data.product);
      } else if(data.action === 'delete') {
        this.getProducts();
      }
    })
  }

  getProducts() {
    this.userService.getUserProducts().subscribe(response => {
      this.products = response.products;
      this.userStoreadminService.findOneUser(localStorage.getItem('userId')).subscribe(response => {
        this.auth_user = response.user;
        this.products.forEach(product => {
          if(response.user.wishlist.includes(product._id)) {
            this.fav_icon = 'favorite';
          } else {
            this.fav_icon = 'favorite_border';
          }
        });
      })
    })
  }

  addProduct(product: any) {
    const updated_products = [...this.products];
    if(this.products.length >= 2) {
      updated_products.pop();
    }
    updated_products.unshift(product);
    return {
      products: updated_products
    }
  }

  updateProduct(product: any) {
    const updated_products = [...this.products];
    const productIndex = this.products.findIndex(p => p._id === product._id);
    if(productIndex > -1) {
      updated_products[productIndex] = product;
    }
    return {
      products: updated_products
    }
  }

  onCartBtnClicked(id) {
    this.userCartService.getCart().subscribe(res => {
      this.productAddedTocart = res.prod_items;

    if(this.productAddedTocart === null || this.productAddedTocart === undefined) {
      this.productAddedTocart=[];
      this.productAddedTocart.push(id);
      this.userCartService.addToCart(id).subscribe(response => {
        this.cartItemCount = this.productAddedTocart.length;
        this.userCartService.updateCartCount(this.cartItemCount);
        this.snackBar.open(
          'Product added To cart',
          'Success',
          {
              duration: 3000
          }
        );
      })
    } else {
      let tempProduct = this.productAddedTocart.find(p => p._id === id);
      if (tempProduct === null) {
        this.productAddedTocart.push(id);
        this.userCartService.addToCart(id).subscribe(response => {
          this.cartItemCount = this.productAddedTocart.length;
          this.userCartService.updateCartCount(this.cartItemCount);
          this.snackBar.open(
            'Product added To cart',
            'Success',
            {
                duration: 3000
            }
          );
        })
      }
    }
  });
  }

  activeSkill() {
    (<any>this.button).color = 'accent';
  }

  onAddToWishlistBtnClicked(id) {
    if (this.fav_icon === 'favorite_border') {
      this.userService.addProductToWishlist(id).subscribe(result => {
        this.fav_icon === 'favorite';
        this.snackBar.open('Product added to wishlist', 'success', {duration: 3000})
      })
    } else {
      this.userService.removeProductFromWishlist(id).subscribe(result => {
        this.fav_icon === 'favorite_border';
        this.snackBar.open('Product removed to wishlist', 'success', {duration: 3000})
      })
    }
  }

  commentRoute(id: string) {
    this.router.navigate(['/account/product', id], { fragment: 'comments_link' });
  }

  commentForm(id: string) {
    this.router.navigate(['/account/product', id], { fragment: 'comment_form' });
  }

}
