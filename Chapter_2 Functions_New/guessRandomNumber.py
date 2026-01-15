import random

def isValidGuess(guess):
    if guess.isdigit() and 1 <= int(guess) <= 100:
        return True
    else:
        return False

def getUserGuess(prompt):
    return input(prompt)

def compareGuess(guess, target):
    if guess < target:
        return False, "Too low. Guess again"
    elif guess > target:
        return False, "Too High. Guess again"
    else:
        return True, "You guessed it in"

def playGame():
    target_number = random.randint(1, 100)
    guessed_correctly = False
    guess = getUserGuess("Guess a number between 1 and 100:")
    number_of_guesses = 0
    
    while not guessed_correctly:
        if not isValidGuess(guess):
            guess = getUserGuess("I wont count this one Please enter a number between 1 to 100")
            continue
        else:
            number_of_guesses += 1
            guess = int(guess)
            is_correct, feedback = compareGuess(guess, target_number)
            
            if is_correct:
                print(feedback, number_of_guesses, "guesses!")
                guessed_correctly = True
            else:
                guess = getUserGuess(feedback)

def main():
    playGame()

if __name__ == "__main__":
    main()
