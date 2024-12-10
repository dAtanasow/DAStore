import { Component } from '@angular/core';
import { AbstractControl, FormsModule, NgForm, NgModel} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-ad',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-ad.component.html',
  styleUrl: './create-ad.component.css',
})
export class CreateAdComponent {
  constructor(private apiService: ApiService, private router: Router) {}
  
  category: string = '';
  allowedCategories: string[] = [
    'chair',
    'table',
    'bed',
    'wardrobe',
    'bedside table',
    'dresser',
    'tv stand',
    'display cabinet',
    'corner sofa',
    'sofa',
    'coffee table',
    'hocker',
    'pouf',
    'hanger',
  ];

  imageUrl: string = '';
  imagePattern: string =
    '^https?://.*\\.(?:jpg|jpeg|png|gif|webp)$';

  validateCategory(inputControl: NgModel): void {
    const control: AbstractControl = inputControl.control;
    if (this.category && !this.allowedCategories.includes(this.category)) {
      control.setErrors({ invalidCategory: true });
    } else {
      control.setErrors(null);
    }
  }

  createAd(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const {
      img,
      name,
      price,
      category,
      width,
      length,
      depth,
      height,
      color,
      material,
      weight,
    } = form.value;

    this.apiService
      .createFurniture(
        img,
        name,
        price,
        category,
        { width, length, depth, height },
        color,
        material,
        weight
      )
      .subscribe(() => {
        this.router.navigate([`/catalog/${category}`]);
      });
  }
}
