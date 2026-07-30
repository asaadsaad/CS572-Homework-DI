import { Component, effect, inject, signal } from "@angular/core";
import { Recipe, RecipesResponse } from "../utils";
import { HttpClient } from "@angular/common/http";
import { RecipeComponent } from "./recipe";
import { NavigationComponent } from "./navigation";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "two",
  imports: [RecipeComponent, NavigationComponent],
  template: ` 
    @if(isLoading()){
      <div aria-busy="true">Loading your recipe...</div>
    }
    @if(recipe()){
      <recipe [recipe]="recipe()"/>
      <navigation [(skip)]="skip" [total]="total()"/>
    }
    @if(error()){
      <div>Something went wrong, please try again later.</div>
    }
  `,
  styles: ``,
})
export class TwoComponent {
  protected readonly skip = signal(0); // 0 to 49
  protected readonly total = signal(0);
  protected readonly recipe = signal<Recipe | null>(null);
  protected readonly isLoading = signal(false);
  protected readonly error = signal("");
  protected readonly http = inject(HttpClient);
  protected readonly titleService = inject(Title);

  constructor() {
    effect(() => {
      this.isLoading.set(true);
      this.http.get<RecipesResponse>(
        `https://dummyjson.com/recipes?skip=${this.skip()}&limit=1`,
      ).subscribe({
        next: (response) => {
          this.isLoading.set(false);
          this.recipe.set(response.recipes[0]);
          this.total.set(response.total);
          this.titleService.setTitle(response.recipes[0].name);
        },
        error: (error) => {
          this.isLoading.set(false);
          this.error.set(error.message);
        },
      });
    });
  }
}
