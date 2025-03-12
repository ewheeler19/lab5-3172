const { displayRecipes } = require("./frontend.js");

test("should display recipes", () => {
    document.body.innerHTML = `<div id="results"></div>`;
    displayRecipes([{ title: "Pasta", image: "pasta.jpg", sourceUrl: "https://recipe.com" }]);

    const resultsDiv = document.getElementById("results");
    expect(resultsDiv.innerHTML).toContain("Pasta");
    expect(resultsDiv.innerHTML).toContain("pasta.jpg");
});
