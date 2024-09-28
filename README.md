## Overview

The **Personal Finance App** is a web application designed to help users effectively manage their financial health. The app allows users to track their income, expenses, savings goals, and provides visual insights into their financial status through charts and summaries.

> **Note:** Currently, all development is taking place on the `main` branch.

## Features

- **Financial Summary**: Displays total income, total expenses, and calculated savings.
- **Budget Tracker**: Users can add, view, and delete budget items, with a total budget displayed.
- **Savings Goals**: A dedicated section to track savings goals and milestones.
- **Visual Data Representation**: Pie charts to visualize income and expense breakdowns, enhancing understanding of financial allocations.
- **Responsive Design**: Built with Material-UI to ensure a user-friendly experience across various devices.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Material-UI**: A React UI framework for creating responsive and aesthetically pleasing components.
- **Chart.js**: A library for rendering charts and visual data representations.

  Attached below is my Frontend Design layout

<img width="1680" alt="Screenshot 2024-09-28 at 22 09 25" src="https://github.com/user-attachments/assets/787cd80e-21c6-437d-a44e-44e3d44551e3">

<img width="1680" alt="Screenshot 2024-09-28 at 22 09 47" src="https://github.com/user-attachments/assets/7c95baed-9537-457d-8e04-79bb51a69263">
<img width="1680" alt="Screenshot 2024-09-28 at 22 09 41" src="https://github.com/user-attachments/assets/f2dc380a-220a-4d5d-9bf7-3a0dd51910d7">
<img width="1680" alt="Screenshot 2024-09-28 at 22 09 35" src="https://github.com/user-attachments/assets/a14599be-5d18-44db-a5e9-aa65965327b7">
<img width="1680" alt="Screenshot 2024-09-28 at 22 09 29" src="https://github.com/user-attachments/assets/930a063f-09dc-431a-96c3-524444f2723f">

## Docker Setup

This section outlines how to set up and run the Personal Finance App using Docker and Docker Compose. Docker allows you to create, deploy, and manage applications in isolated environments known as containers, ensuring consistency across different environments. Docker Compose enables you to define and run multi-container applications with a single configuration file.

### Overview of the Setup

- **Dockerfile:** This file defines the environment for the application, including the Node.js version, working directory, and the steps to install dependencies, build the application, and expose the necessary port.
  
- **docker-compose.yml:** This configuration file specifies the services required for the application. It defines how to build the frontend service, map ports, and manage environment variables, allowing for easy orchestration of the application.

