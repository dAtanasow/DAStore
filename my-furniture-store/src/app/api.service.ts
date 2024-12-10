import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Furniture, Dimensions } from './types/furniture';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getFurniture(limit?: number): Observable<Furniture[]> {
    let url = `/api/catalog`;
    if (limit) {
      url += `?limit=${limit}`;
    }
    return this.http.get<Furniture[]>(url);
  }

  getSingleFurniture(id: string): Observable<Furniture> {
    return this.http.get<Furniture>(`/api/catalog/details/${id}`);
  }

  getByCategory(category: string): Observable<Furniture[]> {
    return this.http.get<Furniture[]>(`/api/catalog/${category}`);
  }

  createFurniture(
    img: string,
    name: string,
    price: number,
    category: string,
    dimensions: Dimensions,
    color: string,
    material: string,
    weight: number
  ): Observable<Furniture> {
    const payload = {
      img,
      name,
      price,
      category,
      dimensions,
      color,
      material,
      weight,
    };
    return this.http.post<Furniture>(`/api/furniture/create`, payload);
  }

  updateFurniture(
    furnitureId: string,
    img: string,
    name: string,
    price: number,
    category: string,
    dimensions: Dimensions,
    color: string,
    material: string,
    weight: number
  ): Observable<Furniture> {
    const payload = {
      furnitureId,
      img,
      name,
      price,
      category,
      dimensions,
      color,
      material,
      weight,
    };
    return this.http.put<Furniture>(`/api/catalog/details/${furnitureId}`, payload);
  }

  deleteAd(furnitureId: string) {
    return this.http.delete(`/api/catalog/details/${furnitureId}`);
  }
}
