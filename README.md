
# Travellers from submission

Form to request for a travel



## Live

https://travelopia-form-submission.vercel.app/

## Tech Stack

- HTML, CSS, NextJs 


## Running Instructions

- Clone the repo

````bash
    git clone https://github.com/Arun-ez/travelopia_form_submission.git
````

- Install Dependencies

````bash
    npm i
````

- Configure Enviornment Variables (in .env file)

````bash
    MONGO_URI = < your MongoDB connection string local/atlas >
````

- Start Development Server

````bash
    npm run dev
````

## Testing Instructions

- Start Testing with Cypress (Make sure PORT 3000 is not acquired by other tasks)

````bash
    npm run test
````

- Wait for the cypress window to open and select E2E Testing then choose your browser
- Run form.specs.cy.js
## API Reference

#### Get all travellers data

```http
  GET /api/travellers
```

#### Get Sorted Data based on Budget

```http
  GET /api/travellers?sort=budget&order=asc
  GET /api/travellers?sort=budget&order=dsc
```

#### Post Data

```http
  POST /api/travellers
```
| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `body`| `json` | **request body** should have the properties { name, email, place, persons, budget } |


#### Delete Data by id

```http
  DELETE /api/travellers/${id}
```


## Support

For support, email arunshaw433@gmail.com