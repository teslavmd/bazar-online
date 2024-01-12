import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CardProductComponent } from '../card-product/card-product.component';

@Component({
  selector: 'app-similar-products',
  standalone: true,
  imports: [
    CommonModule,
    CardProductComponent

  ],
  templateUrl: './similar-products.component.html',
  styleUrl: './similar-products.component.css'
})
export class SimilarProductsComponent implements OnInit{

  router = inject(Router);
  actRoute = inject(ActivatedRoute);
  productService = inject(ProductService);
 
  listProducts : Product[];
  categoryParam : string;
 
  currentIdParam : number = this.actRoute.snapshot.params['id'];

  ngOnInit(): void {
    
    this.currentIdParam = this.actRoute.snapshot.params['id'];
    this.categoryParam = this.actRoute.snapshot.queryParams['category'];
    this.loadSimilarProducts(this.categoryParam, this.currentIdParam);
  }


  loadSimilarProducts(category : string, currentId : number) : void {
    this.productService.searchProductsByCategory(category, currentId)
      .subscribe({  
        next : list => {
          this.listProducts = list
        },
        error : err => {
          console.log(err);
        }
      })
  }



}
