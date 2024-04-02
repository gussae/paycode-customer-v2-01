# Project README

## Overview

This project is a comprehensive solution that demonstrates the integration of web applications with backend services using modern web technologies and AWS services. It showcases a scalable and flexible architecture suitable for web and mobile applications, emphasizing reusability, configurability, and efficient document storage and user interactions.

## Repository Structure

- **Monorepo**: A centralized codebase management approach, enhancing dependency tracking and cross-project integrations.
- **Workspaces**: Includes `packages`, `apps`, and `services`, facilitating shared dependencies management and streamlined workflows.

### Key Components

- **`@config`**: Manages project-wide configuration.
- **`@graphql`**: Central repository for GraphQL schemas and operations.
- **`@libs`**: Backend-focused utilities for document handling and Lambda response formatting.
- **`@ui-components`**: Reusable UI components for consistent user experience.
- **`@utils`**: Utilities for API Gateway interactions and GraphQL operations abstraction.

## Backend Services

- **`amplify-be`**: Core backend services using AWS Cognito for authentication and DynamoDB for data storage.
- **`paycode-proxy`**: A serverless proxy for secure communication between frontend apps and external services.

## Frontend Applications

- **`ui-web`** and **`web-ui`**: Frontend applications demonstrating integration with backend services and reusable UI components.

## Key Features

- **Document Storage**: Efficient and scalable solution using Amazon S3 and DynamoDB.
- **User Interactions**: Secure and flexible user management and authentication system.

## Deployment

- Automated CI/CD workflow for efficient deployment across multiple environments.
- Utilizes GitHub Actions for dynamic deployment decisions based on changes.

## Documentation

- **High-Level User Guide**: Detailed guide on adding features and project enhancements. [High-Level User Guide](High%20Level%20Guide.md)
- **Project Overview**: In-depth look at the project structure, backend architecture, and key packages. [Project Overview](Project%20Overview.md)

## Getting Started

1. Clone the repository to your local machine.
2. Create an `amplify-be` stack using the provided Amplify configuration. You would need to implement this manually using the Amplify Cli
3. Utilize the provided scripts for environment setup, deployment, and service integration.
