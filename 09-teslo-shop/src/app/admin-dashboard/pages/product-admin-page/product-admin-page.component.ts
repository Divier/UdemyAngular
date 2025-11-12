import { Component, effect, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@products/services/product.service';
import { map } from 'rxjs';
import { ProductDetailsComponent } from './product-details/product-details.component';

@Component({
  selector: 'app-product-admin-page',
  imports: [ProductDetailsComponent],
  templateUrl: './product-admin-page.component.html',
  styleUrl: './product-admin-page.component.css'
})
export class ProductAdminPageComponent {

  activeRoute = inject(ActivatedRoute);
  route = inject(Router);
  productService = inject(ProductService);

  productId = toSignal(this.activeRoute.params.pipe(map(params => params['id'])));

  productResource = rxResource({
    params: () => ({ id: this.productId() }),
    stream: ({ params }) => {
      console.log('Fetching product with id:', params.id);
      return this.productService.getProductBySlug(params.id);
    }
  });

  redirectEffect = effect(() => {
    if(this.productResource.error()) {
      this.route.navigate(['/admin/products']);
    }
  })
}
