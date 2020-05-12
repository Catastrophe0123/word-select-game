# WOW – The World of Words Game

Core Game
Input:

-   You are given a list of valid words (one word per line) in a file. This is your reference list (dictionary).
-   Display a 6 letter word (from a given dictionary) JUMBLED (mixed up) –
    For example ORANGE jumbled as AEGNOR
-   Start a timer (for 2 minutes)
-   The user can type any 3,4,5,6 letter words using exactly the same letters in the original word - AGE, NOR, RANGE, GORE, GEAR, RAGE etc.
-   As the user types each letter, it is removed from the original display so that the user knows what letters are left. A backspace will put the letter back in the word

    Example:
    User types Modified Word  
     A EGNOR  
     G ENOR  
     E NOR  
     `backspace` ENOR

## Steps to run

-   clone the repository
-   run `npm install` to install the dependencies
-   use `npm start` to start up the development server
-   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
    The page will reload if you make edits.
    You will also see lint errors in the console.

## Features implemented

-   [x] core game
-   [x] As the user types words arrange them in different columns – 3 letters in one, 4 letters in another etc.
-   [x] Implement – Jumble Again (this will re-arrange the letters of the word randomly but make sure that the original word is never shown). Users can request “Jumble” many times.
-   [x] Introduce the concept of levels. The basic game is Level-1 Each new level increases the word length by 1. For example, Level-2 is a 7-letter word, Level-3 is 8 letters, Level-4 is 9 letters and Level-5 is 10 letters.

## Todo

-   [ ] Introduce a system of high scores for complex words. Complex words are not in common vocabulary.
