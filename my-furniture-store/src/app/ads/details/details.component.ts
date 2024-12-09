import { Component, OnInit } from '@angular/core';
import { Furniture } from '../../types/furniture';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-furniture-details',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  isLoading = true;
  furniture: Furniture | null = null;
  currentUser: string | null = null;
  cartItems: Furniture[] = [];
  isAuthor = false;
  isItemInCart = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getUserId();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getSingleFurniture(id).subscribe((data) => {
        this.furniture = data;
        this.isLoading = false;
        if (this.furniture && this.currentUser) {
          this.isAuthor = this.furniture.authorId === this.currentUser;
        }
      });

      this.userService.getCartItems().subscribe((cartItems) => {
        if (this.furniture) {
          this.isItemInCart = cartItems.some(
            (item) => item._id === this.furniture!._id
          );
        }
      });
    }
  }

  addToCart(furnitureId: string) {
    if (this.isItemInCart) {
      return;
    }
    this.userService.addToCart(furnitureId).subscribe(() => {
      const goToCart = window.confirm(
        'Item added to cart successfully. Do you want go to the cart?'
      );

      if (goToCart) {
        this.router.navigate(['/cart']);
      }
    });
  }

  deleteProduct(): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.apiService.deleteAd(this.furniture!._id).subscribe(() => {
        this.router.navigate(['/catalog']);
      });
    }
  }

  editProduct(): void {
    this.router.navigate([`/edit/${this.furniture?._id}`]);
  }
}
