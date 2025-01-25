export const performTOPSIS = (alternatives, weights, criteriaType) => {

  // STEPS to implement this algorithm:
    // 1. Normalize each criteria to match the same scale
    // 2. Convert the values with weighted normalized value
    // 3. Determine the ideal positive and ideal negative solutions
    // 4.Calculate distance from the ideal solutions
    // 5. Calculate the Relative Closeness Score
    // 6. Sort the score 



  const normalized = []; // Array to store the normalized values for each criterion
  const scores = []; // Array to store the final scores for each alternative

  // Step 1: Normalize the data for each criterion
  for (let i = 0; i < weights.length; i++) {
    const columnValues = alternatives.map((alt) => alt.values[i]); // Extract the column (criterion) values
    const normFactor = Math.sqrt(
      columnValues.reduce((sum, val) => sum + val ** 2, 0) // Calculate the normalization factor (square root of sum of squares)
    );
    normalized.push(
      columnValues.map((val) => val / normFactor * weights[i]) // Normalize each value in the column
    );
  }

  // Step 2: Determine the ideal positive and ideal negative solutions
  const idealPositive = normalized.map((col, i) =>
    criteriaType[i] === "benefit"
      ? Math.max(...col) // For benefit criteria, the ideal positive is the maximum value
      : Math.min(...col) // For cost criteria, the ideal positive is the minimum value
  );


  const idealNegative = normalized.map((col, i) =>
    criteriaType[i] === "benefit"
      ? Math.min(...col) // For benefit criteria, the ideal negative is the minimum value
      : Math.max(...col) // For cost criteria, the ideal negative is the maximum value
  );

  // Step 3: Calculate the distances from the ideal positive and negative solutions
  alternatives.forEach((alt, idx) => {
    let posDistance = 0; // Distance to the ideal positive solution
    let negDistance = 0; // Distance to the ideal negative solution

    for (let i = 0; i < weights.length; i++) {
      posDistance += Math.sqrt((normalized[i][idx] - idealPositive[i]) ** 2); // Sum of squared differences from the ideal positive
      negDistance += Math.sqrt((normalized[i][idx] - idealNegative[i]) ** 2); // Sum of squared differences from the ideal negative
    }

    // Step 4: Calculate the relative closeness to the ideal solution
    scores.push({
      name: alt.name, // Store the name of the alternative
      score:
       negDistance /
        (negDistance + posDistance), // Calculate the TOPSIS score
    });
  });

  // Step 5: Return the alternatives sorted by their scores (highest to lowest)
  return scores.sort((a, b) => b.score - a.score);
};
