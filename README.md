## Overview

The **Personal Finance App** is a web application designed to help users effectively manage their financial health. The app allows users to track their income, expenses, savings goals, and provides visual insights into their financial status through charts and summaries.

> **Not
## Features

Financial Summary: Displays total income, total expenses, and calculated savings.
Budget Tracker: Users can add, view, and delete budget items, with a total budget displayed.
Savings Goals: A dedicated section to track savings goals and milestones.
Visual Data Representation: Pie charts to visualize income and expense breakdowns, enhancing understanding of financial allocations.
Responsive Design: Built with Material-UI to ensure a user-friendly experience across various devices.
Voice Recognition: Uses speech recognition to provide financial advice and insights based on trends.
Trend Analysis and Financial Advice: Analyzes financial data and provides personalized recommendations based on income, expenses, and savings trends.
e:** Currently, all development is taking place on the `main` branch.

## Technologies Used(Frontend)

- **React**: A JavaScript library for building user interfaces.
- **Material-UI**: A React UI framework for creating responsive and aesthetically pleasing components.
- **Chart.js**: A library for rendering charts and visual data representations.

  Attached below is my Frontend Design layout

<img width="1680" alt="Screenshot 2024-09-28 at 22 09 25" src="https://github.com/user-attachments/assets/787cd80e-21c6-437d-a44e-44e3d44551e3">

<img width="1680" alt="Screenshot 2024-09-28 at 22 09 47" src="https://github.com/user-attachments/assets/7c95baed-9537-457d-8e04-79bb51a69263">
<img width="1680" alt="Screenshot 2024-09-28 at 22 09 41" src="https://github.com/user-attachments/assets/f2dc380a-220a-4d5d-9bf7-3a0dd51910d7">
<img width="1680" alt="Screenshot 2024-09-28 at 22 09 35" src="https://github.com/user-attachments/assets/a14599be-5d18-44db-a5e9-aa65965327b7">
<img width="1680" alt="Screenshot 2024-09-28 at 22 09 29" src="https://github.com/user-attachments/assets/930a063f-09dc-431a-96c3-524444f2723f">

 ## Docker Compose Setup for PostgreSQL and PgAdmin

This Docker Compose configuration sets up PostgreSQL and PgAdmin services with health checks to ensure PgAdmin waits for PostgreSQL to be fully ready before starting.

## Database Setup

The database directory contains a Python script to automate the setup of a PostgreSQL database and its associated tables. The script will create a new database and define the necessary tables for the project.

### Install Python Dependencies

All necessary Python packages are listed in the \`requirements.txt\` file. To install them, use the following command:

```
pip3 install -r ./database/requirements.txt
```

The \`requirements.txt\` file should include:

```
psycopg2-binary
python-dotenv
```


