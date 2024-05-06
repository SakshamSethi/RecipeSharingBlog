import { Component } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import {MatDialog, MatDialogRef, MatDialogModule,MatDialogActions,MatDialogClose,MatDialogTitle,MatDialogContent} from '@angular/material/dialog';
import { CreateRecipeComponent } from '../create-recipe/create-recipe.component';
import { AuthserviceService } from '../../services/Auth/authservice.service';
import { RecipeService } from '../../services/Recipe/recipe.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RecipeCardComponent,MatIconModule,MatButtonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  recipes=[]
constructor(public dialog : MatDialog,public authservice:AuthserviceService,private recipeService:RecipeService) {
  
}
 handleopenCreateRecipeForm(){
  this.dialog.open(CreateRecipeComponent)
 }

 ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.authservice.getUserProfile()
  this.loadRecipe()
 }
loadRecipe()
{
  this.recipeService.getRecipes().subscribe()
  this.recipeService.recipeSubject.subscribe(
    (state)=>{this.recipes=state.recipes}
  )
}
onRecipeDeleted()
{
  this.loadRecipe()
}
}
