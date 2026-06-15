export const m = (html) => `<span class="math">${html}</span>`;

export const sup = (base, exponent) => `${base}<sup>${exponent}</sup>`;

export const frac = (top, bottom) =>
  `<span class="frac"><span>${top}</span><span>${bottom}</span></span>`;

export const sqrt = (value) =>
  `<span class="sqrt"><span class="sqrt-symbol">&radic;</span><span class="radicand">${value}</span></span>`;

export const orderedChoices = (choices) =>
  choices.map((choice, index) => `<span class="choice-number">(${index + 1})</span> ${choice}`);

export const table = (headers, rows) => `
  <table class="math-table">
    <thead>
      <tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr>
    </thead>
    <tbody>
      ${rows
        .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
        .join("")}
    </tbody>
  </table>
`;
