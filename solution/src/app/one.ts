import { Component, effect, signal } from "@angular/core";
import { Recipe, RecipesResponse } from "../utils";
import { RecipeComponent } from "./recipe";
import { NavigationComponent } from "./navigation";

@Component({
  selector: "one",
  imports: [RecipeComponent, NavigationComponent],
  template: `
  <recipe [recipe]="recipe()"/>
  <navigation [(skip)]="skip" [total]="total()"/>
  `,
})
export class OneComponent {
  protected readonly skip = signal(0); // 0 to 49
  protected readonly total = signal(0);
  protected readonly recipe = signal<Recipe | null>(null);

  constructor() {
    effect(async () => {
      const response = await fetch(
        `https://dummyjson.com/recipes?skip=${this.skip()}&limit=1`,
      );
      const recipesResponse: RecipesResponse = await response.json();
      this.recipe.set(recipesResponse.recipes[0]);
      this.total.set(recipesResponse.total);
    });
  }
}
