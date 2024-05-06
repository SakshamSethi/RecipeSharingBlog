import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { RecipeService } from '../../services/Recipe/recipe.service';
@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,FormsModule,MatButtonModule,MatRadioModule],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss'
})
export class CreateRecipeComponent {

  recipeItem:any={
    title:"",
    description:"",
    foodType:"",
    image:""
  }


  constructor(private recipeService : RecipeService){}

  onSubmit()
  {
    console.log(this.recipeItem);
    this.recipeService.createRecipe(this.recipeItem).subscribe(
      {
        next:data=>{},
        error:er=>alert("Something went wrong"+er),
      }
    )
      
  }

}
