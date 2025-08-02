# Online Mobile Phone Store Database System

## Project Overview

This project involves the development of a backend database solution for an online mobile phone store. It uses MongoDB to manage customer information, item details, and order history.

---

## Key Features

### Personal Details Management
- Stores customer information:
  - `Title`
  - `First Name(s)`
  - `Surname`
  - `Mobile` *(required)*
  - `Email Address` *(required)*
- Address management:
  - Home and shipping addresses
  - Required fields: 
    - `Address Line 1`*
    - `Town`*
    - `County/City`*
    - `EIRCODE`*

### Item Details Management
- Manages mobile phone inventory:
  - `Manufacturer` *(required)*
  - `Model` *(required)*
  - `Price` *(required)*
- Includes a catalog of up to 10 phone items

### Order Details Management
- Records purchases:
  - Multiple items per order
  - Multiple orders per customer
- Enables tracking of item purchasers via query operations

---

## Backend Functionality

The backend provides full **CRUD** operations for managing:
- Customers
- Items
- Orders

---

## CRUD Operations

- **Create**  
  Insert new records using methods like:  
  `insertCustomer(details)`

- **Retrieve**  
  Find and display records with methods such as:  
  `findCustomer(details)`

- **Update**  
  Modify customer/address info using:  
  `updateCustomer(details)`

- **Delete**  
  Remove records with specified criteria via:  
  `deleteCustomer(details)`

---

## Technologies Used

- **Database:** MongoDB
- **Language:** JavaScript (Node.js)
- **Libraries:** Mongoose (ODM)

---

## Getting Started

1. Clone the repository
2. Run `npm install`
3. Configure MongoDB URI in `.env`
4. Start the server: `npm start`
