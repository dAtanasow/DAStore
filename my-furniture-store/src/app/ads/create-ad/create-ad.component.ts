import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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

  createAd(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const {
      img,
      name,
      price,
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
        { width, length, depth, height },
        color,
        material,
        weight
      )
      .subscribe(() => {
        this.router.navigate(['/catalog']);
      });
  }
}
