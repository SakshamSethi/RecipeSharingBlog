package com.food.services;

import com.food.model.Recipe;
import com.food.model.User;
import com.food.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RecipeServiceImplementation  implements  RecipeService{

    @Autowired
    private RecipeRepository recipeRepository;

    @Override
    public Recipe createRecipe(Recipe recipe, User user) {

        Recipe createdRecipe = new Recipe();

         createdRecipe.setTitle(recipe.getTitle());
         createdRecipe.setImage(recipe.getImage());
         createdRecipe.setDescription(recipe.getDescription());
         createdRecipe.setUser(user);
         createdRecipe.setCreatedAt(LocalDateTime.now());

         return this.recipeRepository.save(createdRecipe);


    }

    @Override
    public Recipe findRecipeById(Long id) throws Exception {
        Optional<Recipe> opt = this.recipeRepository.findById(id);
        if(opt.isPresent())
        {
            return opt.get();
        }
            throw  new Exception("Recipe doesnt exist with the provided id"+id);
    }

    @Override
    public void deleteRecipe(Long id) throws Exception {
      findRecipeById(id);
      this.recipeRepository.deleteById(id);
    }

    @Override
    public Recipe updateRecipe(Recipe recipe, Long id) throws Exception {
        Recipe oldRecipe = findRecipeById(id);
        if(recipe.getTitle()!=null)
        {
            oldRecipe.setTitle(recipe.getTitle());
        }if(recipe.getImage()!=null)
        {
            oldRecipe.setImage(recipe.getImage());
        }if(recipe.getDescription()!=null)
        {
            oldRecipe.setDescription(recipe.getDescription());
        }

        return this.recipeRepository.save(oldRecipe);
    }

    @Override
    public List<Recipe> findAllRecipe() {
        return this.recipeRepository.findAll();
    }

    @Override
    public Recipe likeRecipe(Long recipeId, User user) throws Exception {
       Recipe recipe = findRecipeById(recipeId);

       if(recipe.getLikes().contains(user.getId()))
       {
           recipe.getLikes().remove(user.getId());
       }
       else
       {
           recipe.getLikes().add(user.getId());
       }
       return recipeRepository.save(recipe);
    }
}
