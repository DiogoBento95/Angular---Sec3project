import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs-compat/operator/map";
import { tap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-course-recipe-book-22bef-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
    .subscribe(response => {
      console.log(response);
    });
  }

  // Working.

  /*fetchRecipes() {
    this.http.get<Recipe[]>('https://ng-course-recipe-book-22bef-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
    .subscribe(recipes => {
      this.recipeService.setRecipes(recipes);
    });
  }
}*/

  // Not working.

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-22bef-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
  }

}
