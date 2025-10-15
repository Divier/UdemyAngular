import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@products/services/product.service';
import { ProductCarousel } from "@products/components/product-carousel/product-carousel";

@Component({
  selector: 'app-product-page',
  imports: [ProductCarousel],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css'
})
export class ProductPage {

  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductService);
  idSlug: string = this.activatedRoute.snapshot.params['idSlug'];

  productResource = rxResource({
    params: () => ({ slug: this.idSlug }),
    stream: ({ params }) => {
      return this.productService.getProductBySlug( params.slug )
    }
  });
}
