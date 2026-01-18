public class OrderValidator
{
    public bool IsOrderValid(Order order)
    {
        if (order == null)
        {
            return false;
        }

        return order.Items?.Count > 0 && order.TotalAmount > 0;
    }
}

public class OrderRepository
{
    public async Task<Order> RetrieveOrderById(string orderId)
    {
        return await Task.FromResult(new Order());
    }

    public async Task PersistOrder(Order order)
    {
        await Task.CompletedTask;
    }
}

public class ErrorHandler
{
    public void LogError(Exception exception)
    {
        Console.WriteLine($"Error: {exception.Message}");
    }

    public void HandleException(Exception exception)
    {
        LogError(exception);
        throw;
    }
}

public class OrderRecoveryService
{
    private readonly IInventoryService _inventoryService;

    public OrderRecoveryService(IInventoryService inventoryService)
    {
        _inventoryService = inventoryService;
    }

    public async Task ReleaseReservedItems(Order order)
    {
        await _inventoryService.ReleaseReservation(order.Items);
    }
}

public class OrderProcessor
{
    private readonly IPaymentGateway _paymentGateway;
    private readonly IInventoryService _inventoryService;
    private readonly INotificationService _notificationService;
    private readonly OrderValidator _orderValidator;
    private readonly OrderRepository _orderRepository;
    private readonly OrderRecoveryService _orderRecoveryService;
    private readonly ErrorHandler _errorHandler;

    public OrderProcessor(
        IPaymentGateway paymentGateway,
        IInventoryService inventoryService,
        INotificationService notificationService,
        OrderValidator orderValidator,
        OrderRepository orderRepository,
        OrderRecoveryService orderRecoveryService,
        ErrorHandler errorHandler)
    {
        _paymentGateway = paymentGateway;
        _inventoryService = inventoryService;
        _notificationService = notificationService;
        _orderValidator = orderValidator;
        _orderRepository = orderRepository;
        _orderRecoveryService = orderRecoveryService;
        _errorHandler = errorHandler;
    }

    public async Task<OrderResult> ProcessOrder(Order order)
    {
        if (order == null)
        {
            throw new ArgumentNullException(nameof(order));
        }

        if (!_orderValidator.IsOrderValid(order))
        {
            return OrderResult.Invalid("Order validation failed");
        }

        bool isInventoryAvailable = await _inventoryService.CheckAvailability(order.Items);
        if (!isInventoryAvailable)
        {
            return OrderResult.Failed("Insufficient inventory");
        }

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
                await _orderRecoveryService.ReleaseReservedItems(order);
                return OrderResult.Failed($"Payment failed: {paymentTransaction.ErrorMessage}");
            }
        }
        catch (Exception exception)
        {
            await _orderRecoveryService.ReleaseReservedItems(order);
            _errorHandler.HandleException(exception);
        }
    }

    public async Task CancelOrder(string orderId)
    {
        var order = await _orderRepository.RetrieveOrderById(orderId);

        if (order.Status == OrderStatus.Paid)
        {
            await _paymentGateway.RefundPayment(order.TransactionId);
            await _inventoryService.RestoreInventory(order.Items);
        }

        order.Status = OrderStatus.Cancelled;
        await _orderRepository.PersistOrder(order);
    }
}
