# Color Previewer Web App Documentation

## Overview

The Color Previewer application is a simple React-TypeScript project that fetches color data from an API, displays a scrollable list of color names, and shows a preview of the selected color together with the necessary information about the selected color.

## Features
- Fetches color data from the API: https://api.prolook.com/api/colors/prolook
- Displays a list of color names and shows a preview of the selected color
- Scrollable list for easy navigation
- Built with React, TypeScript, and Tailwind CSS

## Technologies Used
- React: a JavaScript Library for creating user interface
- TypeScript: a superset of JavaScript that adds static types
- Tailwind CSS: CSS framework for responsive design
- Axios: a promise-based HTTP client for fetching data

## Installation

**Prerequisites**
Requires you to have Git, Node.js and npm installed on your machine. You can download Node.js from the [Node.js official website](https://nodejs.org/en).


### Steps

**Clone the Repository or Create a New React App**

Cloning
```bash
git clone https://github.com/darkpsai/react-color-app.git
cd react-color-app
```
Create react app
```bash
npx create-react-app react-color-app --template typescript
cd react-color-app
```
**Install Tailwind CSS**
See here on how to install Tailwind: [Get started with Tailwind CSS](https://tailwindcss.com/docs/installation)

**Installation of Dependencies**
Install axios using npm.

**Create the ColorPreviewer component**
Create a new file named <code>ColorPreviewer.tsx</code> in the <code>src/components</code> directory and add the component code.

**Update the main application file**
Modify <code>src/App.tsx</code> to import and use the <code>ColorPreview</code> component.

**Running the Project**
```bash
npm run start
```

## API
The application fetches color data from the following endpoint:

- Endpoint: https://api.prolook.com/api/colors/prolook
- Response Format: An array containing the following:
  - id: Unique identifier for the color
  - name: Name of the color
  - color_code: Code of the color
  - hex_code: hex value of the color