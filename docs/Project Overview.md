# Project Overview

This project adopts a monorepo structure to encapsulate a comprehensive ecosystem involving web applications, backend services, and shared utilities. It leverages modern web technologies and AWS services to demonstrate a scalable and flexible architecture suitable for both web and mobile applications. The project illustrates the integration of frontend applications with backend services, emphasizing reusability, configurability, and the efficient management of document storage and user interactions.

## Project Structure

The project is organized into a monorepo that houses various workspaces under `packages`, `apps`, and `services`. This setup facilitates shared dependencies management, streamlined workflows, and consolidated version control.

- **Monorepo**: Centralizes codebase management, simplifying dependency tracking and cross-project integrations.
- **Workspaces**: Defined by all subdirectories in `packages`, `apps`, and `services`, including functions within `apps` that serve as individual workspaces.

### Packages

Shared libraries and utilities designed to support both frontend and backend applications:

- `@config`: Manages project configuration, tailoring environment setups across different workspaces.
- `@graphql`: Central repository for GraphQL schemas and operations, enabling consistent data management and API interactions.
- `@libs`: Provides a collection of backend-focused utilities, including document handling, Lambda response formatting, and secrets management.
- `@ui-components`: Houses reusable UI components, fostering a uniform user experience across web applications.
- `@utils`: Offers a suite of utilities for interacting with API Gateway, abstracting GraphQL operations, and facilitating frontend-to-backend communications.

### Apps

Web applications and backend services demonstrating the project's capabilities:

- `amplify-be`: Serves as the primary backend, leveraging AWS Cognito for authentication and hosting core services like user management and document indexing.
- `paycode-proxy`: A serverless proxy facilitating secure and efficient communication between frontend apps and external services.
- `ui-web` and `web-ui`: Frontend applications showcasing different tech stacks (TypeScript and JavaScript, respectively) and integrating shared UI components and backend services.

### Services

While currently focusing on the backend functionalities integrated within `amplify-be`, the project structure allows for the migration of specific features to standalone services. This modular approach supports scalability and the adoption of microservices architecture as the project evolves.

## Backend Services Architecture

The backend architecture (`amplify-be`, `paycode-proxy`) illustrates advanced patterns in user management, notifications, and document storage. Utilizing AWS services and custom Lambda functions, the project showcases scalable solutions for real-world application scenarios.

## Configuration Files

The project utilizes a blend of custom and standard configuration files to manage its monorepo setup, ensuring seamless operation across different workspaces and maintaining consistency in development practices.

### Monorepo and Workspace Configuration

- **`monorepo.config.json`**: Serves as the central hub for global configurations within the monorepo, defining paths, global settings, domain management, deployment strategies, and external infrastructure settings crucial for project functionality. This configuration file is indispensable for maintaining a unified approach to application-wide settings, domain configurations, and deployment methodologies.

- **`workspace.config.json`**: Provides customization for the settings of each workspace, addressing the distinct requirements of packages, apps, or services. It specifies application environments, custom settings, deployment methodologies, and environment variables relevant to each workspace's operations. This ensures that workspaces function according to their individual needs while maintaining harmony within the monorepo.

- The `@paycode-customer-v2/config` package utilizes these configurations to prepare the environment for each workspace, translating to `.env` files in web applications and environment variables in backend Lambdas. It generates a configuration map for key-value substitutions, streamlines the sharing of workspace outputs via a parameter store specific to the deployment environment, and employs namespaces for organizing output partitions and stack names, among other functionalities. This integration is pivotal in harmonizing the diverse workspaces into a unified system. The configurator, written in JavaScript, operates without the need for build tools, playing a critical role in the build and deployment phases across all workspaces. However, it's important to note that this tool is intended for use during the build environment setup rather than as a runtime resource.

### Standard Configuration Tools

The project leverages a stack of standard configuration for workspace and dependency management, alongside ensuring code integrity. Special emphasis is placed on the `package.json` file, a key element for configuring workspaces and facilitating module exports in both CommonJS (cjs) and ECMAScript Module (esm) formats across packages. `tsconfig.json` is there for typeScript compilation, improving developer productivity and type safety. It's also leverages by a whole suite of tools so be cautious when you manage this file.

