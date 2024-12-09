import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RouterLink } from '@angular/router';
import { Furniture } from '../../types/furniture';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-my-furniture',
  imports: [LoaderComponent, RouterLink, NgFor],
  templateUrl: './my-furniture.component.html',
  styleUrl: './my-furniture.component.css',
})
export class MyFurnitureComponent implements OnInit {
  furniture: Furniture[] = [];
  isLoading = true;
  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.userService.getUserId();
    if (userId) {
      this.userService.getMyFurniture().subscribe((data) => {
        this.furniture = data;
        this.isLoading = false;
      });
    }
  }
}
