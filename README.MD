Project Overview: Online Mobile Phone Store Database System
This project involves the development of a database solution for an online mobile phone store. The focus is on backend functionality using a MongoDB database to manage personal details, item details, and order details.

Key Features
Personal Details Management

Store customer information such as Title, First Name(s), Surname, Mobile*, and Email Address*.
Address details include both home and shipping addresses with required fields: Address Line 1*, Town*, County/City*, and EIRCODE.
Item Details Management

Maintain details for mobile phones sold by the store, including Manufacturer*, Model*, and Price*.
Includes a selection of up to 10 phone items.
Order Details Management

Records customer purchases which can include multiple items per order and multiple orders per customer.
Enables tracking of item purchasers through query functionality.
The "back-end" application provides CRUD operations for customers, items, and orders within a MongoDB database.

Implementation Details
CRUD Operations
Create: Insert new customer, item, and order records into the database with methods like insertCustomer(details).
Retrieve: Find and output customer details using methods such as findCustomer(details).
Update: Modify customer and address information using methods like updateCustomer(details).
Delete: Remove customer records with specified criteria using methods like deleteCustomer(details).
