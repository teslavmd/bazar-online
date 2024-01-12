import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent {

  @Input() list : Product[];
  router = inject(Router);


  navigateToProduct(id : number, category : string) : void {
    this.router.navigate(
      ['/product/' + id],
      {
        queryParams : {
          category
        }
      }).then( ( x : boolean ) => { 
         if(x){
          location.reload();
         }
      })
  }

}
