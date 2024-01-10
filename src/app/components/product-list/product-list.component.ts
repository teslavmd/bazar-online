import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    NavbarComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent{

  //VARIABLES | DATA
  listProducts : Product[] = [];

  router = inject(Router);

  loadList(list : Product[]){
    this.listProducts = list;
  }

  navigateToProduct(id : number, category : string) : void {
    
      console.log(['/product/'+id])
    this.router.navigate(
      ['/product/' + id],
      {
        queryParams : {
          category
        }
      })
  }

}