Tools such as `eslint` and `.eslintrc` uphold JavaScript and TypeScript coding standards, while code formatting and infrastructure as code practices are maintained through `prettier` with `.prettierrc` and `cfn-lint` with `.cfnlintrc`, respectively.

Moreover, configuration files `graphqlconfig.yml` and `redocly.yaml` manage GraphQL schema and OpenAPI documentation, respectively, ensuring API integration and documentation remain current and accessible. There may also be other configuration files notably the `.gitignore` file aids in maintaining a clean version control environment by excluding specific files which can be crucial for proper CI/CD builds and `jest.config.js` establish a solid testing framework vital for project stability. There is only one jest test for demonstrative purposes.

## Web Apps / UI Integration

Frontend applications (`ui-web`, `web-ui`) integrate with backend services (`amplify-be`, `paycode-proxy`) through a combination of GraphQL APIs, AWS Cognito authentication, and event-driven document management. These integrations exemplify a cohesive ecosystem where user interactions, data management, and service communications are seamlessly orchestrated.

## Scripting and Automation

The project employs various scripts to automate environment setup, deployment processes, and service integrations across workspaces. These scripts, managed at the root, package, and service levels, ensure a smooth and efficient development lifecycle.

### Continuous Integration and Development

- Git hooks automate syncing operations across environments, aligning development efforts with branch management practices.
- Build and utility scripts support continuous integration workflows, enhancing code quality and deployment reliability.

## Web Apps / UI

The project features multiple web applications that serve as frontends to interact with the backend services, showcasing different stacks and approaches. These applications are there to demonstrate the flexibility and reusability of components and clients across various environments and setups.

### @amplify-be Frontend (`@paycode-customers-v2/amplify-be`)

This React application is tailored for local hosting and serves as a demo playground. It is specifically useful for testing components and implementing backend functionalities through the Amplify CLI. AWS recommends this setup to avoid complications associated with integrating @amplify-be into different workspaces. Nevertheless, the monorepo setup with the @config system ensures that @amplify-be acts as a common backend that can be shared across different web and mobile app workspaces without needing a main frontend app integrated directly with @amplify-be. The system allows for the export and import of necessary configuration values, and the sharing of configured clients (via @utils) enables tailored interactions based on the specific environment.

### @ui-web (`@paycode-customers-v2/ui-web`)

Is a typescript project and serves as the main demo application. It incorporates UI components from the `@ui-components` package and uses the GraphQL client and API GW  clients generated in `@utils` for backend interactions. The application is built and deployed to S3/CloudFront.

### @web-ui (`@paycode-customers-v2/web-ui`)

A JavaScript web application built and deployed to S3, representing the JS flavor of the frontend applications. Due to some tooling challenges, it is less preferred compared to its TypeScript counterpart, but it remains a viable option if you are more comfortable with JavaScript. It does not import from the UI-controller and host a simple demo app. It makes use of the API GW clients generated in `@utils`.

## The Backends

For now, there are two: `amplify-be` and `paycode-proxy`.

### amplify-be

- **Core Services**: Hosts User, Profile, Notification, and DocumentIndex tables, utilizing a GraphQL API for operations.
- **Authentication**: Leverages a user pool provided by AWS Cognito, where each user is onboarded upon their first sign-in. This process links each Cognito user with a corresponding User entry in the database providing better capabilities via the use of the User table.
- **Profile and Notification Services**: Serve as demonstrations of how backend services can interact with frontend applications. The notification system showcases pushing updates from the backend to the frontend, enabling real-time data mutation and user notification through GraphQL.
- **Document Store**: The document store in `amplify-be` demonstrates an efficient and scalable approach to managing documents using Amazon S3 and DynamoDB, leveraging AWS services for asynchronous event handling and state synchronization. The document store combines S3 for document storage with a DynamoDB `DocumentIndex` table to track document metadata, such as keys and associated usernames. This setup ensures documents are easily retrievable and securely managed.
- **Document Upload Process**:
  - When a document is uploaded to S3, it triggers an S3 Put Object event.
  - This event then invokes the `DocumentIndex` Lambda function, which performs a mutation on the GraphQL API to create an index entry in the DynamoDB `DocumentIndex` table.
  - The creation of this index allows for the association of the uploaded document with a specific user, facilitating access control and retrieval.
