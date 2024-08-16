# Contributing to Project Monitoring Dashboard

Thank you for your interest in contributing to the **Project Monitoring Dashboard**! Your contributions help improve the project and make it better for everyone. This document provides guidelines on how to contribute to the project.

## 1. Obtain a GitHub Access Token

To contribute or modify the project, you'll need a personal GitHub access token. This token allows access to GitHub repositories and displays their details.

1. Go to [GitHub](https://github.com) and log in to your account.
2. Click on your profile picture in the top right corner and select **Settings**.
3. In the left sidebar, click on **Developer settings**. (This option is available if you have access to [GitHub Developer Settings](https://developer.github.com/).)
4. Select **Personal access tokens**.
5. Click on **Generate new token**.
6. Give your token a descriptive name, select the scopes or permissions you'd like to grant this token (e.g., `repo` for repository access), and click **Generate token**.
7. Copy your new personal access token and paste it into the configuration of the application. (destination `src/app/api/api-github.js`)

## 2. Fork the Repository

To start working on your modifications, you need to fork the repository.

1. Visit the GitHub repository page [https://github.com/NewBumpEr/ProjectMonitoringDashboard](https://github.com/NewBumpEr/ProjectMonitoringDashboard).
2. Click on the **Fork** button at the top right of the page to create a copy of the repository in your GitHub account.
3. Clone your forked repository to your local machine using:

    ```bash
    git clone https://github.com/NewBumpEr/ProjectMonitoringDashboard
    ```

## 3. Set Up Your Development Environment

Before making changes, ensure you have the necessary dependencies installed. Run the following commands:

    npm install
    npm start
    

`npm install` will install all required dependencies, and `npm start` will start the development server.

## 4. Submit a Pull Request

After making your changes:

1. **Commit** your changes with a clear and descriptive message.
2. **Push** your changes to your forked repository.
3. **Submit a pull request** to the original repository. Provide a clear description of your changes and the purpose of the pull request.

---

Thank you for contributing to the Project Monitoring Dashboard!
