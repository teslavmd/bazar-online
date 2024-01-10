import { Routes } from '@angular/router';

export const routes: Routes = [
    { path : "", pathMatch : "full", redirectTo : "home" },
    { path : "home", loadComponent : () => import("../app/components/search-box/search-box.component").then( module => module.SearchBoxComponent)},
    { path : "items", loadComponent : () => import("../app/components/product-list/product-list.component").then( module => module.ProductListComponent) },
    { path : "product/:id", loadComponent : () => import("../app/components/product-view/product-view.component").then( module => module.ProductViewComponent) }
];