- **Document Fetch Process**:
  - To fetch a document, a Lambda function generates a signed URL after verifying the document's existence in the `DocumentIndex` table.
  - This signed URL is then used by the frontend to securely upload or download the document from S3, maintaining a clear separation of concerns and leveraging S3's capabilities for direct browser uploads and downloads.

This event-driven approach offers several advantages over synchronous operations, including improved manageability, scalability, and fault tolerance. By decoupling the storage and indexing of documents, the system can efficiently handle high volumes of document operations without compromising on performance or security. Additionally, this architecture simplifies the process of updating and maintaining the document index in response to changes in the document storage layer, ensuring the system remains responsive and up-to-date.

- **Document Store**: Demonstrates an implementation using DynamoDB and S3. The `DocumentIndex` lambda provides signed URLs for document upload and download, verifying document existence through the DocumentIndex table. Document uploads trigger a workflow that updates the GraphQL schema with document indices, while document removals are handled similarly, ensuring consistent state management. This setup represents a simple yet expandable document storage solution.

### paycode-proxy

- **Serverless Proxy**: Functions as an intermediary between the frontend applications and the paycode server, hosted in a separate VPC. It supports various resources such as Balance, Transactions, Payment, and QRCodes through dedicated lambdas.
- **Networking**: The VPC hosting `paycode-proxy` is peered with the paycode server's VPC, allowing direct access to the server's private IP. This configuration is supported by scripts designed to facilitate the peering process, ensuring seamless communication between the proxy and the server.

## Project Packages Overview

This document outlines the structure and purpose of key packages within the project, including their roles and how they interact with each other.

### Configuration System (`@paycode-customers-v2/config`)

The `@config` package is essential for configuration management within the project, operating exclusively in the build environment. It's designed to manage and namespace configurations across various dimensions:

- *Environments*: Branch (e.g., dev, main), repositories, AWS accounts (dev, prod), AWS regions (e.g., us-east-1, us-west-2), and AWS profiles (default, dev, prod).
- *DeploymentEnv*: Ties the above elements into a cohesive namespace for stack and application management.
- *RuntimeEnv*: Represents application-layer concepts, highlighting static configurations determined by deployment rather than dynamic settings.

The package utilizes `.monorepo.config.json` and `.workspace.config.json` files to define monorepo and workspace-specific configurations, focusing on infrastructure and static application settings.

The main exports are the `getConfig(sync)` and `getConfigAsync` providing you with the configuration for a given workspace. `setEnv` is also exported from this package and used by config.js to set `.env` for UIs. `getMonorepoConfig` gives you the system wide configuration. There are few other useful functions as well.

### GraphQL (`@paycode-customer-v2/graphql`)

The `@graphql` package serves as the central repository for GraphQL schemas and operations, facilitated by Amplify Codegen as configured in `.graphqlconfig.yml`. It supports both frontend and backend applications through esm (frontend) and cjs (backend) builds, promoting code reuse and consistency across the project. This is typically output by Amplify within the src folder. But it's hijacked to this package and built and distributed for both the frontend and backend use as esm and cjs exports.

### Lib (`@paycode-customers-v2/lib`)

A collection of utilities shared across applications and primarily intended for a backend use (but export both cjs and esm modules), featuring:

- **Document Utils**: For interacting with the document store.
- **Lambda Response**: Assists in handling CORS, errors, and standard responses from client-facing Lambda functions.
- **Secrets and Parameters Handling**: Initially intended to abstract AWS Parameter Store and Secret Manager access; however, this was rendered useless since the use of VPC entails the need for Private Link or NGW invalidating the logic of using a parameter store. Still the secret manager can and recommended to be used (requires Private Links) in production.
- **Execute-Check**: Facilitates local testing of Lambda functions. This deceptively simple implementation is pretty powerful and it checks the core functionality of your lambda by first checking the function source (TS file), then checking the same thing as bundled js file. Check out its use in how you can use it to establish document end-to-end 'tests' under amplify-be/fn/document-access/execute-check.ts. The proxy backend functions also use the execute-checks.

