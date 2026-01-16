# Good Comments Kept in Refactored Code

## Good Comments Added

### 1. **Explanation of Intent**
```csharp
// Reserve inventory before payment to prevent race conditions where
// another order might claim the same items between availability check and payment
await _inventoryService.ReserveItems(order.Items);
```

**Type**: **Explanation of Intent**  
**Why it's good**:
- Explains **WHY** inventory is reserved before payment (not just what)
- Documents a non-obvious design decision (preventing race conditions)
- Helps future developers understand the business logic and timing requirements
- Prevents someone from "optimizing" by moving this after payment

---

### 2. **Warning of Consequences**
```csharp
// Payment failed, release reserved inventory so items are available for other orders
await _inventoryService.ReleaseReservation(order.Items);
```

**Type**: **Warning of Consequences** / **Explanation of Intent**  
**Why it's good**:
- Explains the consequence of NOT releasing inventory (items would be locked)
- Clarifies the business impact (items need to be available for other orders)
- Documents why this step is necessary in the failure path

---

### 3. **Warning of Consequences**
```csharp
// Release inventory reservation on any exception to prevent items from being
// permanently locked if payment processing or other operations fail
await _inventoryService.ReleaseReservation(order.Items);
```

**Type**: **Warning of Consequences** / **Amplification**  
**Why it's good**:
- Warns about a critical consequence (permanent lock of inventory)
- Explains why this cleanup is essential in the exception handler
- Highlights the importance of this line, which might look like "just cleanup"
- Prevents someone from removing this "unnecessary" code during refactoring

---

### 4. **Explanation of Intent**
```csharp
// Refund payment for paid orders per company policy: customers must receive
// full refunds when orders are cancelled, regardless of cancellation reason
if (order.Status == OrderStatus.Paid)
```

**Type**: **Explanation of Intent**  
**Why it's good**:
- Explains **WHY** refunds are required (company policy)
- Documents the business rule that drives this code
- Replaces the vague "John says we need to refund here" with actual business logic
- Helps future developers understand the requirement, not just the implementation

---

### 5. **Warning of Consequences** / **Amplification** 
```csharp
// Must persist status change to database; failure to save could result in
// inconsistent state where order appears active but is actually cancelled
await SaveOrder(order);
```

**Type**: **Warning of Consequences** / **Amplification**  
**Why it's good**:
- Warns about a critical consequence (data inconsistency)
- Explains why this seemingly simple save operation is critical
- Replaces the meaningless "This is important!!!" with actual reasoning
- Highlights that this line prevents a serious bug (inconsistent state)

---

### 6. **Improved TODO Comment**
```csharp
// TODO: Add comprehensive validation including customer verification,
// item availability pre-check, and payment method validation
private bool IsValidOrder(Order order)
```

**Type**: **TODO Comment** (Good version)  
**Why it's good**:
- Specific about what needs to be done
- Lists concrete requirements (customer verification, item availability, payment method)
- Actionable and clear
- Replaces the vague "TODO: Fix this later"

