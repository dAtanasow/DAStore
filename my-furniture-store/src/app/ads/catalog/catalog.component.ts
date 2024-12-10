import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Furniture } from '../../types/furniture';
import { ApiService } from '../../api.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink, LoaderComponent, CommonModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  furniture: Furniture[] = [];
  isLoading = true;
  noItemsMessage = '';

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const category = params['category'];

      if (category) {
        this.loadByCategory(category);
      } else {
        this.apiService.getFurniture().subscribe((furniture) => {
          this.furniture = furniture;
          this.isLoading = false;

          if (this.furniture.length === 0) {
            this.noItemsMessage = 'No furniture found in this category.';
          } else {
            this.noItemsMessage = '';
          }
        });
      }
    });
  }

  loadByCategory(category: string): void {
    this.apiService.getByCategory(category).subscribe((data) => {
      this.furniture = data;
    });
  }
}
