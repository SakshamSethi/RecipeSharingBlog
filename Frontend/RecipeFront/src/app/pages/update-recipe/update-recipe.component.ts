import { Component ,Inject} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { RecipeService } from '../../services/Recipe/recipe.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
 
@Component({
  selector: 'app-update-recipe',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,FormsModule,MatButtonModule,MatRadioModule],
  templateUrl: './update-recipe.component.html',
  styleUrl: './update-recipe.component.scss'
})
export class UpdateRecipeComponent {
  recipeItem:any={
    title:"",
    description:"",
    foodType:"",
    image:""
  }

  constructor(private recipeService:RecipeService,@Inject(MAT_DIALOG_DATA)public recipe:any ){}
  onSubmit()
  {
    this.recipeService.updateRecipe(this.recipe).subscribe({
      next: (data)=>{alert("Updated Successfully")}
    });
    
    console.log(this.recipeItem);
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.recipeItem=this.recipe
  }
}
