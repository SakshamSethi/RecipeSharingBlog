import { Component ,Input,EventEmitter  , Output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconButton} from '@angular/material/button'
import {MatIcon} from '@angular/material/icon'
import { MatDialog } from '@angular/material/dialog';
import { UpdateRecipeComponent } from '../update-recipe/update-recipe.component';
import { RecipeService } from '../../services/Recipe/recipe.service';
 
@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [MatCardModule,MatIcon, MatButtonModule,MatIconButton],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {

  
 @Input() recipe :any ;
 @Output() recipeDeleted = new EventEmitter<void>();
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  console.log(this.recipe);
  
}

  constructor(public dialog:MatDialog,private recipeService:RecipeService){

  }

  handleOpenEditRecipeForm()
  {
    this.dialog.open(UpdateRecipeComponent, {data:this.recipe} );
  }
  handleDeleteRecipe()
  {
    this.recipeService.delteRecipe(this.recipe.id).subscribe(
      {
        next: (response) => {
          alert(response.message); // Display the response message
          this.recipeDeleted.emit(); // Notify the parent that the recipe was deleted
        },
        error: (err) => console.error('Error deleting recipe:', err),
      }
    )
  }


}
