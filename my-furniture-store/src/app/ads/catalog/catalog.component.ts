import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Furniture } from '../../types/furniture';
import { ApiService } from '../../api.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { NgFor, NgIf } from '@angular/common';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink, LoaderComponent, NgFor, NgIf, MatPaginatorModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  furniture: Furniture[] = [];
  paginatedFurniture: Furniture[] = [];
  noItemsMessage = '';
  pageSize = 21;
  currentPage = 0;
  isLoading = true;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.isLoading = true;
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
            this.updatePaginatedFurniture();
          }
        });
      }
    });
  }

  loadByCategory(category: string): void {
    this.isLoading = true;
    this.apiService.getByCategory(category).subscribe((data) => {
      this.furniture = data;
      this.updatePaginatedFurniture();
      this.isLoading = false;
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedFurniture();
  }

  updatePaginatedFurniture(): void {
    const startIndex = this.currentPage * this.pageSize;
    this.paginatedFurniture = this.furniture.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }
}
