import Ranking from "./raking.js";
import RendererRanking from "./renderer-ranking.js";

// Adding an eventListener to run the scripts when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const ranking = new Ranking(); // Instance of Ranking object

  // Fetching candidates data with ranking fetchCandidates method
  ranking.fetchCandidates().then((response) => {
    const candidates = response.data; // Save the candidadtes data in an array of candidates
    const candidatesRating = ranking.calculateVotes(candidates); // Calculate the candidates votes and return an array with the positive and negative percentage of votes for each candidate in the array
    const candidatesSorted = ranking.sortByPopularity(candidatesRating); // Sort the candidates by the positive votes percentage in desc order
    const rendererRanking = new RendererRanking(candidatesSorted, 2000); // Construct the html structure of candidates to display for the user

    rendererRanking.renderRanking("#renderer_element"); // Select an element to render the constructed structure and finally show the candidates list, sorted, for the users
  });
});
