import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  search : string = "";
  routes = inject(Router);



  searchProductWEnter(event : KeyboardEvent) : void {
    if(event.key === 'Enter'){
      this.routes.navigate(
        ['/items'],
        { queryParams : {
          search : this.search 
        } }
        )
    }
  }


}
