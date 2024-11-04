# nodejs-ts-rnd
The use-case is a company-wide steps leaderboard application for teams of employees: picture that all employees are grouped into teams and issued step counters. This application needs to receive and store step count increments for each team, and calculate sums.

# Steps Leaderboard Application

A simple, pure Node.js and TypeScript application for managing a steps leaderboard among teams of employees. This application allows users to create teams, add or delete members (counters) within each team, record steps for each team member, and retrieve total or individual steps to compare team performance.

## Features

- Create and delete teams
- Add and remove team members (counters)
- Increment steps for individual members
- View total steps per team
- List all teams and compare step counts
- View individual steps for each team member

## Technologies

- Node.js (Pure Node.js server without additional libraries)
- TypeScript for type safety and maintainability

## Installation

### Prerequisites

- Node.js (version 14+ recommended)
- TypeScript globally installed (`npm install -g typescript`)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/mykytapilec/nodejs-ts-rnd.git
   cd nodejs-ts-rnd

2. Install packages:

   ```bash
   npm install

2. Install TypeScript (if not already installed):

   ```bash
   npm install -g typescript

3. Compile TypeScript:

   ```bash
   npx tsc  

4. Start the server:

   ```bash
   node dist/app.js


The server should now be running on http://localhost:3000.

### API Endpoints

1. Create a New Team
URL: /team/create
Method: POST
Body Parameters: { "teamName": "a" }
Success Response: { "message": "Team a created succesfully" }

2. Delete a Team
URL: /team/delete
Method: DELETE
Query Parameters: teamName=a
Success Response: { "message": "Team a deleted successfully" }

3. Add a Member to a Team
URL: /team/addMember
Method: POST
Body Parameters: { "teamName": "a", "memberName": "Alex" }
Success Response: { "message": "Member Alex added to team a" }

4. Delete a Member from a Team
URL: /team/deleteMember
Method: DELETE
Query Parameters: teamName=a&memberName=Alex
Success Response: { "message": "Member Alex deleted from team a" }

5. Increment Steps for a Member
URL: /team/addSteps
Method: POST
Body Parameters: { "teamName": "a", "memberName": "Alex", "steps": 100 }
Success Response: { "message": "Added 100 steps to Alex in a" }

6. Get Total Steps for a Team
URL: /team/totalSteps
Method: GET
Query Parameters: teamName=a
Success Response: { "teamName": "a", "totalSteps": 100 }

7. List All Teams and Their Step Counts
URL: /team/list
Method: GET
Success Response: [
  { "teamName": "a", "steps": 100 }
]

8. List All Members in a Team and Their Steps
URL: /team/members
Method: GET
Query Parameters: teamName=a
Success Response:{
  "teamName": "a",
  "members": [
    { "name": "Alex", "steps": 100 }
  ]
}

### Code Structure
src/models/Team.ts - Manages team and member data storage and operations.
src/controllers/TeamController.ts - Handles business logic for API requests.
src/routes/teamRoutes.ts - Defines and routes API endpoints.
src/app.ts - Initializes the HTTP server and routes incoming requests.

### Validation
For simple validation, Validator.ts utility ensures that team and member names are correctly formatted before processing.

### Testing
To test endpoints manually, you can use curl commands as shown in the API documentation above or tools like Postman.

### Future Enhancements
Add persistent data storage (e.g., database integration)
Add more detailed error handling and status codes
Implement pagination and sorting for larger datasets
Add user authentication for additional security

### License
This project is licensed under the MIT License.


This README provides installation instructions, an overview of features, endpoint details, and structure to help users set up, run, and interact with the application.

