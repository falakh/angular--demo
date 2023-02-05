import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface IProduct {
  id: number;
  quantity: number;
  price: number;
  competitorPrice: number;
}
export interface IAddProduct {
  quantity: number;
  price: number;
  competitorPrice: number;
}

// const BASE_URL = 'https://frozen-lowlands-87948.herokuapp.com';
const BASE_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getItem(id?: number) {
    const param = new URLSearchParams();
    if (id) {
      param.append('id', id.toString());
    }
    const request = this.http.get<IProduct[]>(
      `${BASE_URL}/product${id ? '?' + param.toString() : ''}`
    );
    return request;
  }

  delete(id: number) {
    return this.http.delete<IProduct>(`${BASE_URL}/product/` + id);
  }

  addData(data: IAddProduct) {
    return this.http.post<IProduct>(`${BASE_URL}/product`, data);
  }
  editData(id: number, data: Partial<IAddProduct>) {
    return this.http.put<IProduct>(`${BASE_URL}/product/${id}`, data);
  }

  generate(premiumPrice: number, pertamaxprice: number) {
    for (let index = 1; index < 20; index++) {
      this.addData({
        competitorPrice: pertamaxprice * index,
        price: premiumPrice * index,
        quantity: index,
      }).subscribe();
    }
  }
}
