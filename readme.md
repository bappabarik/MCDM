Let’s apply the TOPSIS algorithm using the corrected normalization values. Here's the setup:

---

### Example Problem
We are ranking three laptops based on the following criteria:
1. **Price** (in ₹) – Lower is better (Cost Criterion)
2. **Battery Life** (in hours) – Higher is better (Benefit Criterion)

#### Input Data
| Laptop   | Price (₹) | Battery Life (hours) |
|----------|-----------|-----------------------|
| Laptop A | 50,000    | 8                    |
| Laptop B | 60,000    | 10                   |
| Laptop C | 55,000    | 9                    |

#### Weights
- Price: 60% (0.6)
- Battery Life: 40% (0.4)

#### Criteria Type
- Price: Cost
- Battery Life: Benefit

---

### **Step-by-Step Solution**

#### Step 1: Normalize the Data
We already calculated the normalized price values:  
\[
\text{Normalized Price (₹)} = \frac{\text{Price (₹)}}{\sqrt{\sum \text{Price}^2}}
\]  

\[
\sqrt{(50000)^2 + (60000)^2 + (55000)^2} = 95,524.87
\]

Normalized Prices:
| Laptop   | Price (₹) | Normalized Price |
|----------|-----------|------------------|
| Laptop A | 50,000    | 0.523            |
| Laptop B | 60,000    | 0.628            |
| Laptop C | 55,000    | 0.576            |

Normalize Battery Life:
\[
\sqrt{(8)^2 + (10)^2 + (9)^2} = \sqrt{64 + 100 + 81} = \sqrt{245} = 15.652
\]

Normalized Battery Life:
| Laptop   | Battery Life (hours) | Normalized Battery Life |
|----------|-----------------------|--------------------------|
| Laptop A | 8                    | \( \frac{8}{15.652} = 0.511 \) |
| Laptop B | 10                   | \( \frac{10}{15.652} = 0.639 \) |
| Laptop C | 9                    | \( \frac{9}{15.652} = 0.575 \) |

---

#### Step 2: Weighted Normalized Matrix
Multiply normalized values by their respective weights.

| Laptop   | Weighted Price (0.6) | Weighted Battery Life (0.4) |
|----------|-----------------------|-----------------------------|
| Laptop A | \( 0.523 \times 0.6 = 0.314 \) | \( 0.511 \times 0.4 = 0.204 \) |
| Laptop B | \( 0.628 \times 0.6 = 0.377 \) | \( 0.639 \times 0.4 = 0.256 \) |
| Laptop C | \( 0.576 \times 0.6 = 0.346 \) | \( 0.575 \times 0.4 = 0.230 \) |

---

#### Step 3: Determine Ideal Solutions
- **Ideal Positive (Best)**:
  - Price (Cost): Minimum \( \min(0.314, 0.377, 0.346) = 0.314 \)
  - Battery Life (Benefit): Maximum \( \max(0.204, 0.256, 0.230) = 0.256 \)

- **Ideal Negative (Worst)**:
  - Price (Cost): Maximum \( \max(0.314, 0.377, 0.346) = 0.377 \)
  - Battery Life (Benefit): Minimum \( \min(0.204, 0.256, 0.230) = 0.204 \)

---

#### Step 4: Calculate Distance from Ideals
Use the Euclidean distance formula:
\[
D^+ = \sqrt{\sum (\text{Weighted Value} - \text{Ideal Positive})^2}
\]
\[
D^- = \sqrt{\sum (\text{Weighted Value} - \text{Ideal Negative})^2}
\]

**Laptop A:**
- \( D^+ = \sqrt{(0.314 - 0.314)^2 + (0.204 - 0.256)^2} = \sqrt{0 + 0.0027} = 0.052 \)
- \( D^- = \sqrt{(0.314 - 0.377)^2 + (0.204 - 0.204)^2} = \sqrt{0.0039 + 0} = 0.063 \)

**Laptop B:**
- \( D^+ = \sqrt{(0.377 - 0.314)^2 + (0.256 - 0.256)^2} = \sqrt{0.0039 + 0} = 0.063 \)
- \( D^- = \sqrt{(0.377 - 0.377)^2 + (0.256 - 0.204)^2} = \sqrt{0 + 0.0027} = 0.052 \)

**Laptop C:**
- \( D^+ = \sqrt{(0.346 - 0.314)^2 + (0.230 - 0.256)^2} = \sqrt{0.001 + 0.0007} = 0.039 \)
- \( D^- = \sqrt{(0.346 - 0.377)^2 + (0.230 - 0.204)^2} = \sqrt{0.001 + 0.0007} = 0.039 \)

---

#### Step 5: Calculate the Relative Closeness (Score)
\[
\text{Score} = \frac{D^-}{D^+ + D^-}
\]

**Laptop A:**  
\[
\text{Score} = \frac{0.063}{0.052 + 0.063} = 0.547
\]

**Laptop B:**  
\[
\text{Score} = \frac{0.052}{0.063 + 0.052} = 0.453
\]

**Laptop C:**  
\[
\text{Score} = \frac{0.039}{0.039 + 0.039} = 0.500
\]

---

### **Final Rankings**
| Laptop   | Score   | Rank |
|----------|---------|------|
| Laptop A | 0.547   | 1    |
| Laptop C | 0.500   | 2    |
| Laptop B | 0.453   | 3    |

**Conclusion:** Laptop A is the best option based on the given criteria and weights!