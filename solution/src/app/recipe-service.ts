import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";
import { RecipesResponse } from "../utils";

@Service()
export class RecipeService {
    protected readonly http = inject(HttpClient);

    getRecipe(skip: number) {
        return this.http.get<RecipesResponse>(
            `https://dummyjson.com/recipes?skip=${skip}&limit=1`,
        );
    }
}
