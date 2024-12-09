import { Component } from '@angular/core';
import { Furniture } from '../../types/furniture';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormsModule, NgForm } from '@angular/forms';
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

  updateAd(form: NgForm): void {
    if (this.furniture && form.valid) {
      this.apiService
        .updateFurniture(
          this.furniture?._id,
          this.furniture.img,
          this.furniture.name,
          this.furniture.price,
          this.furniture.dimensions,
          this.furniture.color,
          this.furniture.material,
          this.furniture.weight
        )
        .subscribe(() => {
          this.router.navigate(['/catalog', this.furniture?._id]);
        });
    }
  }

  cancel(): void {
    if (
      confirm('Are you sure you want to cancel? Unsaved changes will be lost.')
    ) {
      this.router.navigate(['/catalog']);
    }
  }
}
