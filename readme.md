# Amazon Shopping Clone

This is an Amazon shopping clone built using React.js and Tailwind CSS for the frontend, and Firebase for the backend. This app is fully responsive on both large and small devices unlike the actual amazon web app.

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository onto your local machine using the command
    ``` 
    git clone https://github.com/harsh661/Amazon-clone.git
    ```
2. Navigate to the project directory.
3. Install the project dependencies by running the command `npm install`.
4. Create a Firebase project and configure it for web use.
5. Create a `.env.local` file at the root of the project and add your Firebase configuration details as environment variables. For example:
    ```js
    REACT_APP_API_KEY=<your-api-key>
    REACT_APP_AUTH_DOMAIN=<your-auth-domain>
    REACT_APP_PROJECT_ID=<your-project-id>
    REACT_APP_STORAGE_BUCKET=<your-storage-bucket>
    REACT_APP_MESSAGING_SENDER_ID=<your-messaging-sender-id>
    REACT_APP_APP_ID=<your-app-id>
    ```
You can find these values in your Firebase project settings.

6. Run the project using the command `npm run dev`. This will start a development server at `http://localhost:5173`.

## Features

- User Authentication
- Dynamic Product Listing
- Checkout with Stripe
- Manage ordered products

## Technologies Used

- React.js
- Tailwind CSS
- Firebase

## Contributors

- [Harsh Raj](https://github.com/harsh661)