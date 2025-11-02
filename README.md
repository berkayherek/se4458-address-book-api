# SE4458 - Assignment 2: Address Book API Project

This repository contains the simple Address Book REST API project I prepared for the SE4458 course.

- **Live Swagger Link:** `[NOT YET DEPLOYED - Update this after deployment]`
- **Source Code (GitHub):** `[PASTE YOUR GITHUB REPO LINK HERE]`

---

## Tech Stack & Features

I used **Node.js** and **Express.js** as the framework, and I used **Swagger** to test and document how the API works.

The main features offered by the API are:
* `GET /contacts`: Lists all contacts (or searches).
* `GET /contacts/:id`: Gets a single contact by ID.
* `POST /contacts`: Adds a new contact.
* `PUT /contacts/:id`: Updates an existing contact.
* `DELETE /contacts/:id`: Deletes a contact.

---

## Assumptions and Decisions I Made

1.  I kept the data in a simple `contacts` array in the server's memory (in-memory) instead of a persistent database. Because of this, all added contacts will be lost when the server restarts.
2.  [cite_start]Since the instructions explicitly stated that a frontend (UI) was not needed[cite: 7], I focused all my attention on the API itself and the Swagger documentation.
3.  **Simple Validation:** I added a small validation function to check that the `firstName` and `email` fields are not empty and that the email is in a valid format, ensuring the incoming payload is not incorrect.
4.  **Security:** Since this is an assignment project, I kept the API public. I did not add an API Key, JWT, or any other security layer.

---

## Challenges I Encountered

I was very undecided about whether to add a frontend or not. Afterwards, since it was emphasized that it wasn't specifically required, I decided not to add one.

I also ran into problems with Azure during the deployment phase, so I decided to pivot and use Render instead.