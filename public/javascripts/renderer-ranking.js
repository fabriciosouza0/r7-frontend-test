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
      console.error(
        "Invalid target element provided for ranking rendering. Or failure in the fetch of candidates"
      );
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
              <div class="tool-tip-header">GOSTARAM</div>
              <div class="tool-tip-body">${candidate.positive_percentage}%</div>
            </div>
            <div class="right">
              <div class="tool-tip-header">NÃO GOSTARAM</div>
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

      // If the tooltip is hidden, show it and position it correctly
      if (isTooltipHidden) {
        this.showToolTip(parent, tooltip);
      }
    });
  }

  // Checks if there is enough space to the left of the element to display the tooltip beside it,
  // returning true if it can be positioned correctly.
  placeTooltipAside(parent, tooltip) {
    const parentX = parent.getBoundingClientRect().x; // Gets the horizontal position of the card
    const tooltipWidth = Math.round(
      tooltip.getBoundingClientRect().width +
        TOOLTIP_OFFSETS.RIGHT_GAP +
        TOOLTIP_OFFSETS.ARROW_SIZE
    ); // Calculates the total width of the tooltip including the right margin and the arrow size

    console.log(tooltipWidth < parentX);

    return tooltipWidth < parentX; // Returns true if the tooltip fits in the left position
  }

  // Calculates the final horizontal position of the tooltip based on the size of the card and the candidate's image
  calculateTooltipOffset(parent, tooltip) {
    const parentWidth = parent.getBoundingClientRect().width; // Total width of the card
    const candidatePicWidth = parent
      .querySelector("div.circle.border-3")
      .getBoundingClientRect().width; // Width of the candidate's image
    const tooltipWidth = Math.round(tooltip.getBoundingClientRect().width); // Width of the tooltip

    // Returns the final adjusted position considering the sizes of the card, image, and tooltip arrow
    return (
      parentWidth -
      tooltipWidth -
      candidatePicWidth -
      TOOLTIP_OFFSETS.ARROW_SIZE -
      TOOLTIP_OFFSETS.RIGHT_GAP
    );
  }

  // Calculates the initial position of the tooltip before displaying it, ensuring a sliding effect
  calculateTooltipInitialPosition(tooltip) {
    const tW = tooltip.getBoundingClientRect().width; // Gets the tooltip width
    const initialPosition = Math.round(
      tW + TOOLTIP_OFFSETS.RIGHT_GAP + TOOLTIP_OFFSETS.ARROW_SIZE
    ); // Calculates the initial position offset

    return initialPosition; // Returns the calculated initial position
  }

  // Method to show the tooltip and position it relative to the card
  async showToolTip(parent, tooltip) {
    tooltip.classList.remove("d-none"); // Make the tooltip visible
    const tW = tooltip.getBoundingClientRect().width; // tooltip width
    const placeAside = this.placeTooltipAside(parent, tooltip); // Verify if the tooltip can be placed aside the candidate card
    const initialPosition = this.calculateTooltipInitialPosition(tooltip);

    // If the tooltip would overflow to the left, adjust its position
    if (placeAside) {
      this.hideTooltip(tooltip, `-${initialPosition}px`); // Start the timer to hide the tooltip
      tooltip.style.right = `-${tW + TOOLTIP_OFFSETS.RIGHT_GAP}px`; // Move the tooltip to the left
      tooltip.style.opacity = 1; // Make it fully visible
      return;
    }

    // Determine the final position of the tooltip based on the card's width(in mobile case)
    const finalPosition = this.calculateTooltipOffset(parent, tooltip);

    this.hideTooltip(tooltip, 0); // Start the timer to hide the tooltip

    tooltip.style.right = `${finalPosition}px`; // Position the tooltip
    tooltip.style.opacity = 1; // Make it fully visible
  }

  // Method to hide the tooltip after a delay
  hideTooltip(tooltip, startPosition) {
    setTimeout(() => {
      tooltip.style.right = startPosition; // Move the tooltip back to its starting position
      tooltip.style.opacity = 0; // Fade it out
    }, this.tooltipDelay); // Wait for the specified delay

    // After the fade-out animation, hide the tooltip completely
    setTimeout(() => {
      tooltip.classList.add("d-none"); // Hide the tooltip
      tooltip.removeAttribute("style"); // Remove any inline styles
    }, this.tooltipDelay + 250); // Wait a bit longer to ensure the animation finishes
  }
}
