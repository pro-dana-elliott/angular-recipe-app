import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient, private recipeService: RecipeService,
              private authService: AuthService, private router: Router) {}

  // original
  // storeARecipes() {
  //   const token = this.authService.getToken();
  //   return this.httpClient.put('https://ng-recipe-book-1b2d9.firebaseio.com/recipes.json?auth=' + token,
  //                               this.recipeService.getRecipes());
  // }
// const headers = new HttpHeaders().set('Authrization', 'Bearer asdffgegghhh').append('next header', 'value');

   storeARecipes() {
     const token = this.authService.getToken();
  //   return this.httpClient.put('https://ng-recipe-book-1b2d9.firebaseio.com/recipes.json',
  //                                   this.recipeService.getRecipes(),
  //                              {
  //                                observe: 'body',
  //                                params: new HttpParams().set('auth', token)
  //                              });
    const type = 'PUT';
    const URL = 'https://ng-recipe-book-1b2d9.firebaseio.com/recipes.json';
    const params = new HttpParams().set('auth', token);
    const options = {reportProgress: true, params};
    const req = new HttpRequest(type, URL, this.recipeService.getRecipes(), options);
    return this.httpClient.request(req);
   }


  // original
  getRecipes() {
    const token = this.authService.getToken();

    this.httpClient.get<Recipe[]>('https://ng-recipe-book-1b2d9.firebaseio.com/recipes.json?auth=' + token)
      .pipe(map( (recipes) => {
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
          this.router.navigate(['/']);
        }
      );
  }

  // getRecipes() {
  //   const token = this.authService.getToken();
  //
  //   this.httpClient.get('https://ng-recipe-book-1b2d9.firebaseio.com/recipes.json?auth=' + token,
  //     { observe: 'body',
  //       responseType: 'json'
  //     })
  //     .pipe(map(
  //       (recipes) => {
  //       console.log(recipes);
  //         return [];
  //     }))
  //     .subscribe(
  //       (recipes: Recipe[]) => {
  //         this.recipeService.setRecipes(recipes);
  //       }
  //     );
  // }
}

