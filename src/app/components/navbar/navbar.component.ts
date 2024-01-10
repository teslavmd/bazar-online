import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  //DEPENDENCIAS
  productService = inject(ProductService);
  router = inject(ActivatedRoute);
  routes = inject(Router);

  //VARIABLES | DATA
  // OUTPUT de la lista de productos, que recibira el componente padre
  @Output() listProducts : EventEmitter<Product[]> = new EventEmitter();
  listLenght : number = 0;
  searchParam : string = "";

  staticValueSearch : string = "";


  ngOnInit() : void {
    // obtener el parametro del url, ej -> '?search=PRODUCTO'
    this.searchParam = this.router.snapshot.queryParams["search"];
    this.searchProduct(this.searchParam);
  }

  //ESTE METODO SE INVOCA DOS VECES
  // 1 -> CUANDO SE CARGA ESTE MODULO POSTERIOR A LA BUSQUEDA DESDE EL '/home'
  // 2 -> EN EL EVENT CLICK DESDE ESTE MODULO PARA REALIZAR UNA BUSQUEDA
  searchProduct(search : string) : void {
    // staticValueSearch -> se usa para mostrar la palabra acompañado de la cantidad de resultados
    this.staticValueSearch = search;
    //llamamos el metodo searchProduct del servicio inyectado pasandole como parametro obtenido anteriormente
    this.productService.searchProducts(search).subscribe({
      next : list => {
        this.listLenght = list.length;
        //EMIT
        this.listProducts.emit(list);
      },
      error : err => console.log(err)
    });
  }

  // para una mejor UX
  // buscar el producto con solo apretar ENTER
  searchProductWEnter(event : KeyboardEvent) : void {
    if(event.key === 'Enter'){
      this.searchProduct(this.searchParam);
      this.routes.navigate(
        ['/items'],
        { queryParams : {
          search : this.searchParam,
        } }
        )
    }
  }


}
