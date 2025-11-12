import { CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image-pipe';
import { PaginationService } from '@shared/components/pagination.service';
import { Pagination } from '@shared/components/pagination/pagination';

@Component({
  selector: 'app-product-table',
  imports: [ProductImagePipe, CurrencyPipe, RouterLink, Pagination],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent {

  paginationService = inject(PaginationService);

  products = input.required<Product[]>();
}
