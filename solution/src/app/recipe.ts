import { Component, input } from "@angular/core";
import { Recipe } from "../utils";

@Component({
  selector: "recipe",
  imports: [],
  template: `
    @if(recipe()){
      <h1>{{recipe()?.name}}</h1>
      <img [src]="recipe()?.image" [alt]="recipe()?.name" width="500" />
      <p>Ingredients: {{recipe()?.ingredients}}</p>
    }
  `,
})
export class RecipeComponent {
  readonly recipe = input<Recipe | null>(null);
}
