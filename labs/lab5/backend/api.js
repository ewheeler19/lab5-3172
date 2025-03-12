const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY; 

app.use(express.static("public")); 

app.get("/api/recipes", async (req, res) => {
    const { ingredients, diet } = req.query;

    if (!ingredients) {
        return res.status(400).json({ error: "Ingredients are required." });
    }

    try {
        const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&includeIngredients=${ingredients}&diet=${diet}&number=5&addRecipeInformation=true`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.results) {
            return res.status(404).json({ error: "No recipes found." });
        }

        res.json(data.results);
    } catch (error) {
        console.error("Error fetching from API:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
