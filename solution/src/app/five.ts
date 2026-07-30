import { Component, effect, inject, signal } from "@angular/core";
import { RecipesResponse } from "../utils";
import { httpResource } from "@angular/common/http";
import { RecipeComponent } from "./recipe";
import { NavigationComponent } from "./navigation";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "five",
  imports: [RecipeComponent, NavigationComponent],
  template: ` 
    @if(recipeResource.error()){
      <div>Something went wrong, please try again later.</div>
    }@else if(recipeResource.hasValue()){
      <recipe [recipe]="recipeResource.value().recipes[0]"/>
      <navigation [(skip)]="skip" [total]="recipeResource.value().total"/>
    }
    @if(recipeResource.isLoading()){
      <div aria-busy="true">Loading your recipe...</div>
    }
  `,
  styles: ``,
})
export class FiveComponent {
  protected readonly skip = signal(0); // 0 to 49
  protected readonly titleService = inject(Title);

  protected readonly recipeResource = httpResource<RecipesResponse>(() =>
    `https://dummyjson.com/recipes?skip=${this.skip()}&limit=1`
  );

  constructor() {
    effect(() => {
      if (this.recipeResource.hasValue()) {
        this.titleService.setTitle(this.recipeResource.value().recipes[0].name);
      }
    });
  }
}
