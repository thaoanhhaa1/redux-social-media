# Social Media

## Description

Social Media is a multi-functional social media platform designed to connect users globally. Our goal is to create an online space where people can share ideas, images, videos, and interact with each other through posts, comments.

## Content

-   [Social Media](#social-media)
    -   [Description](#description)
    -   [Content](#content)
    -   [Installation](#installation)
        -   [System Requirements](#system-requirements)
        -   [Installation Steps](#installation-steps)
    -   [Features](#features)
    -   [Tech Stack](#tech-stack)
    -   [Example API](#example-api)
    -   [Contributing](#contributing)
    -   [License](#license)
    -   [Authors and contributors](#authors-and-contributors)
    -   [Contact](#contact)

## Installation

### System Requirements

-   Node.js >= 14.x
-   MongoDB >= 6.x
-   npm >= 6.x

### Installation Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/thaoanhhaa1/redux-social-media.git
    ```
2. Move to the project directory:

    ```bash
    cd social-media-platform
    ```

3. Move to the backend and frontend directory:

    ```bash
    cd backend
    ```

    ```bash
    cd frontend
    ```

4. Install the dependencies for the backend and frontend:
    ```bash
    npm install
    ```
5. Create a `.env` file from the `.env.example` file and update the environment variables.

6. Start the backend server:

    ```bash
    npm start
    ```

    Note: The backend part can be run using docker

Install run the backend using docker:

1. Move to the backend directory:

    ```bash
    cd backend
    ```

2. Build docker image

    ```bash
    docker build -t social-media-backend .
    ```

3. Run the docker image
    ```bash
    docker run -d -p 8080:8080 social-media-backend
    ```

## Features

-   Register a new user account.
-   Login and update your profile.
-   Start sharing posts, images, and videos on your wall.
-   Interact with other people's posts by liking, commenting.
-   Follow and unfollow other users.
-   Notifications for new likes, comments, and followers.
-   Notifications for birthdays.

## Tech Stack

![Node.js](https://img.shields.io/badge/-Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/-Express.js-000000?style=flat-square&logo=express&logoColor=white)
![Axios](https://img.shields.io/badge/-Axios-61DAFB?style=flat-square&logo=axios&logoColor=white)
![Bcrypt](https://img.shields.io/badge/-Bcrypt-61DAFB?style=flat-square&logo=bcrypt&logoColor=white)
![JWT](https://img.shields.io/badge/-JWT-61DAFB?style=flat-square&logo=jwt&logoColor=white)
![Node cron](https://img.shields.io/badge/-Node%20cron-61DAFB?style=flat-square&logo=node-cron&logoColor=white)
![Socket.io](https://img.shields.io/badge/-Socket.io-61DAFB?style=flat-square&logo=socket.io&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-61DAFB?style=flat-square&logo=swagger&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=white)
![Redux](https://img.shields.io/badge/-Redux-764ABC?style=flat-square&logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/-Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=white)
![React hook form](https://img.shields.io/badge/-React%20hook%20form-61DAFB?style=flat-square&logo=react-hook-form&logoColor=white)
![Swiper](https://img.shields.io/badge/-Swiper-6332F6?style=flat-square&logo=swiper&logoColor=white)
![Koyeb](https://img.shields.io/badge/-Koyeb-FFA500?style=flat-square&logo=koyeb&logoColor=white)
![Vercel](https://img.shields.io/badge/-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/-GitHub%20Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white)

## Example API

-   [Swagger](https://panicky-maren-social-media-6f7e13fb.koyeb.app/api/swagger)

## Contributing

We welcome contributions from the community. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Authors and contributors

-   [Hà Anh Thảo](https://github.com/thaoanhhaa1)

## Contact

If you have any questions, please feel free to contact us via email: anhthaodev@gmail.com
