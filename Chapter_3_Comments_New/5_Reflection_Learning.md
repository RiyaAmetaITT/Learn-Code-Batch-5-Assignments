# Reflection on Learning: Good vs. Bad Comments

### 1. **Most Comments Are Unnecessary**
The analysis revealed that **100% of comments in the original code were bad comments**. This was a powerful lesson: well-written code should be self-documenting. If you need a comment to explain what the code does, the code itself might need improvement (better naming, clearer structure).

**Takeaway**: Write better code first, then add comments only when necessary.

---

### 2. **Redundant Comments Are the Most Common Problem**
Approximately **15+ comments** were classified as "redundant" - they simply repeated what the code already stated. Examples like `// Process payment` above `ProcessPayment()` add noise without value.

**Takeaway**: If a comment says exactly what the code does, delete it. The code is the source of truth.

---

### 3. **Good Comments Explain "Why," Not "What"**
The refactored code demonstrates that good comments answer questions like:
- **Why** was this design decision made?
- **Why** is this order of operations critical?
- **What** would happen if this code were removed or changed?

**Example**: Instead of `// Reserve inventory` (redundant), we wrote:
```csharp
// Reserve inventory before payment to prevent race conditions where
// another order might claim the same items between availability check and payment
```

**Takeaway**: Comments should provide context and reasoning that the code cannot express.

---

### 4. **Comments Should Warn of Consequences**
Good comments prevent future bugs by warning developers about:
- Critical operations that might look "unnecessary"
- Business rules that must be followed
- Potential pitfalls if code is modified

**Example**: The comment explaining why `SaveOrder()` is critical prevents someone from removing it during cleanup, which would cause data inconsistency.

**Takeaway**: Use comments to protect against future mistakes and "optimizations" that break the system.

---

### 5. **Attributions Belong in Version Control**
Comments like `// Added by John on 12/15/2023` are unnecessary because Git already tracks:
- Who made the change
- When it was made
- What was changed (via commit messages)

**Takeaway**: Don't clutter code with information that version control already provides.

---

### 6. **Vague Comments Are Worse Than No Comments**
Comments like `// Something went wrong` or `// This is important!!!` add confusion rather than clarity. They don't explain:
- What went wrong?
- Why is it important?
- What are the consequences?

**Takeaway**: If you can't write a clear, specific comment, don't write one at all. Vague comments mislead more than they help.

---

### 7. **TODOs Must Be Specific and Actionable**
Bad TODO: `// TODO: Fix this later`  
Good TODO: `// TODO: Add comprehensive validation including customer verification, item availability pre-check, and payment method validation`

**Takeaway**: TODOs should be specific enough that another developer (or future you) can act on them without additional context.

---

### 8. **Code Quality Reduces Need for Comments**
The refactoring process showed that:
- Better method names eliminate the need for many comments
- Clear code structure makes logic obvious
- Self-documenting code is more maintainable than heavily commented code

**Takeaway**: Invest in writing clear code first. Comments should be the exception, not the rule.

---
