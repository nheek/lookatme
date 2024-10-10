# LookAtMe

![LookAtMe front page](https://www.nheek.com/featured-projects/lookatme.png)

LookAtMe is my first attempt at making a Socket.IO web application. It has given me a lot of new ways to think about how to make a code scalable. The real-time feature of LookAtMe will also build upon my future projects such as real-time messaging applications and so.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
- [Usage](#usage)
- [Deployment](#deployment)
- [Built With](#built-with)
- [ToDo](#todo)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Getting Started <a name="getting-started"></a>

Just follow the steps below and you should be good to go.

### Prerequisites <a name="prerequisites"></a>

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (usually comes with Node.js installation)

### Installation <a name="installation"></a>

1. Clone the repository:

   ```bash
   git clone https://github.com/nheek/lookatme.git your-project
   ```

2. Change into the project directory:

   ```bash
   cd your-project
   ```

### Development <a name="development"></a>

Run the development server using [nodemon](https://nodemon.io/):

```bash
npm run dev
```

### Usage <a name="usage"></a>

Click the button and see the total clicked count update in almost real-time. It also logs the amount of people currently watching the page and the overall views. A simple yet intuitive way to learn about Socket.IO.

### Deployment <a name="deployment"></a>

Deploy using your preferred deployment method.

### Built With <a name="built-with"></a>

- [ExpressJS](https://expressjs.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Socket.IO](https://socket.io/)
- [MySQL](https://www.mysql.com/)

### ToDo <a name="todo"></a>

- [ ] SQL file in source code
- [ ] Make it really real-time, right now there's a one second delay to prevent database overloading
- [ ] Statistics page where users can see historical data like daily clicks/views

### Contributing <a name="contributing"></a>

If you'd like to contribute, please fork the repository and create a pull request. Issues and feature requests are welcome!

### License <a name="license"></a>

This project is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) - see the LICENSE file for details.

### Acknowledgments <a name="acknowledgments"></a>

Special thanks to everyone who had indirect contributions to this project through the inclusion of their works which are specially mentioned in the source code.
