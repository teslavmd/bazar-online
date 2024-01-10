import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { SimilarProductsComponent } from '../similar-products/similar-products.component';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    SimilarProductsComponent
  ],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent implements OnInit{

  //inyeccion de dependencias 
  productService = inject(ProductService);
  route = inject(ActivatedRoute);

  //data
  productFound : Product;

  selected : number = 0;


  ngOnInit(): void {
    this.loadProductById();      
  }

  changeImgSelected(newSelected : number){
    console.log(newSelected);
    this.selected = newSelected;
    console.log(this.selected)
  }

  loadProductById() : void {
    let id : number = parseInt(this.route.snapshot.params['id']);
   this.productService.searchProductById(id).subscribe({
    next : product => {
      this.productFound = product;
    },
   })
  }


}
