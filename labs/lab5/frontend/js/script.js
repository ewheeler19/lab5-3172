document.getElementById("recipeForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const ingredients = document.getElementById("ingredients").value;
    const diet = document.getElementById("diet").value;

    if (!ingredients.trim()) {
        alert("Please enter at least one ingredient.");
        return;
    }

    try {
        const response = await fetch(`/api/recipes?ingredients=${ingredients}&diet=${diet}`);
        const data = await response.json();

        displayRecipes(data);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        document.getElementById("results").innerHTML = "<p>Failed to fetch recipes.</p>";
    }
});

function displayRecipes(recipes) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (recipes.length === 0) {
        resultsDiv.innerHTML = "<p>No recipes found.</p>";
        return;
    }

    recipes.forEach(recipe => {
        const recipeElement = document.createElement("div");
        recipeElement.classList.add("recipe");
        recipeElement.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}" width="200">
            <p><a href="${recipe.sourceUrl}" target="_blank">View Recipe</a></p>
        `;
        resultsDiv.appendChild(recipeElement);
    });
}
