export const performTOPSIS = (alternatives, weights, criteriaType) => {
    const normalized = [];
    const scores = [];
  
    for (let i = 0; i < weights.length; i++) {
      const columnValues = alternatives.map((alt) => alt.values[i]);
      const normFactor = Math.sqrt(columnValues.reduce((sum, val) => sum + val ** 2, 0));
      normalized.push(columnValues.map((val) => val / normFactor));
    }
  
    const idealPositive = normalized.map((col, i) =>
      criteriaType[i] === "benefit" ? Math.max(...col) : Math.min(...col)
    );
    const idealNegative = normalized.map((col, i) =>
      criteriaType[i] === "benefit" ? Math.min(...col) : Math.max(...col)
    );
  
    alternatives.forEach((alt, idx) => {
      let posDistance = 0;
      let negDistance = 0;
  
      for (let i = 0; i < weights.length; i++) {
        posDistance += ((normalized[i][idx] - idealPositive[i]) ** 2);
        negDistance += ((normalized[i][idx] - idealNegative[i]) ** 2);
      }
  
      scores.push({
        name: alt.name,
        score: Math.sqrt(negDistance) / (Math.sqrt(negDistance) + Math.sqrt(posDistance)),
      });
    });
  
    return scores.sort((a, b) => b.score - a.score);
  };
  