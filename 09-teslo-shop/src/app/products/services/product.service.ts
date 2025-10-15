import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductResponse } from '@products/interfaces/product.interface';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseURL = environment.baseURL;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly http = inject(HttpClient);
  productsCache = new Map<string, Observable<ProductResponse>>();
  productCache = new Map<string, Observable<Product>>();

  getProducts(options: Options): Observable<ProductResponse> {

    const { limit = 9, offset = 0, gender = '' } = options;
    const key = `${ limit } - ${ offset } - ${ gender }`;

    if (this.productsCache.has(key)) {
      return this.productsCache.get(key)!;
    }

    return this.http.get<ProductResponse>(`${baseURL}/products`, {
      params: {
        limit,
        offset,
        gender
      },
    })
    .pipe(
      tap((response) => {
        console.log('Products fetched:', response);
      }),
      tap(response => this.productsCache.set(key, of(response)))
    );
  }

  getImageProduct(name?: string) {
    if(!name) {
      return './assets/images/no-image.jpg';
    }
    return `${baseURL}/files/product/${name}`;
  }

  getProductBySlug(slug: string): Observable<Product> {

    const key = `${ slug }`;

    if (this.productCache.has(key)) {
      return this.productCache.get(key)!;
    }

    return this.http.get<Product>(`${baseURL}/products/${slug}`)
    .pipe(
      tap((response) => {
        console.log('Product by slug:', response);
      }),
      tap(response => this.productCache.set(key, of(response)))
    );
  }
}
