import random

def is_numeric(user_input):
    return user_input.isdigit()

def is_in_range(number):
    return 1 <= number <= 100

def is_valid_guess(user_input):
    if is_numeric(user_input):
        number = int(user_input)
        return is_in_range(number)
    return False

def get_user_input(prompt_message):
    return input(prompt_message)

def generate_random_number():
    return random.randint(1, 100)

def is_guess_too_low(guess, target):
    return guess < target

def is_guess_too_high(guess, target):
    return guess > target

def is_guess_correct(guess, target):
    return guess == target

def compare_guess(guess, target):
    if is_guess_too_low(guess, target):
        return "too_low"
    elif is_guess_too_high(guess, target):
        return "too_high"
    else:
        return "correct"

def display_success_message(guess_count):
    print("You guessed it in", guess_count, "guesses!")

def get_too_low_prompt():
    return "Too low. Guess again"

def get_too_high_prompt():
    return "Too High. Guess again"

def get_invalid_input_prompt():
    return "I wont count this one Please enter a number between 1 to 100"

def get_feedback_prompt(comparison_result):
    if comparison_result == "too_low":
        return get_too_low_prompt()
    else:
        return get_too_high_prompt()

def convert_to_integer(user_input):
    return int(user_input)

def increment_guess_count(guess_count):
    return guess_count + 1

def process_invalid_input():
    prompt = get_invalid_input_prompt()
    return get_user_input(prompt)

def process_guess_comparison(guess_number, target_number):
    comparison_result = compare_guess(guess_number, target_number)
    if comparison_result == "correct":
        return comparison_result, None
    else:
        prompt = get_feedback_prompt(comparison_result)
        next_input = get_user_input(prompt)
        return comparison_result, next_input

def main():
    target_number = generate_random_number()
    is_game_won = False
    guess_count = 0
    user_input = get_user_input("Guess a number between 1 and 100:")
    
    while not is_game_won:
        if not is_valid_guess(user_input):
            user_input = process_invalid_input()
            continue
        else:
            guess_count = increment_guess_count(guess_count)
            guess_number = convert_to_integer(user_input)
            comparison_result, next_input = process_guess_comparison(guess_number, target_number)
            
            if comparison_result == "correct":
                display_success_message(guess_count)
                is_game_won = True
            else:
                user_input = next_input


if __name__ == "__main__":
    main()
