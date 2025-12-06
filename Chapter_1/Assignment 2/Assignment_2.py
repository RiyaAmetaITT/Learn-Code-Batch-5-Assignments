import random

def isValidGuess(userInput):
    if userInput.isdigit() and 1 <= int(userInput) <= 100:
        return True
    else:
        return False

def main():
    guessedNumber = random.randint(1, 100)
    isCorrectGuess = False
    userGuess = input("Guess a number between 1 and 100: ")
    numberOfGuesses = 0
    while not isCorrectGuess:
        if not isValidGuess(userGuess):
            userGuess = input("I wont count this one Please enter a number between 1 to 100: ")
            continue
        else:
            numberOfGuesses += 1
            userGuess = int(userGuess)

        if userGuess < guessedNumber:
            userGuess = input("Too low. Guess again: ")
        elif userGuess > guessedNumber:
            userGuess = input("Too High. Guess again: ")
        else:
            print("You guessed it in", numberOfGuesses, "guesses!")
            isCorrectGuess = True


main()