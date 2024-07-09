# Basketball League Player Stats Data Table

This project is a data table that renders player statistics for a basketball league.

## Table of Contents

-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Usage](#usage)

## Prerequisites

-   Make sure you have Node.js version v21.7.1 installed. You can download it from [nodejs.org](https://nodejs.org/).

## Installation

To set up the project, follow these steps:

1. Clone the repository to your local machine:

    ```sh
    git clone https://github.com/WeitheFang/front-codechallenge
    ```

2. Navigate to the project directory:

    ```sh
    cd front-codechallenge
    ```

3. Install the necessary dependencies:

    ```sh
    npm i
    ```

4. Navigate to the server directory:

    ```sh
    cd server
    ```

5. Replace the .env.example file with your own .env file and input your MySQL username and password

6. Synchronize the database schema:

    ```sh
    npm run schema:sync
    ```

7. Seed the database with initial data:

    ```sh
    npm run seed
    ```

8. Navigate back to the root directory:

    ```sh
    cd ..
    ```

9. Start the application:
    ```sh
    npm run start
    ```

## Usage

Once the project is set up and running, you can access the data table to view player statistics for the basketball league. The data table provides an interactive interface to sort and filter player stats.
