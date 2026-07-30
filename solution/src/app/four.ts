import { Component, computed, inject, signal } from "@angular/core";
import { RecipeComponent } from "./recipe";
import { NavigationComponent } from "./navigation";
import { RecipeService } from "./recipe-service";
import { AsyncPipe } from "@angular/common";
import { Title } from "@angular/platform-browser";
import { catchError, of, tap } from "rxjs";

@Component({
  selector: "four",
  imports: [RecipeComponent, NavigationComponent, AsyncPipe],
  template: ` 
    @let recipeResponse = recipeFetcher() | async;
    @if(recipeResponse && 'error' in recipeResponse){
      <div>Something went wrong, please try again later.</div>
    }@else if(recipeResponse){
      <recipe [recipe]="recipeResponse.recipes[0]"/>
      <navigation [(skip)]="skip" [total]="recipeResponse.total"/>
    }
    @if(!recipeResponse){
      <div aria-busy="true">Loading your recipe...</div>
    }
  `,
  styles: ``,
})
export class FourComponent {
  protected readonly skip = signal(0); // 0 to 49
  protected readonly recipeService = inject(RecipeService);
  protected readonly titleService = inject(Title);

  protected readonly recipeFetcher = computed(() => {
    return this.recipeService.getRecipe(this.skip()).pipe(
      tap((recipesResponse) =>
        this.titleService.setTitle(recipesResponse.recipes[0].name)
      ),
      catchError((error) => of({ error: error.message })),
    );
  });
}
