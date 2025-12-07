def calculateArmstrongSum(userInput):
    sumOfDigits = 0
    numberOfDigits = 0

    tempNumber = userInput
    while tempNumber > 0:
        numberOfDigits = numberOfDigits + 1
        tempNumber = tempNumber // 10

    tempNumber = userInput
    for digit in range(1, tempNumber + 1):
        digit = tempNumber % 10
        sumOfDigits = sumOfDigits + (digit ** numberOfDigits)
        tempNumber //= 10
    return sumOfDigits

userInput = int(input("\nPlease Enter the Number to Check for Armstrong: "))

if (userInput == calculateArmstrongSum(userInput)):
    print("\n %d is Armstrong Number.\n" % userInput)
else:
    print("\n %d is Not a Armstrong Number.\n" % userInput)