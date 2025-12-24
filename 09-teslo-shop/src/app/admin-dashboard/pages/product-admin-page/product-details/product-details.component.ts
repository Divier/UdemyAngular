import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../../../products/interfaces/product.interface';
import { ProductCarousel } from "@products/components/product-carousel/product-carousel";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@utils/form-utils';
import { FormErrorLabel } from '@shared/components/form-error-label/form-error-label';
import { ProductService } from '@products/services/product.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [ProductCarousel, ReactiveFormsModule, FormErrorLabel, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  productService = inject(ProductService);
  product = input.required<Product>();
  router = inject(Router);
  wasSaved = signal(false);

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  fb = inject(FormBuilder);
  productForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images:[[]],
    tags: [''],
    gender: ['men', [Validators.required, Validators.pattern('^(men|women|kids|unisex)$')]]
  })

  ngOnInit(): void {
    this.setFormValue(this.product());
  }

  setFormValue(formLike: Partial<Product>) {
    this.productForm.reset(this.product() as any)
    this.productForm.patchValue({ tags: formLike.tags?.join(', ') || '' });
  }

  onSizeClicked(size: string) {

    const currentSizes: string[] = this.productForm.value.sizes ?? [];

    if(currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1);
    } else {
      currentSizes.push(size);
    }
    this.productForm.patchValue({ sizes: currentSizes });
  }

  async onSubmit() {

    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched();

    if(!isValid) return;

    const formValue = this.productForm.value;
    const productLike: Partial<Product> = {
      ...(formValue as any),
      tags: formValue.tags?.toLowerCase().split(',').map((tag) => tag.trim()) ?? []
    };

    if(this.product().id === 'new') {
      const product = await firstValueFrom(this.productService.createProduct(productLike));
      this.router.navigateByUrl(`/admin/product/${product.id}`);
    } else {
      await firstValueFrom(this.productService.updateProduct(this.product().id, productLike));
    }

    this.wasSaved.set(true);
    console.log(this.wasSaved());
    setTimeout(() => {
      this.wasSaved.set(false);
      console.log(this.wasSaved());
    }, 3000);
  }
}
