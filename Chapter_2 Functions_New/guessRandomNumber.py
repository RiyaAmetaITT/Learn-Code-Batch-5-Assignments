import random

MIN_NUMBER = 1
MAX_NUMBER = 100

def isValidGuess(guess):
    return guess.isdigit() and MIN_NUMBER <= int(guess) <= MAX_NUMBER

def getUserGuess(prompt):
    return input(prompt)

def compareGuess(guess, target):
    if guess < target:
        is_correct = False
        feedback = "Too low. Guess again"
    elif guess > target:
        is_correct = False
        feedback = "Too High. Guess again"
    else:
        is_correct = True
        feedback = "You guessed it in"
    return is_correct, feedback

def getValidGuess(prompt):
    guess = getUserGuess(prompt)
    while not isValidGuess(guess):
        guess = getUserGuess(f"I wont count this one Please enter a number between {MIN_NUMBER} to {MAX_NUMBER}")
    return int(guess)

def generateTargetNumber():
    return random.randint(MIN_NUMBER, MAX_NUMBER)

def displayVictoryMessage(feedback, number_of_guesses):
    print(feedback, number_of_guesses, "guesses!")

def playGame():
    target_number = generateTargetNumber()
    guessed_correctly = False
    number_of_guesses = 0
    guess = getValidGuess(f"Guess a number between {MIN_NUMBER} and {MAX_NUMBER}:")
    
    while not guessed_correctly:
        number_of_guesses += 1
        is_correct, feedback = compareGuess(guess, target_number)
        
        if is_correct:
            displayVictoryMessage(feedback, number_of_guesses)
            guessed_correctly = True
        else:
            guess = getValidGuess(feedback)

if __name__ == "__main__":
    playGame()
