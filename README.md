# MatekNinja

The website available here: https://matekninja.hu

## Description

MatekNinja is a frontend React application intended for students who want to practice solving mathematical problems. The application allows students to create and modify their profiles, including name, school, and team name, with the only exception being their email. Currently, the application only supports the Hungarian language. A Google account is required to sign in and use the application.

When a new user signs up, it's recommended to set the team to "Barcelona", as this team has access to a larger number of problem sets, providing a good opportunity to explore the application's features.

The application has several features including:

- **Problem Sets**: Under the 'Problem Sets' menu, students can see problem sets related to their team, including basic information about each set. Students can then initiate a problem-solving session from this menu.
- **Problem Solving**: While solving problems, the time elapsed is displayed in the footer. The application saves the time spent on each problem and students can record their results. Students also have the option to revisit their previous solutions before submitting the problem set.
- **Results**: Under the 'Results' menu, students can review their previously solved problems. Problems that have been corrected and have the correct solution are framed in green, while those that haven't are framed in red.
- **Statistics**: In the 'Statistics' section, students can request detailed statistics for a specific period. The application will provide data including the number of problems solved during the period, the number of correct solutions, and two diagrams detailing points earned and time spent practicing, broken down by day.

## Installation

Before you start, please make sure that you have Node.js and npm/yarn installed on your machine.

1. Clone this repository:

```bash
git clone https://github.com/kallosbela/exam-project-frontend.git
```

2. Navigate into the directory:

```bash
cd exam-project-frontend
```

3. Install the dependencies:

```bash
npm install
```

## Running the Application
After you've installed the dependencies, you can run the application locally using the following command:

```bash
npm run dev
```

The application should now be running on http://localhost:5173 (or the port specified in your configuration).

## Building the Application
To create a production build of the application, you can run:

```bash
npm run build
```

After the build is complete, the compiled code will be located in the "dist" directory.

## Previewing the Build
If you want to preview the production build of the application, you can use:

```bash
npm run preview
```

This will serve the files from the dist directory.

## Dependencies
Here are some of the main dependencies that MatekNinja uses:

- **React:** The UI library used to build the application
- **Vite:** The build tool and dev server
- **TypeScript:** The language that the application is written in
- **axios:** Used for making HTTP requests
- **Chakra UI:** A simple, modular and accessible component library that gives you the building blocks you need to build your React applications
- **Chart.js:** Used to display statistics in chart form
- **KaTeX:** The fastest math typesetting library for the web
- **React Router Dom:** The standard routing library for React
- **Zod:** A JavaScript library for data validation
- **JWT Decode:** A small browser library that helps decoding JWTs token
- **RxJS:** A library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code

## Contribution

Contributions are always welcome. Please make a pull request.

## License

This project is licensed under the MIT License.