import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {NgModule} from '@angular/core';
import {HomeComponent} from './core/home/home.component';
import {SignupComponent} from './auth/signup/signup.component';
//import {SigninComponent} from './auth/signin/signin.component';

const appRoutes: Routes = [
  // {path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {path: '', component: HomeComponent },
  {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'signup', component: SignupComponent},
  //{path: 'signin', component: SigninComponent},
  {path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
