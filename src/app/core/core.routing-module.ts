import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RecipesGuardService } from './services/recipes-guard/recipes-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
    // redirectTo: '/recipes',
    // pathMatch: 'full'
  },
  {
    path: 'recipes',
    loadChildren: '../recipes/recipes.module#RecipesModule',
    canLoad: [RecipesGuardService]
  },
  {
    path: 'shopping-list',
    loadChildren: '../shopping/shopping.module#ShoppingModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
