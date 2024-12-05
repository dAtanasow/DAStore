import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getFurniture().subscribe((furniture) => {
      this.furniture = furniture;
      this.isLoading = false;
    });
  }
}
