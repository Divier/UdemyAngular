import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@auth/interfaces/user.interface';
import { Gender, Product, ProductResponse } from '@products/interfaces/product.interface';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseURL = environment.baseURL;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

const emptyProduct : Product = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Men,
  tags: [],
  images: [],
  user: {} as User
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly http = inject(HttpClient);
  private productsCache = new Map<string, ProductResponse>();
  private productCache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductResponse> {

    const { limit = 9, offset = 0, gender = '' } = options;
    const key = `${ limit } - ${ offset } - ${ gender }`;

    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!);
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
      tap(response => this.productsCache.set(key, response))
    );
  }

  getImageProduct(name?: string) {
    if(!name) {
      return './assets/images/no-image.jpg';
    }
    return `${baseURL}/files/product/${name}`;
  }

  getProductBySlug(slug: string): Observable<Product> {

    if (slug === 'new') {
      return of(emptyProduct);
    }

    const key = `${ slug }`;

    if (this.productCache.has(key)) {
      return of(this.productCache.get(key)!);
    }

    return this.http.get<Product>(`${baseURL}/products/${slug}`)
    .pipe(
      tap((response) => {
        console.log('Product by slug:', response);
      }),
      tap(response => this.productCache.set(key, response))
    );
  }

  createProduct(productLike: Partial<Product>): Observable<Product> {

    return this.http.post<Product>(`${baseURL}/products`, productLike)
    .pipe(
      tap((product) => {
        this.updateProductCache(product);
      }),
    );
  }

  updateProduct(id: string, productLike: Partial<Product>): Observable<Product> {

    return this.http.patch<Product>(`${baseURL}/products/${id}`, productLike)
    .pipe(
      tap((product) => {
        this.updateProductCache(product);
      }),
    );
  }

  updateProductCache(product: Product) {
    const productId = product.id;
    this.productCache.set(productId, product);

    this.productsCache.forEach((productResponse) => {
      productResponse.products = productResponse.products.map((currentProduct) => {
        if (currentProduct.id === productId) {
          return product;
        }
        return currentProduct;
      })
    });
  }
}
