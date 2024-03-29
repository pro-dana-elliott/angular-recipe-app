import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './recipes.component';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
//import {AuthGuard} from '../auth/auth-gaurd.service';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';

const recipesRoutes: Routes = [
  {path: '', component: RecipesComponent, children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent},
      {path: ':id/edit', component: RecipeEditComponent},
    ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(recipesRoutes)
  ],
  exports: [RouterModule],
  providers: [
   // AuthGuard
  ]
})
export class RecipesRoutingModule {}
