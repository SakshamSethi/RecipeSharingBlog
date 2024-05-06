package com.food.controllers;

import com.food.model.Recipe;
import com.food.model.User;
import com.food.services.RecipeService;
import com.food.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recipes")

public class RecipiController {
    @Autowired
    private RecipeService  recipeService;

    @Autowired
    private UserService userService;

    @PostMapping()
    public Recipe createRecipe(@RequestBody Recipe recipe , @RequestHeader("Authorization") String jwt) throws Exception {
        System.out.println(jwt);
        User user = this.userService.findUserByJwt(jwt);
        return this.recipeService.createRecipe(recipe,user);
    }

    @GetMapping()
    public List<Recipe> getAllRecipe()
    {
        List<Recipe>  recipes =  this.recipeService.findAllRecipe();
        return  recipes;
    }
    @DeleteMapping("/{recipeId}")
    public ResponseEntity<Map<String, String>> deleteRecipe(@PathVariable Long recipeId) throws Exception {
        this.recipeService.deleteRecipe(recipeId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Deleted successfully");

        return ResponseEntity.ok(response); // Return a JSON object with a message
    }

    @PutMapping("/{recipeId}")
    public Recipe updateRecipe( @RequestBody Recipe recipe,@PathVariable Long recipeId) throws Exception {

        return   this.recipeService.updateRecipe(recipe,recipeId);

    }

    @PutMapping("/{recipeId}/like")
    public Recipe likeRecipe( @PathVariable Long recipeId , @RequestHeader("Authorization")String jwt) throws Exception {

         User user = this.userService.findUserByJwt(jwt);
         Recipe recipe= this.recipeService.likeRecipe(recipeId,user);
         return recipe;
    }
}
