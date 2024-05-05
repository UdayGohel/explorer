<p align="center">
  <h1 align="center">React Github Explorer</h1>
</p>


## Table Of Contents

- [About the Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Developed By](#developed-by)


## About the Project
A React application that allows users to explore trending GitHub repositories. The application features a responsive design, custom data table, search functionality, and sorting functionality.


## Glimps of our Project
![Main Page](https://github.com/UdayGohel/explorer/assets/114012274/1cc6feb3-5043-4e5b-afad-e973bfb3cf4d)
![Repositories Page](https://github.com/UdayGohel/explorer/assets/114012274/cdb0d56f-460c-4d8a-b98e-832ca6853f60)


## Built With

- Frontend: [React](https://reactjs.org/)
- Library:
  - [Tailwind CSS](https://tailwindcss.com/) for general CSS
  - [React-redux](https://react-redux.js.org/) for state management

## Getting Started

### Prerequisites

#### General:

1. **Git:**
   - Make sure Git is installed on your system. You can download it from [here](https://git-scm.com/).

2. **Node.js and npm:**
   - Install npm from [https://nodejs.org/](https://nodejs.org/).
   

#### Frontend:

1. **React:**
   - Ensure you have a basic understanding of React.
   - Documentation: [https://reactjs.org/docs/getting-started.html](https://reactjs.org/docs/getting-started.html)

2. **npm Packages:**
   - Navigate to the `explorer` directory and install dependencies using `npm install`.

### Installation
1. **Clone the Repository:**

    ```bash
    git clone https://github.com/UdayGohel/explorer.git
    ```
2. **Navigate to Project Directory:**

    ```bash
    cd explorer
    ```
3. **Install Dependencies for React JS:**

    ```bash
    npm install
    ```

4. **Run the Application for Front-end:**

    ```bash
    npm start
    ```

## Usage

### Browsing Trending Repositories:

- Discover popular repositories across different programming languages.
### Deep-Dives into Specific Repositories:

- Click on a repository to view its basic details like description, stars, forks, and owner.
### Exploring Top Issues:

- View the top 5 reported issues associated with a repository.

## Features

#### Responsive design:

- The application adjusts its layout to fit different screen sizes
#### Custom data table:

- The application displays trending repositories in a custom data table that allows for sorting and searching
#### Search functionality: 

- Users can search for repositories by name or description or topics.
#### Sorting functionality:

- Users can sort repositories by stars, forks, or updated.
#### Error Handling:

- Displaying user-friendly error messages.
#### Rate Limiting:

- If the Github API has rate limits, implement mechanisms to handle them gracefully.
#### Pagination: 

- Implement pagination to handle a large number of repositories efficiently.
#### Loading State: 

- Show a loading indicator while fetching data to improve user experience.

### Developed By
- [_Uday Gohel_](https://github.com/UdayGohel)
