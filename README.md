# Motus Game

## Overview

Motus is an engaging word game where players aim to guess the correct word based on hints and feedback from their previous guesses. The game is built using modern web technologies and offers a seamless user experience.

## Technology Stack

- **Framework**: [Angular](https://angular.io/)
- **UI Components**: [PrimeNG](https://www.primefaces.org/primeng/)
- **HTTP Client**: [HttpClientModule](https://angular.io/guide/http) from Angular
- **Animations**: Angular's [BrowserAnimationsModule](https://angular.io/guide/animations)

## Game Objective

The goal of the game is to guess the correct word. With each guess, the game provides feedback on the letters guessed. The feedback can be:
- Correct position and letter
- Correct letter but wrong position
- Incorrect letter

The player continues to guess until they either guess the correct word or exhaust their allowed attempts.

## Development Methods

1. **Dependency Injection**: Angular's core feature, Dependency Injection (DI), is extensively used in the game. Services like `GameService`, `WordService`, and `GameSettingsService` are injected into components to manage game logic, fetch words, and handle game settings respectively.

2. **Service-Oriented Architecture**: The game logic is separated into distinct services. For instance, `WordService` handles word-related operations, while `GameService` manages the game's core logic.

3. **Animations**: The game uses Angular animations to enhance the user experience. Transitions like `fadeInOut` and `letterAnimation` are used to provide visual feedback to the player.

4. **Utility Functions**: Utility functions like `asyncTimeout` and `LetterUtils` are used to handle common tasks and letter manipulations.

5. **Constants**: Constants such as `TextConstants` are used to manage game texts in a centralized manner.

6. **Models**: Data structures like `APIWord` and `Letter` model are used to represent game data. Letter class has serval daughter classes such as `CorrectLetter` and `IncorrectLetter` to represent different types of letters.

## Getting Started

1. Clone the repository: `git clone https://github.com/Naofel-eal/motus.git`
2. Navigate to the project directory: `cd motus`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your browser and navigate to `http://localhost:4200/` to play the game.

---

For more details, you can explore the game's [source code](https://github.com/Naofel-eal/motus).

---

Useful Links:
- [Documentation](https://github.com/Naofel-eal/motus)
- [My GitHub](https://github.com/Naofel-eal/)