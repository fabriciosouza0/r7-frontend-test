import { TOOLTIP_OFFSETS } from "./constants.js";

// This class is responsible for rendering a ranking of candidates and handling tooltips.
export default class RendererRanking {
  candidates = []; // Stores the list of candidates to be displayed
  tooltipDelay = 2000; // Default delay before hiding the tooltip (2 seconds)

  // Constructor to initialize the class with candidates and an optional tooltip delay
  constructor(candidates, tooltipDelay) {
    this.candidates = candidates;
    this.tooltipDelay = tooltipDelay;
  }

  // Main method to render the ranking inside a target HTML element
  renderRanking(target) {
    const renderer = document.querySelector(target); // Find the target element where the ranking will be displayed

    // Check if the target element exists and if there are candidates to display
    if (!(renderer instanceof HTMLElement) || this.candidates.length < 1) {
      window.alert(
        "Elemento renderizador não encontrado ou lista de candidatos vazia/não informada."
      ); // Show an alert if something's wrong
      return;
    }

    // Generate the HTML for the ranking by mapping through the candidates
    renderer.innerHTML = this.candidates
      .map((candidate, index) => {
        return `
        <div class="card d-flex column-gap-2">
          <!-- Tooltip section, hidden by default -->
          <div class="tool-tip d-none">
            <div class="left">
              <div class="tool-tip-header">POSITIVO</div>
              <div class="tool-tip-body">${candidate.positive_percentage}%</div>
            </div>
            <div class="right">
              <div class="tool-tip-header">NEGATIVO</div>
              <div class="tool-tip-body">${candidate.negative_percentage}%</div>
            </div>
          </div>

          <!-- Candidate's image and ranking badge -->
          <div class="circle border-3">
            <img class="circle" draggable="false" src="${
              candidate.picture
            }" alt="${candidate.description}" />
            <span class="badges circle">${
              index + 1
            }</span> <!-- Display the candidate's rank -->
          </div>

          <!-- Candidate's name and description -->
          <div class="card-body d-flex flex-column justify-content-center">
            <h3 class="name font-md semi-bold">${candidate.name}</h3>
            <p class="description font-xsm">${candidate.description}</p>
          </div>
        </div>
      `;
      })
      .join(""); // Combine all the candidate cards into a single string

    // Add a click event listener to handle tooltip display
    renderer.addEventListener("click", (e) => {
      const parent = e.target.closest(".card"); // Find the closest card element that was clicked
      const tooltip = parent.querySelector(".tool-tip"); // Find the tooltip inside that card
      const isTooltipHidden = tooltip.classList.contains("d-none"); // Check if the tooltip is currently hidden
      const parentBCR = parent.getBoundingClientRect(); // Get the position and size of the card

      // If the tooltip is hidden, show it and position it correctly
      if (isTooltipHidden) {
        this.showToolTip(tooltip, parentBCR);
      }
    });
  }

  // Method to show the tooltip and position it relative to the card
  showToolTip(tooltip, boundingClientRect) {
    tooltip.classList.remove("d-none"); // Make the tooltip visible
    const parentWidth = boundingClientRect.width; // Get the width of the card
    const parentX = boundingClientRect.x; // Get the horizontal position of the card
    const tooltipWidth = parseInt(tooltip.getBoundingClientRect().width + 24); // Calculate the tooltip's width

    // If the tooltip would overflow to the left, adjust its position
    if (tooltipWidth < parentX) {
      this.hideTooltip(tooltip, -244); // Start the timer to hide the tooltip
      tooltip.style.right = `-${tooltipWidth}px`; // Move the tooltip to the left
      tooltip.style.opacity = 1; // Make it fully visible
      return;
    }

    // Determine the final position of the tooltip based on the card's width
    const finalPosition =
      parentWidth === 360
        ? `${TOOLTIP_OFFSETS.DESKTOP}px` // Desktop offset
        : `${TOOLTIP_OFFSETS.MOBILE}px`; // Mobile offset

    this.hideTooltip(tooltip, 0); // Start the timer to hide the tooltip

    tooltip.style.right = finalPosition; // Position the tooltip
    tooltip.style.opacity = 1; // Make it fully visible
  }

  // Method to hide the tooltip after a delay
  hideTooltip(tooltip, startPosition) {
    setTimeout(() => {
      tooltip.style.right = `${startPosition}px`; // Move the tooltip back to its starting position
      tooltip.style.opacity = 0; // Fade it out
    }, this.tooltipDelay); // Wait for the specified delay

    // After the fade-out animation, hide the tooltip completely
    setTimeout(() => {
      tooltip.classList.add("d-none"); // Hide the tooltip
      tooltip.removeAttribute("style"); // Remove any inline styles
    }, this.tooltipDelay + 250); // Wait a bit longer to ensure the animation finishes
  }
}
