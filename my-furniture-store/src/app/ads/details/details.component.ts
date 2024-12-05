import { Component, OnInit } from '@angular/core';
import { Furniture } from '../../types/furniture';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { LoaderComponent } from '../../shared/loader/loader.component';

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
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getSingleFurniture(id).subscribe((data) => {
        this.furniture = data;
        this.isLoading = false;
      });
    }
  }
}
