1. Clone the Project and Navigate to the Directory
Open your terminal or command prompt and clone the project using the following command:

git clone <repository_url>
Replace <repository_url> with the URL of the project's GitHub repository.

cd cyber-mockdata-project

2. Create .env File and Add Value
Create or open the .env file in the project directory and add the following line:

VITE_API_URL=http://localhost:3000/
This file defines environmental variables used by your project.


3. Install Dependencies
To install the dependencies used in the project, run the following command in your terminal:

npm install
This command installs dependencies specified in the package.json file.


4. Start JSON Server
To start the JSON Server used in the project, run the following command:

npx json-server db.json --port 3000
This command starts a JSON API server using db.json and makes it accessible at http://localhost:3000.

5. Run the Project
Finally, to start the project, run the following command:

npm run dev
This command runs the project in development mode. By default, it starts the website using Vite (or another development server) at http://localhost:3000.

Notes:
The db.json file represents sample database data provided by JSON Server and will be used in your project. You may need to customize this file to suit your project's needs.
The .env file and VITE_API_URL variable are used to define the API endpoint for your project. Adjust this value according to your project's requirements and environment.
By following these steps, you can successfully initialize the "cyber-mockdata-project" GitHub e-commerce website project.
