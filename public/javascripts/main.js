/*
 * class that makes operations in a candidate ranking list
 * @function fetchCandidates
 * @function calculateVotes
 * @function sortByPopularity
 */
class Ranking {
  /*
   * function to calculate the percentage of positives and negatives of an candidate in the ranking
   * @param (candidates) - array of candidates containing objects of type candidate with the following properties: __id, timestamp, name,
   * description, picture, positive and negative.
   */
  async fetchCandidates() {
    const url = "http://localhost:7007/fazenda.json";

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Response status:${response.status}`);
      }

      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  /*
   * function to calculate the percentage of positives and negatives of an candidate in the ranking
   * @param (candidates) - array of candidates containing objects of type candidate with the following properties: __id, timestamp, name,
   * description, picture, positive and negative.
   */
  calculateVotes(candidates) {
    return candidates.map((candidate) => {
      const positive = parseInt(candidate.positive) ?? 0;
      const negative = parseInt(candidate.negative) ?? 0;

      const total = positive + negative;

      const positivePercentage = ((positive * 100) / total).toFixed(0);
      const negativePercentage = ((negative * 100) / total).toFixed(0);

      candidate["positive_percentage"] = isNaN(positivePercentage)
        ? 0
        : positivePercentage;
      candidate["negative_percentage"] = isNaN(negativePercentage)
        ? 0
        : negativePercentage;
      return candidate;
    });
  }

  /*
   * function to sort the candidates of the ranking based on his percentages of positives
   * @param (candidates) - array of candidates containing objects of type candidate with the following properties: __id, timestamp, name,
   * description, picture, positive and negative.
   */
  sortByPopularity(candidates) {
    return candidates.sort(
      (a, b) => b.positive_percentage - a.negative_percentage
    );
  }
}

class RendererRanking {
  candidates = [];

  constructor(candidates) {
    this.candidates = candidates;
  }

  renderRanking(target) {
    const renderer = document.querySelector(target);
    if (!(renderer instanceof HTMLElement) || this.candidates.length < 1) {
      window.alert(
        "Elemento renderizador não encontrado ou lista de candidatos não informada."
      );
      return;
    }

    this.candidates.forEach((candidate, index) => {
      renderer.innerHTML +=
        '<div class="card d-flex p-1 column-gap-2"><div class="circle border-3"><img class="circle" src="' +
        candidate.picture +
        '" alt="' +
        candidate.description +
        '"><span class="badges circle">' +
        (index + 1) +
        '</span></div><div class="card-body d-flex flex-column justify-content-center"><h3 class="name font-md semi-bolder">' +
        candidate.name +
        '</h3><p class="description font-sm">' +
        candidate.description +
        "</p></div></div>";
    });
  }
}

const ranking = new Ranking();

ranking.fetchCandidates().then((response) => {
  const candidates = response.data;
  const candidatesRating = ranking.calculateVotes(candidates);
  const candidatesSorted = ranking.sortByPopularity(candidatesRating);

  console.log(candidatesSorted);

  const rendererRanking = new RendererRanking(candidatesSorted);

  rendererRanking.renderRanking("#renderer_element");
});
