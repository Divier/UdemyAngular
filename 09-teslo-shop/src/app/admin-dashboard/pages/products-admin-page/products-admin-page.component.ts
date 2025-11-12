import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductTableComponent } from '@products/components/product-table/product-table.component';
import { Product } from '@products/interfaces/product.interface';
import { ProductService } from '@products/services/product.service';
import { PaginationService } from '@shared/components/pagination.service';
import { Pagination } from "@shared/components/pagination/pagination";

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTableComponent, Pagination],
  templateUrl: './products-admin-page.component.html',
  styleUrl: './products-admin-page.component.css'
})
export class ProductsAdminPageComponent {

  paginationService = inject(PaginationService);
  productservice = inject(ProductService);

  productsPerPage = signal(10);

  productsResource = rxResource({
    params: () => (
      {
        page: this.paginationService.currentPage(),
        limit: this.productsPerPage()
      }
    ),
    stream: ({ params }) => {
      return this.productservice.getProducts(
        {
          offset: (params.page - 1) * 9,
          limit: params.limit
        }
      );
    },
  });

  products = computed<Product[]>(() => this.productsResource.value()?.products || []);
}
