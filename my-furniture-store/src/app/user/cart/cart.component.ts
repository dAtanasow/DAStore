import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Furniture } from '../../types/furniture';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: Furniture[] = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCartItems().subscribe((data) => {
      console.log(data);
      this.cartItems = data.map((item) => ({ ...item, quantity: 1 }));
    });
  }

  removeItem(itemId: string): void {
    if (confirm('Are you sure you want to remove this product from cart?')) {
      this.userService.removeFromCart(itemId).subscribe(() => {
        this.cartItems = this.cartItems.filter((item) => item._id !== itemId);
      });
    }
  }
}