### UI Components (`@paycode-customers-v2/ui-components`)

This package provides shared UI components for both the `web-ui` and `amplify-be` frontend applications, emphasizing the separation of UI rendering from data management (handled by GraphQL and API GW clients). It aims to unify the UI experience and streamline development across web applications. It outputs purely esm modules.

### Utils (`@paycode-customers-v2/utils`)

The `utils` package is a critical component of the project infrastructure, designed to provide a wide range of functionalities to both the backend and frontend segments of the project. It is structured into two main categories to cater to the different environments: node and browser and is a build environment tool.

#### Node Utilities

- **API GW Utilities**: Tools for managing and interacting with Amazon API Gateway, including the ability to export API configurations similar to tools like Postman for testing and integration, api documentation, client documentation and client generation. Sample docs generated thus far are presented in the /doc sections but note that these utilities generate live, evolving documentation that details client usage and API definitions, ensuring that developers have up-to-date references for building and integrating services.
- **API Adapter**: A layer that abstracts the complexity of API calls, providing a simplified interface for backend communication. It intercepts Axios calls, facilitating easier client development.
- **Builders**: Responsible for generating API Gateway clients, this utility is crucial in creating interfaces for backend services. It employs API adapters configured for specific deployment environments, streamlining the process of integrating backend services into the application logic.

#### Browser Utilities

- **Paycode-gql**: Specializes in abstracting GraphQL operations for specific models like documents, notifications, and profiles. It leverages the GraphQL client generated by the `@graphql` package, providing a streamlined interface for frontend applications to interact with backend GraphQL services (documents, notification and profile are provided as samples). This utility ensures that common data handling logic is centralized, reducing redundancy and facilitating maintenance.
- **Paycode-proxy**: Abstracts interactions with API Gateway endpoints. It focuses on specific service areas such as balance inquiries, payments, and transaction processing. By utilizing configured clients tailored to the app environment, `paycode-proxy` simplifies the integration of API Gateway services into frontend logic, promoting consistency and efficiency in frontend development.

## Project Scripting Guide

This guide details the structure and purpose of various scripts used throughout the project, organized by their respective workspaces: `root`, `amplify-be`, `paycode-proxy`, and the UI workspaces (`web-ui`, `ui-web`). Some scripts that are providing utilities are ignored in the discussion here.

### Build, Deployment and Configuration

- Scripts like `config.js` and `deploy.js` standardize the deployment process, adapting to the needs of different environments and services.
- **config.js**: Sets up environment (for UIs,  it als sets up envars) critical for both backend and frontend operations, leveraging `.env` files for the frontend and direct configuration for backend and Lambda environments.
- **deploy.js**: Manages the deployment process for applications, with specific adjustments per workspace requirements, excluding `amplify-be` which is locally hosted.
- There are several build scripts. Some build packages. Others simply bundle. ESbuild is used extensively especially in the lambda packaging. The frontend apps use Vite which uses its own build stack.

### Root Workspace

#### Peering

- **accept-peering.js**: Automates the acceptance of VPC peering connections, facilitating communication between separate VPCs.
- **create-pc-routes.js**: Generates routing rules for peered VPCs, ensuring seamless network traffic between them.
- **create-peering-role-arn.js**: Establishes the necessary IAM role for managing VPC peering connections.
- **enable-private-dns-over-pcx.js**: Activates DNS resolution for services over the peered VPC connection, enhancing service discovery.

#### Build

