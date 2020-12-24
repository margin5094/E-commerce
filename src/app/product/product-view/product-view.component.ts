import { Component, OnInit } from '@angular/core';
import { AngularFireObject } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from 'src/app/cart/cart.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  product :Product;
  cartItem: CartItem;
  
  get quantity(): number {
    return this.cartItem ? this.cartItem.count : 0
  }

  get amount(): number {
    return this.cartItem ? this.cartItem.amount : 0
  }

  constructor(private dataSotrageService:DataStorageService,
    private route: ActivatedRoute,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id: string = params['id'];

      this.dataSotrageService.fetchProduct(id).valueChanges().subscribe(
          data => {
          this.product = data;
        });

    })
  } 

  addToCart() {
    this.cartItem = this.cartService.addProduct(this.product);
  }

  removeFromCart() {
    this.cartItem = this.cartService.removeProduct(this.product);
  }

}
