/*
 * Class that handles operations for a candidate ranking list
 * @function fetchCandidates - Gets candidate data from external source
 * @function calculateVotes - Computes vote percentages for each candidate
 * @function sortByPopularity - Orders candidates by approval rating
 */
export default class Ranking {
  // Fetches candidate data from JSON endpoint
  async fetchCandidates() {
    const url = "./fazenda.json";

    try {
      const response = await fetch(url);

      // Handle HTTP errors (like 404 or 500 status)
      if (!response.ok) {
        throw new Error(`Response status:${response.status}`);
      }

      // Return parsed JSON data if everything's okay
      return response.json();
    } catch (err) {
      // Show user-friendly error message if something breaks
      window.alert(`Erro ao obter dados dos canditados: ${err}`);
    }
  }

  //Calculates vote percentages for each candidate
  calculateVotes(candidates) {
    return candidates.map((candidate) => {
      // Convert string numbers to integers, default to 0 if missing
      const positive = parseInt(candidate.positive) ?? 0;
      const negative = parseInt(candidate.negative) ?? 0;

      // Calculate total votes to determine percentages
      const total = positive + negative;

      // Calculate percentages (rounded to whole numbers)
      const positivePercentage = ((positive * 100) / total).toFixed(0);
      const negativePercentage = ((negative * 100) / total).toFixed(0);

      // Add calculated percentages to candidate object
      // Handle division by zero case with isNaN check
      candidate["positive_percentage"] = isNaN(positivePercentage)
        ? 0
        : positivePercentage;
      candidate["negative_percentage"] = isNaN(negativePercentage)
        ? 0
        : negativePercentage;
      return candidate;
    });
  }

  // Sorts candidates by positive percentage (highest first)
  sortByPopularity(candidates) {
    // Sort in descending order using positive_percentage
    return candidates.sort(
      (a, b) => b.positive_percentage - a.positive_percentage
    );
  }
}
