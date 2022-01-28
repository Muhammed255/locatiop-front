import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UserCartService } from 'src/app/services/user-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart_products: any[];
  cart_offers: any[];
  single_product: any;
  total_products_prices: number = 0;
  total_offers_prices: number = 0;

  constructor(private userService: UserCartService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getProductCart();
    // this.cart_offers.forEach(item => {
    //   this.total_offers_prices += item.quantity * item.offer.price;
    // })
    // this.userService.getCartItems().subscribe(value => {
    //   this.total = value;
    // })
    // this.getTotal();
    
  }

  getProductCart() {
    this.userService.getCart().subscribe(res => {
      this.cart_products = res.prod_items;
      this.cart_offers = res.offer_items;
      this.cart_products.forEach(item => {
        this.total_products_prices += item.quantity * item.productId.price;
        console.log(this.total_products_prices)
      })
    })
  }

  increase() {
    this.userService.updateCartCount(this.total_products_prices + 1);
  }

  decrease() {
    this.userService.updateCartCount(this.total_products_prices - 1);
  }

  removeProductFromCart(id) {
    this.userService.removeFromCart(id).subscribe(response => {
      this.snackBar.open('Item is Removed !!', 'success', {duration: 3000});
      this.getProductCart();
    })
  }

  removeOfferFromCart(id) {
    this.userService.removeOfferFromCart(id).subscribe(response => {
      this.snackBar.open('Item is Removed !!', 'success', {duration: 3000});
      this.getProductCart();
    })
  }


}
