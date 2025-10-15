import { rxResource } from '@angular/core/rxjs-interop';
import { Component, inject } from '@angular/core';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductService } from '@products/services/product.service';
import { Pagination } from '@shared/components/pagination/pagination';
import { PaginationService } from '@shared/components/pagination.service';
//import { ProductCard } from "../../../products/components/product-card/product-card";


@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

  paginationService = inject(PaginationService);
  productservice = inject(ProductService);

  productsResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() }),
    stream: ({ params }) => {
      return this.productservice.getProducts({ offset: (params.page - 1) * 9 });
    },
  });

  // Access the loaded data from the rxResource (productsResource)
  get listProducts() {
    return this.productsResource.value();
  }
}
