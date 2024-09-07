# Dice Wars

Dice Wars is a two-player dice game built using JavaScript and React. The aim is for each player to reach a score of 100 by rolling dice. It’s a turn-based game that involves strategic decision-making, where players must choose between rolling the dice to accumulate points or holding to secure their current total.

## Table of Contents

- [Features](#features)
- [Rules](#rules)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [How to Play](#how-to-play)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features

- Two-player turn-based gameplay
- Players roll dice to accumulate points
- If a player rolls a one, their current score is reset to zero and the turn passes to the other player
- Players can choose to "hold" to secure their current score
- First player to reach 100 wins

## Rules

- On each turn, a player rolls the dice.
- If the player rolls a number other than one, it is added to their current score.
- The player can continue rolling or choose to "hold" and add the current score to their total score.
- If the player rolls a one, their current score is reset to zero, and the turn is passed to the opponent.
- The game continues until one player reaches a total score of 100.

## Technologies Used

- **React**: For building the user interface
- **JavaScript**: Game logic and functionality
- **CSS**: For basic styling
- **Netlify**: Deployed for live demo

## Installation

To run the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/LogiCule/dice-wars.git
    ```
2. Navigate to the project directory:
    ```bash
    cd dice-wars
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm start
    ```
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to Play

1. Launch the game in your browser.
2. Player 1 starts by rolling the dice.
3. The player can continue rolling to accumulate points or hold to add the current score to their total.
4. If a player rolls a one, their current score is reset, and it becomes the opponent's turn.
5. The first player to reach 100 total points wins the game.

## Screenshots

![Gameplay Screenshot](link_to_screenshot)

## Contributing

If you would like to contribute to this project, feel free to open an issue or submit a pull request.
