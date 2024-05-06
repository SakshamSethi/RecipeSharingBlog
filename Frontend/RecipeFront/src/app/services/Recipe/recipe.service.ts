import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = 'http://localhost:8080';
  constructor(private http:HttpClient) { }

  recipeSubject = new BehaviorSubject<any>({
  recipes:[], 
  loading:false,
  newRecipe:null
  })

  private getHeaders():HttpHeaders
  {
    var token = localStorage.getItem("jwt")
    token = "Bearer "+token;
    console.log(token.substring(7))
    return new HttpHeaders({
      Authorization : token,
  })
  }
getRecipes():Observable<any>{
  var headers = this.getHeaders();
  return this.http.get(`${this.baseUrl}/api/recipes`,{headers}).pipe(

    tap((recipes)=>{
      var currentState = this.recipeSubject.value
      console.log('Current State:', currentState); // Debug: check the state
      this.recipeSubject.next({...currentState,recipes})
    })
  )
}

createRecipe(recipe:any):Observable<any>{
  var headers = this.getHeaders();
  return this.http.post(`${this.baseUrl}/api/recipes`,recipe,{headers}).pipe(

    tap((newRecipe)=>{
      const currentState = this.recipeSubject.value
      this.recipeSubject.next({...currentState,recipes:[newRecipe,...currentState.recipes]})
    })
  )
}

updateRecipe(recipe:any):Observable<any>{
  var headers = this.getHeaders();
  return this.http.put(`${this.baseUrl}/api/recipes/${recipe.id}`,recipe,{headers}).pipe(

    tap((updatedRecipe:any)=>{
      const currentState = this.recipeSubject.value;
      const updatedRecipes = currentState.recipes.map((item:any)=>{item.id==updatedRecipe.id?updatedRecipe:item})
      this.recipeSubject.next({...currentState,updatedRecipes})
    })
  )
}

delteRecipe(id:any):Observable<any>{
  var headers = this.getHeaders();
  return this.http.delete(`${this.baseUrl}/api/recipes/${id}`,{headers}).pipe(

    tap((deletedRecipe:any)=>{
      const currentState = this.recipeSubject.value
       
      const updatedRecipes = currentState.recipes.filter((item: any) => item.id !== id);

      this.recipeSubject.next({...currentState,updatedRecipes})
    })
  )
}

likeRecipe(id:any):Observable<any>{
  const headers = this.getHeaders();
  return this.http.delete(`${this.baseUrl}/api/recipes/${id}/like`,{headers}).pipe(

    tap((updatedRecipe:any)=>{
      const currentState = this.recipeSubject.value;
      const updatedRecipes = currentState.recipes.map((item:any)=>{item.id==updatedRecipe.id?updatedRecipe:item})
      this.recipeSubject.next({...currentState,updatedRecipes})
    })
  )
}

}
