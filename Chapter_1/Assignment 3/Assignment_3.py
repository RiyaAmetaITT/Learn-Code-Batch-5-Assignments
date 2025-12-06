def isArmstrongNumber(userInput):
    # Initializing Sum and Number of Digits
    sumOfDigits = 0
    numberOfDigits = 0

    # Calculating Number of individual digits
    tempNumber = userInput
    while tempNumber > 0:
        numberOfDigits = numberOfDigits + 1
        tempNumber = tempNumber // 10

    # Finding Armstrong Number
    tempNumber = userInput
    for digit in range(1, tempNumber + 1):
        digit = tempNumber % 10
        sumOfDigits = sumOfDigits + (digit ** numberOfDigits)
        tempNumber //= 10
    return sumOfDigits


# End of Function

# User Input
userInput = int(input("\nPlease Enter the Number to Check for Armstrong: "))

if (userInput == isArmstrongNumber(userInput)):
    print("\n %d is Armstrong Number.\n" % userInput)
else:
    print("\n %d is Not a Armstrong Number.\n" % userInput)