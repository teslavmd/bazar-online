import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  http = inject(HttpClient);

  url : string = "../assets/Products.json"


  constructor() { }


  searchProductById(id : number) : Observable<Product> {
    return this.http.get<Product>(this.url).pipe(
      map((data : any) => {
        let list : Product[] = data.products;
        let productToReturn : Product;
        list.forEach(( prod : Product ) => {
          if(prod.id === id){
            productToReturn = prod;
          }
        })
        return productToReturn!;
      })
    )
  }

  searchProductsByCategory(category : string, currentId : number) : Observable<Product[]> {
    return this.http.get<Product[]>(this.url).pipe(
      map((data : any) => {
        let list : Product[] = data.products;
        return list.filter((product : Product) => {
          return product.category.toLowerCase().includes(category) && product.id != currentId;
        })
      })
    )
  }


  //METODO PARA DEVOLVER LA LISTA DE PRODUCTOS QUE COINCIDAN CON LA BUSQUEDA DEL USUARIO
  searchProducts(search : string) : Observable<Product[]> {
    return this.http.get<any>(this.url).pipe(
      //USAMOS EL OPERADOR MAP DE RXJS PARA PODER FILTRAR LA DATA
      map((data : any) => {
        let list : Product[] = data.products;
        //METODO PROPIO DE LOS ARRAYS
        //USAR INCLUDES PARA HALLAR COINCIDENCIAS... UPPERCASE PARA LOS DOS STRINGS
        return list.filter((product : Product) => {
          return product.title.toUpperCase().includes(search.toUpperCase()) || product.category.toUpperCase().includes(search.toUpperCase())
        })
      })
      
    )
  }


}
