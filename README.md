# KolamKar - A Modern Kolam Art Platform

KolamKar is a full-stack web application designed for creating, analyzing, and sharing traditional Kolam art. It combines the rich heritage of a timeless art form with modern AI technology, providing a comprehensive toolkit for artists, enthusiasts, and learners.

This repository contains the complete MERN stack application, including the React frontend and the Node.js/Express backend API.

---

## Features

-   **AI-Powered Generation**: Create stunning Kolam designs from text or image prompts.
-   **Pattern Analysis**: Upload existing designs for detailed analysis of symmetry and patterns.
-   **Interactive Playground**: A digital canvas for drawing and experimenting with Kolam art.
-   **Secure Authentication**: Robust user registration and login system using JWT.
-   **Modern UI**: A sleek, responsive, and intuitive user interface built with React, Tailwind CSS, and shadcn/ui.

---

## Tech Stack

| Area      | Technology                                                                                                  |
| :-------- | :---------------------------------------------------------------------------------------------------------- |
| **Frontend**  | [React](https://reactjs.org/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Axios](https://axios-http.com/) |
| **Backend**   | [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/), [JWT](https://jwt.io/)      |

---

## Getting Started

Follow these instructions to get the project up and running on your local machine for development.

### Prerequisites

You will need the following software installed on your machine:
-   [Node.js](https://nodejs.org/en/download/) (v16 or higher is recommended)
-   [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
-   A MongoDB database instance (you can use a local installation or a free cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Ash22686/Kolam-Kar.git
    cd your-project-name
    ```

2.  **Setup the Backend API:**

    First, let's get the server running.

    -   Navigate to the backend directory:
        ```bash
        cd backend
        ```

    -   Install the necessary dependencies:
        ```bash
        npm install
        ```

    -   Create a `.env` file in the `backend` directory. This file will store your secret keys and database connection string. Copy the following into it:
        ```env
        # Your MongoDB connection string
        MONGO_URI=your_mongodb_connection_string

        # A long, random, and secret string for JWT
        JWT_SECRET=your_super_secret_key

        # The port for the server to run on (optional, defaults to 5000)
        PORT=5000
        ```

    -   Start the backend server:
        ```bash
        npm start
        ```
    -   The server will now be running and listening on **`http://localhost:5000`**.

3.  **Setup the Frontend Application:**

    Now, let's get the React user interface running. **Open a new terminal window** for this step.

    -   Navigate to the frontend directory from the project root:
        ```bash
        cd frontend
        ```

    -   Install the necessary dependencies:
        ```bash
        npm install
        ```

    -   Start the frontend development server:
        ```bash
        npm run dev
        ```
    -   The application will now be running and accessible in your web browser, typically at **`http://localhost:5173`**.

You now have both the frontend and backend running locally and can begin development!
