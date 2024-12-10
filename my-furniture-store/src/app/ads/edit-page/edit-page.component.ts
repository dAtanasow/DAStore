import { Component } from '@angular/core';
import { Furniture } from '../../types/furniture';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { AbstractControl, FormsModule, NgForm, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.css',
})
export class EditComponent {
  furniture: Furniture | null = null;
  isLoading = true;
  imagePattern: string = '^https?://.*\\.(?:jpg|jpeg|png|gif|webp)$';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getSingleFurniture(id).subscribe((data) => {
        this.furniture = data;
        this.isLoading = false;
      });
    }
  }

  validateCategory(inputControl: NgModel): void {
    const control: AbstractControl = inputControl.control;
    if (
      this.furniture &&
      this.furniture.category &&
      !this.allowedCategories.includes(this.furniture.category)
    ) {
      control.setErrors({ invalidCategory: true });
    } else {
      control.setErrors(null);
    }
  }

  validateImageUrl(imageUrl: string): boolean {
    const regex = new RegExp(this.imagePattern);
    return regex.test(imageUrl);
  }

  updateAd(form: NgForm): void {
    if (this.furniture && form.valid) {
      this.apiService
        .updateFurniture(
          this.furniture?._id,
          this.furniture.img,
          this.furniture.name,
          this.furniture.price,
          this.furniture.category,
          this.furniture.dimensions,
          this.furniture.color,
          this.furniture.material,
          this.furniture.weight
        )
        .subscribe(() => {
          this.router.navigate(['/catalog/details', this.furniture?._id]);
        });
    }
  }

  cancel(): void {
    if (
      confirm('Are you sure you want to cancel? Unsaved changes will be lost.')
    ) {
      this.router.navigate(['/my-furniture']);
    }
  }
}