- **build-packages.js**: Installs and builds all necessary locally maintained packages for the project using package configurations in `monorepo.config.json`. Parallelizes builds that are not dependent while building dependent ones in the correct sequence. It also uses hashing to only build where change is detected. Supports `cached`, `browser`, `node`, and `skip` arguments.
- **get-deployment-state.js**: Generates the necessary state required for deployment orchestration in the CI/CD.
- **github-aws-oidc.js**: Uses `monorepo.config.json` `githubUsername`, `reponame`, and `account` environment variable to identify the role required for deployment, granting GitHub Actions access to your AWS Account.

### Amplify Backend (`amplify-be`)

- **Hooks**:
  - **Pre-push**: Triggers function builds within `amplify-be`, isolating the build process from the main application build. It uses hashing to determine if a fresh build is necessary.
  - **Post-push**: Updates `amplify-be` exports the latest environment specific amplify outputs to the parameter store.
- **fix-cors.js**: Adjusts CORS settings specifically for `amplify-be`, addressing cross-origin request issues.
- **build-fn.js**: Builds the functions in the `fn` folder and exports the bundle into the correspondingly named Amplify function. This ensures the function is safe and away from Amplify hiccups. It employs hashing and other optimizations.

### UI Workspaces (`web-ui`, `ui-web`)

- **Config**: Configures the workspace and sets up the environment variables for the UI workspaces, leveraging `.env`.
- **prebuild**: Prepares the workspace by ensuring all necessary configurations and dependencies are in place before the build process begins.
- **deploy**: Uses the CFN template for the UI workspaces to deploy the application to S3 + CloudFront.
- **postdeploy**: Handles tasks post-deployment, such as cache invalidation, to ensure users receive the most current version of the application.

### Paycode Proxy Workspace Scripts

- **config.js**: Configures the workspace, setting up environment variables and integrating with `.env` for seamless operation.
- **deploy.js**: Facilitates the deployment of the `paycode-proxy` using AWS SAM, tailored to meet the specific requirements of this workspace.
- **deploy-api.js**: Deploys APIs, leveraging the infrastructure as code principles and AWS SAM for efficient management.
- **validate-openapi.js**: Validates OpenAPI specifications to ensure compliance and correctness before deployment.
- **fix-cors.js**: Updates Lambda environment variables to include allowed origins, addressing CORS requirements for API access.
- **build-template.js**: Constructs `template.yaml` for AWS SAM deployment, parsing and combining information from `template.build.yaml`. It uses the `@Config` output as a map and replace placeholders in the templates, handle envars, parses `samconfig.build.toml` into `samconfig.toml` and  so forth so that the template.build.toml can be as generic as possible while at the same time can be built into a valid `template.yaml` file that can be deployed into a specific deploymentEnv
- **bundle-openapi.js**: Bundles the OpenAPI specification along with CORS configurations, integration definitions, and models, preparing the API for deployment.
- **log-api.js**: Provides logging capabilities, crucial for monitoring and debugging API behavior in production.
- **patch-api.js**: Applies patches to the API post-deployment.

### Git Hooks

- **Post-checkout**: Automatically syncs the Amplify environment with the current Git branch when you checkout a Git branch, critical for maintaining environment consistency. It assumes the main branch corresponds to the prod environment while the dev branch corresponds to the dev Amplify environment.

### CI/CD

The CI/CD workflow defined in this GitHub Actions configuration is tailored for efficient and dynamic deployment across multiple environments. Triggered by pushes to `dev` and `main` branches, it filters out unnecessary paths to focus only on significant changes, ensuring optimal build and deployment times. The workflow employs a series of jobs to set up the environment, leveraging AWS OIDC for secure AWS interactions and determining the state of deployments to decide whether a full deployment or selective updates are necessary. It uses `actions/checkout` for sparse checkouts to optimize the cloning process, `actions/setup-node` for Node.js setup, and custom scripts like `github-aws-oidc.js` and `get-deployment-state.js` to fetch deployment states and AWS role information. Depending on the deployment state and updated paths, it either proceeds with a full deployment or selectively updates the `paycode-proxy`, `ui-web`, and `web-ui` components. This modular approach ensures that only the necessary components are built and deployed, optimizing resource usage and deployment time while maintaining the system's integrity and responsiveness to changes. See [Deployment Workflow](../.github/workflows/deployment.yaml) for details
