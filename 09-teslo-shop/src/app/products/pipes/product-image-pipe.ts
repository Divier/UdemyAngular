import { inject, Pipe, PipeTransform } from '@angular/core';
import { ProductService } from '@products/services/product.service';

@Pipe({
  name: 'productImage'
})
export class ProductImagePipe implements PipeTransform {

  productService = inject(ProductService);

  transform(value: string[]): string {
    if(value.length === 0) {
      return this.productService.getImageProduct();
    }
    return this.productService.getImageProduct(value[0]);
  }
}
