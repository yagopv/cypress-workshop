# Cypress

---

# Installation

If you don't have node installed. 
To check type `node -v` in terminal

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
brew update
brew install node
```

---

# Installation

```bash
mkdir cypress-workshop
cd cypress-workshop
npm init
npm install --save-dev cypress
```

---

## Commands

```bash
npx cypress help
```

## Executing tests with the app

```bash
npx cypress open
```

## Executing tests with the console (headless)

```bash
npx cypress run
```

---

## How a test looks like

```javascript
cy.visit('http://localhost:3000')
  .get('.number-3')
  .click()
  .get('.plus')
  .click()
  .get('.number-3')
  .click()
  .get('.equals')
  .click()
  .get(.result)
  .should('have.text', '7')
```

---

## Features

- Chainable. Certain commands maintains previous subject
- Asynchronous. Intentional like user behavior
- Automatic wait when making expectations

---

## Configuration

```json
{
  "baseUrl": "http://localhost:3000",
  "integrationFolder": "whateverFolderName",
  "viewportWidth": "1200",
  "viewportHeight": "900"
}
```

---

## Scripting

```json
  "scripts": {
    "cy:open": "cypress open",
    "cy:run": "cypress run"
  }
```
---

## Commands

https://docs.cypress.io/api/api/table-of-contents.html

`visit(url)` - Navigate to URL (localhost or internet)
`get(selector)`- Use CSS selectors to get DOM nodes
`contains(selector)`- Use selectors, strings, regex to get DOM nodes
`type(string)` - Write on input fields
`click()` - Click on DOM nodes retrieved with get or contains commands

---

## Assertions

https://docs.cypress.io/es/guides/references/assertions.html

--- 

# Demo: Login with Cypress

--- 

# TODO: Register with Cypress

- Navigate to /register
- Select and fill fields
- Select button and click

---

## Debug tests

`add debugger` - As most of the commands are async we can set a breakpoint in out tests
`debug()` - Set a debugger and log what the previous command yields
`pause()` - Pause execution

--- 

## Fake data

We have a problem in registration with the repeated mails

- We can delete the account and re-test
- We can add random mails
  - chance (Jon ❤️)
  - test-data-bot
  - ...

---

## Install chance (or any package)

```bash
npm install chance
```

---

## Generate random users

[https://chancejs.com/web/email.html](https://chancejs.com/web/email.html)

```javascript
const ch = new Chance();
ch.email()
```
---

## Custom commands

```javascript
Cypress.Commands.add('typeIn', (selector, text) => {
  cy.get(selector).type(text);
});

Cypress.Commands.add('loginWithUI', (email, password) => {
  cy.visit('/login')
    .typeIn('#email', email)
    .typeIn('#password', password)
    .clickOn('.btn');
});
```

---

## Fake server

```javascript
cy.server();

cy.route({
  method: 'POST',
  url: '**/auth',
  response: {},
  status: 401,
});
```

---

## Doing requests to the server

```javascript
cy.request({
  method: 'POST',
  url: `${Cypress.env('backendUrl')}/users`,
  body: {
    name: 'Test User',
    email: ch.email(),
    password: 'Mobgen12345',
  },
}).then((response) => (createdUser = response.body));
```    

---

## Hooks

```javascript
  before(() => {
    // runs once before all tests in the block
  })
  beforeEach(() => {
    // runs before each test in the block
  })
  afterEach(() => {
    // runs after each test in the block
  })
  after(() => {
    // runs once after all tests in the block
  })
```

---

## Screenshots and Videos

Cypress has the ability to record videos and take screenshots

It automatically happen when running the tests with the `run` command