import { frac, m, sqrt, sup, table } from "../lib/math.js";

const x2 = sup("x", "2");
const x3 = sup("x", "3");
const x4 = sup("x", "4");
const x5 = sup("x", "5");
const x6 = sup("x", "6");
const x7 = sup("x", "7");
const x8 = sup("x", "8");
const x9 = sup("x", "9");
const x14 = sup("x", "14");
const x15 = sup("x", "15");
const x16 = sup("x", "16");

const q = (topicId, topicName, variation, prompt, choices, correctIndex, explanation, strategy = "") => ({
  id: `t${String(topicId).padStart(2, "0")}-${variation}`,
  topicId,
  topicName,
  prompt,
  choices,
  correctIndex,
  explanation,
  strategy,
});

const factorStrategy = (original, comparison, rows) => `
  <p>Calculator table check:</p>
  <p>${m(`Y<sub>1</sub> = ${original}`)}</p>
  <p>${m(`Y<sub>2</sub> = ${comparison}`)}</p>
  ${table([m("x"), m("Y<sub>1</sub>"), m("Y<sub>2</sub>")], rows)}
`;

export const QUESTION_BANK = [
  q(
    1,
    "Factoring trinomials",
    "a",
    m(`Factor ${x2} - 5x + 6.`),
    [m("(x - 2)(x - 3)"), m("(x + 2)(x + 3)"), m("(x - 1)(x - 6)"), m("(x + 1)(x - 6)")],
    0,
    `<p>The numbers -2 and -3 multiply to 6 and add to -5, so the factors are ${m("(x - 2)(x - 3)")}.</p>`,
    factorStrategy(`${x2} - 5x + 6`, "(x - 2)(x - 3)", [
      [m("0"), m("6"), m("6")],
      [m("2"), m("0"), m("0")],
      [m("3"), m("0"), m("0")],
    ])
  ),
  q(
    1,
    "Factoring trinomials",
    "b",
    m(`Factor ${x2} + 7x + 12.`),
    [m("(x + 3)(x + 4)"), m("(x - 3)(x - 4)"), m("(x + 2)(x + 6)"), m("(x - 2)(x - 6)")],
    0,
    `<p>The numbers 3 and 4 multiply to 12 and add to 7, so the factors are ${m("(x + 3)(x + 4)")}.</p>`
  ),
  q(
    1,
    "Factoring trinomials",
    "c",
    m(`Factor ${x2} - x - 20.`),
    [m("(x - 5)(x + 4)"), m("(x + 5)(x - 4)"), m("(x - 10)(x + 2)"), m("(x + 10)(x - 2)")],
    0,
    `<p>The numbers -5 and 4 multiply to -20 and add to -1, so the factors are ${m("(x - 5)(x + 4)")}.</p>`
  ),

  q(
    2,
    "Roots from factored quadratics",
    "a",
    m("What are the roots of (x - 3)(x + 2) = 0?"),
    [m("3 and -2"), m("-3 and 2"), m("3 and 2"), m("-3 and -2")],
    0,
    `<p>Zeros are the x-values where y = 0. Set each factor equal to 0. The opposite signs give roots 3 and -2.</p>`
  ),
  q(
    2,
    "Roots from factored quadratics",
    "b",
    m("What are the roots of (x + 5)(x + 1) = 0?"),
    [m("-5 and -1"), m("5 and 1"), m("-5 and 1"), m("5 and -1")],
    0,
    `<p>Each factor equals 0, so ${m("x + 5 = 0")} gives -5 and ${m("x + 1 = 0")} gives -1.</p>`
  ),
  q(
    2,
    "Roots from factored quadratics",
    "c",
    m("What are the roots of (x - 4)(x - 6) = 0?"),
    [m("4 and 6"), m("-4 and -6"), m("4 and -6"), m("-4 and 6")],
    0,
    `<p>Factors use opposite signs for roots: ${m("x - 4")} gives 4 and ${m("x - 6")} gives 6.</p>`
  ),

  q(
    3,
    "Solving quadratic equations by factoring",
    "a",
    m(`What are the roots of ${x2} + 10x + 21 = 0?`),
    [m("-3 and -7"), m("3 and 7"), m("-1 and -21"), m("1 and 21")],
    0,
    `<p>${m(`${x2} + 10x + 21`)} factors to ${m("(x + 3)(x + 7)")}. The roots are -3 and -7.</p>`
  ),
  q(
    3,
    "Solving quadratic equations by factoring",
    "b",
    m(`What are the roots of ${x2} - 9x + 20 = 0?`),
    [m("4 and 5"), m("-4 and -5"), m("2 and 10"), m("-2 and -10")],
    0,
    `<p>${m(`${x2} - 9x + 20`)} factors to ${m("(x - 4)(x - 5)")}. The roots are 4 and 5.</p>`
  ),
  q(
    3,
    "Solving quadratic equations by factoring",
    "c",
    m(`What are the roots of ${x2} + 2x - 15 = 0?`),
    [m("3 and -5"), m("-3 and 5"), m("1 and -15"), m("-1 and 15")],
    0,
    `<p>${m(`${x2} + 2x - 15`)} factors to ${m("(x + 5)(x - 3)")}. The roots are -5 and 3.</p>`
  ),

  q(
    4,
    "Degree of a polynomial",
    "a",
    m(`What is the degree of 9${x5} - 4${x3} - 2x + 7?`),
    [m("5"), m("4"), m("3"), m("7")],
    0,
    `<p>The degree is the greatest exponent. The greatest exponent here is 5.</p>`
  ),
  q(
    4,
    "Degree of a polynomial",
    "b",
    m(`What is the degree of 3${x4} + 8${sup("x", "2")} - 10?`),
    [m("4"), m("3"), m("2"), m("10")],
    0,
    `<p>The greatest exponent is 4, so the degree is 4.</p>`
  ),
  q(
    4,
    "Degree of a polynomial",
    "c",
    m(`What is the degree of 12${x6} - x + 1?`),
    [m("6"), m("12"), m("1"), m("0")],
    0,
    `<p>The highest power of x is 6, so the degree is 6.</p>`
  ),

  q(
    5,
    "Leading coefficient",
    "a",
    m(`What is the leading coefficient of 19x + 21${sup("x", "2")} - 8?`),
    [m("21"), m("19"), m("-8"), m("2")],
    0,
    `<p>In standard form, the polynomial is ${m(`21${sup("x", "2")} + 19x - 8`)}. The leading coefficient is 21.</p>`
  ),
  q(
    5,
    "Leading coefficient",
    "b",
    m(`What is the leading coefficient of -4${x3} + 7${sup("x", "2")} + 1?`),
    [m("-4"), m("4"), m("7"), m("1")],
    0,
    `<p>The highest-degree term is ${m(`-4${x3}`)}, so the leading coefficient is -4.</p>`
  ),
  q(
    5,
    "Leading coefficient",
    "c",
    m(`What is the leading coefficient of 5 - 2x + 9${x4}?`),
    [m("9"), m("5"), m("-2"), m("4")],
    0,
    `<p>In standard form, the first term is ${m(`9${x4}`)}. The leading coefficient is 9.</p>`
  ),

  q(
    6,
    "GCF of polynomial terms",
    "a",
    m(`What is the GCF of 10${x7} - 5${x3} - 20${x9}?`),
    [m(`5${x3}`), m(`10${x3}`), m(`5${x7}`), m(`20${x9}`)],
    0,
    `<p>The GCF of the coefficients is 5, and the smallest exponent of x is 3.</p>`
  ),
  q(
    6,
    "GCF of polynomial terms",
    "b",
    m(`What is the GCF of 12${x5} + 18${x3}?`),
    [m(`6${x3}`), m(`6${x5}`), m(`3${x3}`), m(`12${x3}`)],
    0,
    `<p>The GCF of 12 and 18 is 6, and the smallest exponent is 3.</p>`
  ),
  q(
    6,
    "GCF of polynomial terms",
    "c",
    m(`What is the GCF of 15${x4} - 25${sup("x", "2")} + 10x?`),
    [m("5x"), m(`5${sup("x", "2")}`), m("10x"), m(`15${x4}`)],
    0,
    `<p>The GCF of the coefficients is 5, and every term has at least one x.</p>`
  ),

  q(
    7,
    "Simplifying polynomial expressions",
    "a",
    m(`Simplify (3${sup("x", "2")} + 5x) + (2${sup("x", "2")} - 7x).`),
    [m(`5${sup("x", "2")} - 2x`), m(`${sup("x", "2")} - 12x`), m(`6${sup("x", "2")} - 2x`), m(`5${sup("x", "2")} + 12x`)],
    0,
    `<p>Combine like terms: ${m(`3${sup("x", "2")} + 2${sup("x", "2")} = 5${sup("x", "2")}`)} and ${m("5x - 7x = -2x")}.</p>`
  ),
  q(
    7,
    "Simplifying polynomial expressions",
    "b",
    m(`Simplify (8${sup("x", "2")} - 4x + 1) - (3${sup("x", "2")} + 2x - 5).`),
    [m(`5${sup("x", "2")} - 6x + 6`), m(`5${sup("x", "2")} - 2x - 4`), m(`11${sup("x", "2")} - 2x - 4`), m(`5${sup("x", "2")} + 6x + 6`)],
    0,
    `<p>Distribute the subtraction, then combine like terms: ${m(`8${sup("x", "2")} - 3${sup("x", "2")} = 5${sup("x", "2")}`)}, ${m("-4x - 2x = -6x")}, and ${m("1 + 5 = 6")}.</p>`
  ),
  q(
    7,
    "Simplifying polynomial expressions",
    "c",
    m(`Simplify (${sup("x", "2")} + 6x - 2) + (4${sup("x", "2")} - x + 9).`),
    [m(`5${sup("x", "2")} + 5x + 7`), m(`3${sup("x", "2")} + 7x + 7`), m(`5${sup("x", "2")} + 7x - 11`), m(`4${sup("x", "2")} + 5x + 7`)],
    0,
    `<p>Combine like terms by degree: squared terms, x terms, and constants.</p>`
  ),

  q(
    8,
    "Multiplying binomials",
    "a",
    m("Multiply (x + 3)(x + 4)."),
    [m(`${x2} + 7x + 12`), m(`${x2} + 12x + 7`), m(`${x2} - 7x + 12`), m(`${x2} + x + 12`)],
    0,
    `<p>Use distribution: ${m("x(x + 4) + 3(x + 4)")}. The middle terms add to 7x.</p>`
  ),
  q(
    8,
    "Multiplying binomials",
    "b",
    m("Multiply (x - 5)(x + 2)."),
    [m(`${x2} - 3x - 10`), m(`${x2} + 3x - 10`), m(`${x2} - 7x - 10`), m(`${x2} - 3x + 10`)],
    0,
    `<p>The outside and inside terms are ${m("2x")} and ${m("-5x")}, which combine to ${m("-3x")}.</p>`
  ),
  q(
    8,
    "Multiplying binomials",
    "c",
    m("Multiply (2x + 1)(x - 6)."),
    [m(`2${x2} - 11x - 6`), m(`2${x2} + 11x - 6`), m(`2${x2} - 12x + 1`), m(`${x2} - 11x - 6`)],
    0,
    `<p>${m("2x")} times ${m("-6")} is ${m("-12x")}, and ${m("1")} times ${m("x")} is ${m("x")}. Together they make ${m("-11x")}.</p>`
  ),

  q(
    9,
    "Exponent rules",
    "a",
    m(`Simplify ${x3} &middot; ${x5}.`),
    [m(x8), m(sup("x", "15")), m(`${sup("x", "2")}`), m(`${sup("x", "5")}`)],
    0,
    `<p>When multiplying powers with the same base, add exponents: ${m("3 + 5 = 8")}.</p>`
  ),
  q(
    9,
    "Exponent rules",
    "b",
    m(`Simplify (${sup("x", "2")})<sup>4</sup>.`),
    [m(x8), m(x6), m(sup("x", "16")), m(x2)],
    0,
    `<p>When raising a power to a power, multiply exponents: ${m("2 &middot; 4 = 8")}.</p>`
  ),
  q(
    9,
    "Exponent rules",
    "c",
    m(`Simplify ${frac(x7, sup("x", "2"))}.`),
    [m(x5), m(x9), m(x3), m(x14)],
    0,
    `<p>When dividing powers with the same base, subtract exponents: ${m("7 - 2 = 5")}.</p>`
  ),

  q(
    10,
    "Solving linear equations",
    "a",
    m("Solve 3x + 7 = 22."),
    [m("x = 5"), m("x = 9"), m("x = 15"), m("x = 29")],
    0,
    `<p>Subtract 7 from both sides to get ${m("3x = 15")}, then divide by 3.</p>`
  ),
  q(
    10,
    "Solving linear equations",
    "b",
    m("Solve 5x - 9 = 31."),
    [m("x = 8"), m("x = 4"), m("x = 22"), m("x = 40")],
    0,
    `<p>Add 9 to get ${m("5x = 40")}, then divide by 5.</p>`
  ),
  q(
    10,
    "Solving linear equations",
    "c",
    m("Solve 2(x + 4) = 18."),
    [m("x = 5"), m("x = 7"), m("x = 9"), m("x = 14")],
    0,
    `<p>Divide by 2 to get ${m("x + 4 = 9")}, then subtract 4.</p>`
  ),

  q(
    11,
    "Multi-step linear equations",
    "a",
    m("Solve 4x - 3 = 2x + 9."),
    [m("x = 6"), m("x = 3"), m("x = -6"), m("x = 12")],
    0,
    `<p>Subtract 2x from both sides, then add 3: ${m("2x = 12")}, so ${m("x = 6")}.</p>`
  ),
  q(
    11,
    "Multi-step linear equations",
    "b",
    m("Solve 7x + 5 = 3x - 11."),
    [m("x = -4"), m("x = 4"), m("x = -1"), m("x = -16")],
    0,
    `<p>Subtract 3x and subtract 5 to get ${m("4x = -16")}, so ${m("x = -4")}.</p>`
  ),
  q(
    11,
    "Multi-step linear equations",
    "c",
    m("Solve 6 - 2x = x + 15."),
    [m("x = -3"), m("x = 3"), m("x = 7"), m("x = -9")],
    0,
    `<p>Subtract x and subtract 6 to get ${m("-3x = 9")}, so ${m("x = -3")}.</p>`
  ),

  q(
    12,
    "Solving inequalities",
    "a",
    m("Solve 3x + 4 &lt; 16."),
    [m("x &lt; 4"), m("x &gt; 4"), m("x &lt; 12"), m("x &gt; 12")],
    0,
    `<p>Subtract 4 to get ${m("3x &lt; 12")}, then divide by positive 3.</p>`
  ),
  q(
    12,
    "Solving inequalities",
    "b",
    m("Solve -2x + 5 &ge; 13."),
    [m("x &le; -4"), m("x &ge; -4"), m("x &le; 4"), m("x &ge; 4")],
    0,
    `<p>Subtract 5 to get ${m("-2x &ge; 8")}. Divide by -2 and flip the inequality symbol.</p>`
  ),
  q(
    12,
    "Solving inequalities",
    "c",
    m("Solve 5x - 7 &le; 18."),
    [m("x &le; 5"), m("x &ge; 5"), m("x &le; 25"), m("x &ge; 25")],
    0,
    `<p>Add 7 to get ${m("5x &le; 25")}, then divide by positive 5.</p>`
  ),

  q(
    13,
    "Slope from two points",
    "a",
    m("Find the slope through (2, 5) and (6, 13)."),
    [m("2"), m(frac("1", "2")), m("8"), m("-2")],
    0,
    `<p>Slope is ${m(frac("change in y", "change in x"))}. Here ${m(frac("13 - 5", "6 - 2"))} = ${m(frac("8", "4"))} = 2.</p>`
  ),
  q(
    13,
    "Slope from two points",
    "b",
    m("Find the slope through (-1, 4) and (3, -8)."),
    [m("-3"), m("3"), m("-4"), m(frac("-1", "3"))],
    0,
    `<p>${m(frac("-8 - 4", "3 - (-1)"))} = ${m(frac("-12", "4"))} = -3.</p>`
  ),
  q(
    13,
    "Slope from two points",
    "c",
    m("Find the slope through (0, -2) and (5, 3)."),
    [m("1"), m("-1"), m("5"), m(frac("1", "5"))],
    0,
    `<p>${m(frac("3 - (-2)", "5 - 0"))} = ${m(frac("5", "5"))} = 1.</p>`
  ),

  q(
    14,
    "Slope-intercept form",
    "a",
    m("Identify the slope and y-intercept of y = 3x - 4."),
    [m("m = 3, b = -4"), m("m = -4, b = 3"), m("m = -3, b = 4"), m("m = 4, b = 3")],
    0,
    `<p>In ${m("y = mx + b")}, m is the slope and b is the y-intercept.</p>`
  ),
  q(
    14,
    "Slope-intercept form",
    "b",
    m("Identify the slope and y-intercept of y = -2x + 7."),
    [m("m = -2, b = 7"), m("m = 7, b = -2"), m("m = 2, b = 7"), m("m = -7, b = 2")],
    0,
    `<p>The number multiplying x is the slope. The constant is the y-intercept.</p>`
  ),
  q(
    14,
    "Slope-intercept form",
    "c",
    m(`Identify the slope and y-intercept of y = ${frac("1", "2")}x - 6.`),
    [m(`m = ${frac("1", "2")}, b = -6`), m(`m = -6, b = ${frac("1", "2")}`), m(`m = 2, b = -6`), m(`m = -${frac("1", "2")}, b = 6`)],
    0,
    `<p>The coefficient of x is ${m(frac("1", "2"))}; the constant is -6.</p>`
  ),

  q(
    15,
    "Writing linear equations",
    "a",
    m("Write the line with slope 2 through (0, 5)."),
    [m("y = 2x + 5"), m("y = 5x + 2"), m("y = 2x - 5"), m("y = -2x + 5")],
    0,
    `<p>The point (0, 5) gives the y-intercept, so ${m("b = 5")}.</p>`
  ),
  q(
    15,
    "Writing linear equations",
    "b",
    m("Write the line with slope -3 through (0, -1)."),
    [m("y = -3x - 1"), m("y = -x - 3"), m("y = 3x - 1"), m("y = -3x + 1")],
    0,
    `<p>Use ${m("y = mx + b")}. The slope is -3 and the y-intercept is -1.</p>`
  ),
  q(
    15,
    "Writing linear equations",
    "c",
    m(`Write the line with slope ${frac("1", "2")} through (0, 4).`),
    [m(`y = ${frac("1", "2")}x + 4`), m(`y = 4x + ${frac("1", "2")}`), m(`y = ${frac("1", "2")}x - 4`), m(`y = 2x + 4`)],
    0,
    `<p>The y-intercept is 4 because the line passes through (0, 4).</p>`
  ),

  q(
    16,
    "Rate of change from a table",
    "a",
    m("Find the rate of change: x values 0, 1, 2, 3 and y values 4, 7, 10, 13."),
    [m("3"), m("4"), m("7"), m("9")],
    0,
    `<p>Each time x increases by 1, y increases by 3.</p>`
  ),
  q(
    16,
    "Rate of change from a table",
    "b",
    m("Find the rate of change: x values 0, 1, 2, 3 and y values 2, 7, 12, 17."),
    [m("5"), m("2"), m("7"), m("10")],
    0,
    `<p>Each y-value increases by 5 for each increase of 1 in x.</p>`
  ),
  q(
    16,
    "Rate of change from a table",
    "c",
    m("Find the rate of change: x values 1, 2, 3, 4 and y values 5, 8, 11, 14."),
    [m("3"), m("1"), m("5"), m("8")],
    0,
    `<p>The change in y is 3 each time x increases by 1.</p>`
  ),

  q(
    17,
    "Function notation",
    "a",
    m("If f(x) = 2x + 3, find f(4)."),
    [m("11"), m("8"), m("7"), m("14")],
    0,
    `<p>Substitute 4 for x: ${m("2(4) + 3 = 11")}.</p>`,
    `${table([m("x"), m("f(x)")], [[m("4"), m("11")]])}`
  ),
  q(
    17,
    "Function notation",
    "b",
    m(`If g(x) = ${x2} - 5, find g(3).`),
    [m("4"), m("9"), m("-2"), m("14")],
    0,
    `<p>Substitute 3 for x: ${m(`${sup("3", "2")} - 5 = 9 - 5 = 4`)}.</p>`
  ),
  q(
    17,
    "Function notation",
    "c",
    m("If h(x) = -3x + 8, find h(-2)."),
    [m("14"), m("2"), m("-14"), m("6")],
    0,
    `<p>Substitute -2 for x: ${m("-3(-2) + 8 = 14")}.</p>`
  ),

  q(
    18,
    "Domain and range",
    "a",
    m("What is the domain of {(1, 2), (3, 2), (5, 7)}?"),
    [m("{1, 3, 5}"), m("{2, 7}"), m("{1, 2, 3, 5, 7}"), m("{2, 2, 7}")],
    0,
    `<p>The domain is the set of x-values.</p>`
  ),
  q(
    18,
    "Domain and range",
    "b",
    m("What is the range of {(-2, 4), (0, 1), (6, 4)}?"),
    [m("{1, 4}"), m("{-2, 0, 6}"), m("{4, 1, 4}"), m("{-2, 0, 1, 4, 6}")],
    0,
    `<p>The range is the set of y-values. Repeated values only need to be listed once.</p>`
  ),
  q(
    18,
    "Domain and range",
    "c",
    m("What is the domain of {(-1, 5), (0, 3), (2, 9)}?"),
    [m("{-1, 0, 2}"), m("{3, 5, 9}"), m("{-1, 2, 3}"), m("{0, 3, 5}")],
    0,
    `<p>Take the first coordinate from each ordered pair.</p>`
  ),

  q(
    19,
    "Systems of equations",
    "a",
    m("Solve the system y = x + 1 and y = 2x - 3."),
    [m("(4, 5)"), m("(5, 4)"), m("(-4, -3)"), m("(2, 3)")],
    0,
    `<p>Set the equations equal: ${m("x + 1 = 2x - 3")}. This gives ${m("x = 4")}, then ${m("y = 5")}.</p>`
  ),
  q(
    19,
    "Systems of equations",
    "b",
    m("Solve the system 2x + y = 7 and x - y = 2."),
    [m("(3, 1)"), m("(1, 3)"), m("(2, 3)"), m("(4, -1)")],
    0,
    `<p>Add the equations to eliminate y: ${m("3x = 9")}, so ${m("x = 3")} and ${m("y = 1")}.</p>`
  ),
  q(
    19,
    "Systems of equations",
    "c",
    m("A graph shows two lines intersecting at (-2, 3). What is the solution?"),
    [m("(-2, 3)"), m("(3, -2)"), m("(-3, 2)"), m("(2, -3)")],
    0,
    `<p>The solution to a graphed system is the intersection point.</p>`
  ),

  q(
    20,
    "Graphing linear inequalities",
    "a",
    m("Which graph matches y &gt; 2x - 1?"),
    [m("Dashed line, shade above"), m("Solid line, shade above"), m("Dashed line, shade below"), m("Solid line, shade below")],
    0,
    `<p>The symbol ${m("&gt;")} uses a dashed boundary line, and greater-than shades above the line.</p>`
  ),
  q(
    20,
    "Graphing linear inequalities",
    "b",
    m("Which graph matches y &le; -x + 4?"),
    [m("Solid line, shade below"), m("Dashed line, shade below"), m("Solid line, shade above"), m("Dashed line, shade above")],
    0,
    `<p>The symbol ${m("&le;")} uses a solid line. Less-than shades below.</p>`
  ),
  q(
    20,
    "Graphing linear inequalities",
    "c",
    m(`Which graph matches y &lt; ${frac("1", "2")}x + 3?`),
    [m("Dashed line, shade below"), m("Solid line, shade below"), m("Dashed line, shade above"), m("Solid line, shade above")],
    0,
    `<p>The symbol ${m("&lt;")} is dashed, and less-than shades below.</p>`
  ),

  q(
    21,
    "Quadratic vertex / minimum / maximum",
    "a",
    m(`What is the vertex of y = (x - 2)<sup>2</sup> + 5?`),
    [m("(2, 5)"), m("(-2, 5)"), m("(2, -5)"), m("(-2, -5)")],
    0,
    `<p>Vertex form is ${m("y = a(x - h)<sup>2</sup> + k")}. The vertex is ${m("(h, k)")}.</p>`
  ),
  q(
    21,
    "Quadratic vertex / minimum / maximum",
    "b",
    m(`What is the minimum value of y = ${x2} - 4x + 1?`),
    [m("-3"), m("2"), m("1"), m("5")],
    0,
    `<p>The axis of symmetry is ${m("x = 2")}. Substitute: ${m("2<sup>2</sup> - 4(2) + 1 = -3")}.</p>`
  ),
  q(
    21,
    "Quadratic vertex / minimum / maximum",
    "c",
    m(`What is the axis of symmetry of y = -(x + 3)<sup>2</sup> + 8?`),
    [m("x = -3"), m("x = 3"), m("y = 8"), m("x = 8")],
    0,
    `<p>The vertex is ${m("(-3, 8)")}, so the axis of symmetry is ${m("x = -3")}.</p>`
  ),

  q(
    22,
    "Interpreting quadratic graphs: zeros from graph",
    "a",
    m("A graph crosses the x-axis at (-4, 0) and (1, 0). What are the zeros?"),
    [m("-4 and 1"), m("4 and -1"), m("-4 and 0"), m("0 and 1")],
    0,
    `<p>Zeros are x-values where y = 0, so use the x-coordinates of the x-intercepts.</p>`
  ),
  q(
    22,
    "Interpreting quadratic graphs: zeros from graph",
    "b",
    m("A graph crosses the x-axis at (0, 0) and (5, 0). What are the zeros?"),
    [m("0 and 5"), m("0 only"), m("5 only"), m("-5 and 0")],
    0,
    `<p>The zeros are the x-values of the x-intercepts: 0 and 5.</p>`
  ),
  q(
    22,
    "Interpreting quadratic graphs: zeros from graph",
    "c",
    m("A graph touches the x-axis at (3, 0). What is the zero?"),
    [m("3"), m("-3"), m("0"), m("touches means no zero")],
    0,
    `<p>If the graph touches the x-axis at ${m("(3, 0)")}, then ${m("x = 3")} is a zero.</p>`
  ),

  q(
    23,
    "Exponential growth and decay",
    "a",
    m("Identify y = 100(1.05)<sup>x</sup>."),
    [m("Growth, initial value 100"), m("Decay, initial value 100"), m("Growth, initial value 1.05"), m("Decay, initial value 1.05")],
    0,
    `<p>The base 1.05 is greater than 1, so this is growth. The coefficient 100 is the initial value.</p>`
  ),
  q(
    23,
    "Exponential growth and decay",
    "b",
    m("Identify y = 80(0.75)<sup>x</sup>."),
    [m("Decay, initial value 80"), m("Growth, initial value 80"), m("Decay, initial value 0.75"), m("Growth, initial value 0.75")],
    0,
    `<p>The base 0.75 is between 0 and 1, so this is decay.</p>`
  ),
  q(
    23,
    "Exponential growth and decay",
    "c",
    m("What is the initial value of y = 250(1.12)<sup>x</sup>?"),
    [m("250"), m("1.12"), m("12"), m("112")],
    0,
    `<p>In ${m("y = a(b)<sup>x</sup>")}, the initial value is a.</p>`
  ),

  q(
    24,
    "Sequences",
    "a",
    m("Determine the type of sequence: 3, 7, 11, 15, ..."),
    [m("Arithmetic"), m("Geometric"), m("Quadratic"), m("Exponential")],
    0,
    `<p>The sequence adds 4 each time, so it is arithmetic.</p>`
  ),
  q(
    24,
    "Sequences",
    "b",
    m("What is the common ratio of 2, 6, 18, 54, ...?"),
    [m("3"), m("4"), m("6"), m("2")],
    0,
    `<p>Each term is multiplied by 3.</p>`
  ),
  q(
    24,
    "Sequences",
    "c",
    m("What is the common difference of 25, 18, 11, 4, ...?"),
    [m("-7"), m("7"), m("-4"), m("6")],
    0,
    `<p>Each term decreases by 7.</p>`
  ),

  q(
    25,
    "Statistics / scatter plots: correlation coefficient",
    "a",
    m("A scatterplot rises strongly from left to right. Which correlation is best?"),
    [m("r = 0.9"), m("r = -0.9"), m("r = 0"), m("r = -0.2")],
    0,
    `<p>Strong positive association has a correlation close to 1.</p>`
  ),
  q(
    25,
    "Statistics / scatter plots: correlation coefficient",
    "b",
    m("A scatterplot falls moderately from left to right. Which correlation is best?"),
    [m("r = -0.7"), m("r = 0.7"), m("r = 0"), m("r = 1")],
    0,
    `<p>Falling left to right means negative correlation. Moderate strength is near -0.7.</p>`
  ),
  q(
    25,
    "Statistics / scatter plots: correlation coefficient",
    "c",
    m("A scatterplot has almost no pattern. Which correlation is best?"),
    [m("r = 0"), m("r = 0.95"), m("r = -0.95"), m("r = 1")],
    0,
    `<p>No clear linear pattern has a correlation closest to 0.</p>`
  ),

  q(
    26,
    "Calculate line of best fit from table",
    "a",
    m("Which equation fits the table (0, 2), (1, 5), (2, 8), (3, 11)?"),
    [m("y = 3x + 2"), m("y = 2x + 3"), m("y = 3x - 2"), m("y = x + 2")],
    0,
    `<p>The y-values increase by 3, and when x is 0, y is 2.</p>`
  ),
  q(
    26,
    "Calculate line of best fit from table",
    "b",
    m("Which equation fits the table (1, 4), (2, 6), (3, 8), (4, 10)?"),
    [m("y = 2x + 2"), m("y = 2x + 4"), m("y = x + 2"), m("y = 4x - 2")],
    0,
    `<p>The rate of change is 2. Using (1, 4), ${m("4 = 2(1) + b")}, so ${m("b = 2")}.</p>`
  ),
  q(
    26,
    "Calculate line of best fit from table",
    "c",
    m("Which equation fits the table (-1, 7), (0, 5), (1, 3), (2, 1)?"),
    [m("y = -2x + 5"), m("y = 2x + 5"), m("y = -2x - 5"), m("y = -x + 5")],
    0,
    `<p>The y-values decrease by 2, and the y-intercept is 5.</p>`
  ),

  q(
    27,
    "Choose correct box-and-whisker plot",
    "a",
    m("Data: 2, 4, 5, 7, 8, 10, 12. Which five-number summary is correct?"),
    [m("min 2, Q1 4, median 7, Q3 10, max 12"), m("min 2, Q1 5, median 7, Q3 8, max 12"), m("min 4, Q1 5, median 7, Q3 10, max 12"), m("min 2, Q1 4, median 8, Q3 10, max 12")],
    0,
    `<p>The median is 7. The lower-half median is 4, and the upper-half median is 10.</p>`
  ),
  q(
    27,
    "Choose correct box-and-whisker plot",
    "b",
    m("Data: 4, 5, 6, 7, 8, 9, 10. Which five-number summary is correct?"),
    [m("min 4, Q1 5, median 7, Q3 9, max 10"), m("min 4, Q1 6, median 7, Q3 8, max 10"), m("min 5, Q1 6, median 7, Q3 9, max 10"), m("min 4, Q1 5, median 8, Q3 9, max 10")],
    0,
    `<p>The middle number is 7. Q1 is the median of 4, 5, 6 and Q3 is the median of 8, 9, 10.</p>`
  ),
  q(
    27,
    "Choose correct box-and-whisker plot",
    "c",
    m("Data: 1, 3, 6, 8, 10, 12, 15. Which five-number summary is correct?"),
    [m("min 1, Q1 3, median 8, Q3 12, max 15"), m("min 1, Q1 6, median 8, Q3 10, max 15"), m("min 3, Q1 6, median 8, Q3 12, max 15"), m("min 1, Q1 3, median 10, Q3 12, max 15")],
    0,
    `<p>Use the minimum, lower-half median, overall median, upper-half median, and maximum.</p>`
  ),

  q(
    28,
    "Solve quadratic using quadratic formula",
    "a",
    m(`Solve ${x2} + 4x - 1 = 0.`),
    [m(`x = -2 &plusmn; ${sqrt("5")}`), m(`x = 2 &plusmn; ${sqrt("5")}`), m(`x = -4 &plusmn; ${sqrt("5")}`), m(`x = -2 &plusmn; ${sqrt("3")}`)],
    0,
    `<p>Using the quadratic formula gives ${m(`${frac("-4 &plusmn; " + sqrt("20"), "2")}`)}, which simplifies to ${m(`-2 &plusmn; ${sqrt("5")}`)}.</p>`
  ),
  q(
    28,
    "Solve quadratic using quadratic formula",
    "b",
    m(`Solve 2${x2} - 3x - 4 = 0.`),
    [m(`x = ${frac(`3 &plusmn; ${sqrt("41")}`, "4")}`), m(`x = ${frac(`-3 &plusmn; ${sqrt("41")}`, "4")}`), m(`x = ${frac(`3 &plusmn; ${sqrt("23")}`, "4")}`), m(`x = ${frac(`3 &plusmn; ${sqrt("41")}`, "2")}`)],
    0,
    `<p>With ${m("a = 2")}, ${m("b = -3")}, and ${m("c = -4")}, the discriminant is ${m("41")}.</p>`
  ),
  q(
    28,
    "Solve quadratic using quadratic formula",
    "c",
    m(`Solve ${x2} - 6x + 2 = 0.`),
    [m(`x = 3 &plusmn; ${sqrt("7")}`), m(`x = -3 &plusmn; ${sqrt("7")}`), m(`x = 6 &plusmn; ${sqrt("7")}`), m(`x = 3 &plusmn; ${sqrt("5")}`)],
    0,
    `<p>The quadratic formula gives ${m(`${frac(`6 &plusmn; ${sqrt("28")}`, "2")}`)}, which simplifies to ${m(`3 &plusmn; ${sqrt("7")}`)}.</p>`
  ),

  q(
    29,
    "Solve quadratic by completing the square",
    "a",
    m(`Solve ${x2} + 6x + 5 = 0.`),
    [m("x = -1 and -5"), m("x = 1 and 5"), m("x = -6 and -5"), m("x = 6 and 5")],
    0,
    `<p>This factors to ${m("(x + 1)(x + 5) = 0")}, so the roots are -1 and -5.</p>`
  ),
  q(
    29,
    "Solve quadratic by completing the square",
    "b",
    m(`Solve ${x2} - 8x + 7 = 0.`),
    [m("x = 1 and 7"), m("x = -1 and -7"), m("x = 8 and 7"), m("x = -8 and -7")],
    0,
    `<p>${m(`${x2} - 8x + 7`)} factors to ${m("(x - 1)(x - 7)")}, so the roots are 1 and 7.</p>`
  ),
  q(
    29,
    "Solve quadratic by completing the square",
    "c",
    m(`Solve ${x2} + 4x - 10 = 0.`),
    [m(`x = -2 &plusmn; ${sqrt("14")}`), m(`x = 2 &plusmn; ${sqrt("14")}`), m(`x = -4 &plusmn; ${sqrt("10")}`), m(`x = -2 &plusmn; ${sqrt("10")}`)],
    0,
    `<p>Move the constant, complete the square, and solve: ${m(`(x + 2)<sup>2</sup> = 14`)}, so ${m(`x = -2 &plusmn; ${sqrt("14")}`)}.</p>`
  ),

  q(
    30,
    "Determine final units from conversion",
    "a",
    m(`What are the final units of 6700 ${frac("ft", "min")} &times; ${frac("1 min", "60 sec")} &times; ${frac("1 mi", "5280 ft")}?`),
    [m(frac("mi", "sec")), m(frac("ft", "sec")), m(frac("mi", "min")), m(frac("sec", "mi"))],
    0,
    `<p>Feet cancel and minutes cancel, leaving miles per second.</p>`
  ),
  q(
    30,
    "Determine final units from conversion",
    "b",
    m(`What are the final units of 45 ${frac("mi", "hr")} &times; ${frac("5280 ft", "1 mi")} &times; ${frac("1 hr", "60 min")}?`),
    [m(frac("ft", "min")), m(frac("mi", "min")), m(frac("ft", "hr")), m(frac("min", "ft"))],
    0,
    `<p>Miles cancel and hours cancel, leaving feet per minute.</p>`
  ),
  q(
    30,
    "Determine final units from conversion",
    "c",
    m(`What are the final units of 12 ${frac("gal", "min")} &times; ${frac("1 min", "60 sec")} &times; ${frac("3.785 L", "1 gal")}?`),
    [m(frac("L", "sec")), m(frac("gal", "sec")), m(frac("L", "min")), m(frac("sec", "L"))],
    0,
    `<p>Gallons cancel and minutes cancel, leaving liters per second.</p>`
  ),

  q(
    31,
    "Match graph of system of inequalities to system",
    "a",
    m("Solid line y = x + 2, shade below; dashed line y = -2x + 6, shade above. Which system matches?"),
    [m("y &le; x + 2, y &gt; -2x + 6"), m("y &lt; x + 2, y &ge; -2x + 6"), m("y &ge; x + 2, y &lt; -2x + 6"), m("y &gt; x + 2, y &le; -2x + 6")],
    0,
    `<p>Solid means inclusive, dashed means not inclusive. Below is less-than; above is greater-than.</p>`
  ),
  q(
    31,
    "Match graph of system of inequalities to system",
    "b",
    m("Solid vertical line x = -1, shade right; dashed horizontal line y = 4, shade below. Which system matches?"),
    [m("x &ge; -1, y &lt; 4"), m("x &gt; -1, y &le; 4"), m("x &le; -1, y &lt; 4"), m("x &ge; -1, y &gt; 4")],
    0,
    `<p>Right of a vertical line is greater-than. Solid gives inclusive ${m("&ge;")}; dashed gives strict ${m("&lt;")}.</p>`
  ),
  q(
    31,
    "Match graph of system of inequalities to system",
    "c",
    m(`Dashed line y = ${frac("1", "2")}x - 3, shade above; solid line y = -x + 2, shade below. Which system matches?`),
    [m(`y &gt; ${frac("1", "2")}x - 3, y &le; -x + 2`), m(`y &ge; ${frac("1", "2")}x - 3, y &lt; -x + 2`), m(`y &lt; ${frac("1", "2")}x - 3, y &ge; -x + 2`), m(`y &le; ${frac("1", "2")}x - 3, y &gt; -x + 2`)],
    0,
    `<p>Dashed and above gives ${m("&gt;")}. Solid and below gives ${m("&le;")}.</p>`
  ),

  q(
    32,
    "Rationalize square root denominator",
    "a",
    m(`Rationalize ${frac(sqrt("3"), sqrt("7"))}.`),
    [m(frac(sqrt("21"), "7")), m(frac(sqrt("10"), "7")), m(frac(sqrt("21"), sqrt("7"))), m(frac("3", "7"))],
    0,
    `<p>Multiply top and bottom by ${m(sqrt("7"))}. The denominator becomes 7.</p>`
  ),
  q(
    32,
    "Rationalize square root denominator",
    "b",
    m(`Rationalize ${frac("5", sqrt("2"))}.`),
    [m(frac(`5${sqrt("2")}`, "2")), m(frac(sqrt("10"), "2")), m(`5${sqrt("2")}`), m(frac("5", "2"))],
    0,
    `<p>Multiply top and bottom by ${m(sqrt("2"))}. The denominator becomes 2.</p>`
  ),
  q(
    32,
    "Rationalize square root denominator",
    "c",
    m(`Rationalize ${frac(sqrt("5"), sqrt("3"))}.`),
    [m(frac(sqrt("15"), "3")), m(frac(sqrt("8"), "3")), m(frac(sqrt("15"), sqrt("3"))), m(frac("5", "3"))],
    0,
    `<p>Multiply top and bottom by ${m(sqrt("3"))}. The denominator becomes 3.</p>`
  ),

  q(
    33,
    "Identify rational or irrational",
    "a",
    m(`Is ${sqrt("49")} rational or irrational?`),
    [m("Rational"), m("Irrational"), m("Neither"), m("Both")],
    0,
    `<p>${m(`${sqrt("49")} = 7`)}, and 7 is rational.</p>`
  ),
  q(
    33,
    "Identify rational or irrational",
    "b",
    m("Is 0.333... rational or irrational?"),
    [m("Rational"), m("Irrational"), m("Neither"), m("Both")],
    0,
    `<p>A repeating decimal is rational because it can be written as a fraction.</p>`
  ),
  q(
    33,
    "Identify rational or irrational",
    "c",
    m(`Is ${sqrt("18")} rational or irrational?`),
    [m("Irrational"), m("Rational"), m("Neither"), m("Both")],
    0,
    `<p>${m(sqrt("18"))} simplifies to ${m(`3${sqrt("2")}`)}, which is irrational.</p>`
  ),

  q(
    34,
    "Choose correct system of equations from word problem",
    "a",
    m("10 pizza slices: cheese costs $1.50, pepperoni costs $2.00, total is $18. Let x = cheese and y = pepperoni."),
    [m("x + y = 10, 1.5x + 2y = 18"), m("x + y = 18, 1.5x + 2y = 10"), m("1.5x + y = 10, 2x + y = 18"), m("x + y = 10, 2x + 1.5y = 18")],
    0,
    `<p>The item count equation is ${m("x + y = 10")}. The money equation uses each price times its quantity.</p>`
  ),
  q(
    34,
    "Choose correct system of equations from word problem",
    "b",
    m("20 tickets: adults cost $12, children cost $8, total is $200. Let a = adults and c = children."),
    [m("a + c = 20, 12a + 8c = 200"), m("a + c = 200, 12a + 8c = 20"), m("12a + c = 20, 8a + c = 200"), m("a + c = 20, 8a + 12c = 200")],
    0,
    `<p>The count equation is ${m("a + c = 20")}. The cost equation is ${m("12a + 8c = 200")}.</p>`
  ),
  q(
    34,
    "Choose correct system of equations from word problem",
    "c",
    m("12 items: pens cost $2, notebooks cost $5, total is $39. Let p = pens and n = notebooks."),
    [m("p + n = 12, 2p + 5n = 39"), m("p + n = 39, 2p + 5n = 12"), m("2p + n = 12, 5p + n = 39"), m("p + n = 12, 5p + 2n = 39")],
    0,
    `<p>The number of items is 12, and the total cost is $39.</p>`
  ),
];

export const QUESTION_TOPICS = [...new Set(QUESTION_BANK.map((question) => question.topicId))];

export const getQuestionById = (id) => QUESTION_BANK.find((question) => question.id === id);
