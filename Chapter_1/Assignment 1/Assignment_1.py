import random

def rollDice(sides):
    diceResult = random.randint(1, sides)
    return diceResult

def main():
    sides = 6
    rollAgain = True
    while rollAgain:
        userInput = input("Ready to roll? Enter Q to Quit")
        if userInput.lower() != "q":
            diceResult = rollDice(sides)
            print("You have rolled a", diceResult)
        else:
            rollAgain = False