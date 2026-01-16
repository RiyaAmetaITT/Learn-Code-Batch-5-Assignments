public class OrderProcessor
{
    private readonly IPaymentGateway _paymentGateway;
    private readonly IInventoryService _inventoryService;
    private readonly INotificationService _notificationService;

    public OrderProcessor(
        IPaymentGateway paymentGateway,
        IInventoryService inventoryService,
        INotificationService notificationService)
    {
        _paymentGateway = paymentGateway;
        _inventoryService = inventoryService;
        _notificationService = notificationService;
    }

    public async Task<OrderResult> ProcessOrder(Order order)
    {
        if (order == null)
        {
            throw new ArgumentNullException(nameof(order));
        }

        if (!IsOrderValid(order))
        {
            return OrderResult.Invalid("Order validation failed");
        }

        bool isInventoryAvailable = await _inventoryService.CheckAvailability(order.Items);
        if (!isInventoryAvailable)
        {
            return OrderResult.Failed("Insufficient inventory");
        }

        // Reserve inventory before payment to prevent race conditions where
        // another order might claim the same items between availability check and payment
        await _inventoryService.ReserveItems(order.Items);

        try
        {
            var paymentTransaction = await _paymentGateway.ProcessPayment(
                order.CustomerId,
                order.TotalAmount,
                order.PaymentMethod);

            if (paymentTransaction.IsSuccessful)
            {
                await _inventoryService.CommitReservation(order.Items);
                await _notificationService.SendOrderConfirmation(order);
                return OrderResult.Success(paymentTransaction.TransactionId);
            }
            else
            {
                // Payment failed, release reserved inventory so items are available for other orders
                await _inventoryService.ReleaseReservation(order.Items);
                return OrderResult.Failed($"Payment failed: {paymentTransaction.ErrorMessage}");
            }
        }
        catch (Exception exception)
        {
            // Release inventory reservation on any exception to prevent items from being
            // permanently locked if payment processing or other operations fail
            await _inventoryService.ReleaseReservation(order.Items);
            Console.WriteLine($"Error: {exception.Message}");
            throw;
        }
    }

    // TODO: Add comprehensive validation including customer verification,
    // item availability pre-check, and payment method validation
    private bool IsOrderValid(Order order)
    {
        return order.Items?.Count > 0 && order.TotalAmount > 0;
    }

    public async Task CancelOrder(string orderId)
    {
        var order = await RetrieveOrderById(orderId);

        // Refund payment for paid orders per company policy: customers must receive
        // full refunds when orders are cancelled, regardless of cancellation reason
        if (order.Status == OrderStatus.Paid)
        {
            await _paymentGateway.RefundPayment(order.TransactionId);
            await _inventoryService.RestoreInventory(order.Items);
        }

        order.Status = OrderStatus.Cancelled;
        // Must persist status change to database; failure to save could result in
        // inconsistent state where order appears active but is actually cancelled
        await PersistOrder(order);
    }

    private async Task<Order> RetrieveOrderById(string orderId)
    {
        // Implementation here
        return await Task.FromResult(new Order());
    }

    private async Task PersistOrder(Order order)
    {
        // Implementation here
        await Task.CompletedTask;
    }
}

