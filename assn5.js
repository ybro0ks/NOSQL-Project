const { MongoClient, ObjectId } = require('mongodb');
const http = require('http');
const readline = require('readline');

const ATLAS_URI = "";
const client = new MongoClient(ATLAS_URI);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db("lab5"); // return the database instance
    } catch (error) {
        console.error('MongoDB failed to connect', error);
        process.exit(1);
    }
}

const server = http.createServer((request, response) => {
    response.writeHead(404);
    response.end('Path not found.');
});
const port = 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
// multiple functions exist in my code, first how to create a new user, retrieve, update and delete there information

async function createCustomer() {
    const db = await connectToDatabase();
    const collection = db.collection("personalInfo");
    let userInputArray = [];
    const questions = ["Enter your title: ", "Enter your first name: ", "Enter your surname: ", "Enter your mobile: ", "Enter your email: "];

    for (let i = 0; i < questions.length; i++) {
        const input = await new Promise(resolve => rl.question(questions[i], resolve));
        if (input.toLowerCase() === 'done') {
            console.log("User opted to terminate input early.");
            rl.close();
            return;
        }
        userInputArray.push(input);
    }

    try {
        const result = await collection.insertOne({
            "_title(s)": userInputArray[0],
            "First_Name(s)": userInputArray[1],
            "Surname": userInputArray[2],
            "Mobile": userInputArray[3],
            "Email": userInputArray[4]
        });
        console.log(`Document inserted with id: ${result.insertedId}`);
        await addAddress(collection, result.insertedId);
    } catch (error) {
        console.error('Failed to insert data:', error);
    } finally {
        rl.close();
    }
}

async function addAddress(collection, userId) {
    let addressArray = [];
    const addressQuestions = ["Enter Address 1: ", "Enter Address 2(optional): ", "Enter Town Name: ", "County/City: ", "Eircode: "];

    for (let i = 0; i < addressQuestions.length; i++) {
        const input = await new Promise(resolve => rl.question(addressQuestions[i], resolve));
        addressArray.push(input);
    }

    try {
        const updateDocument = {
            $set: {
                "Address": {
                    Address1: addressArray[0],
                    Address2: addressArray[1],
                    Town: addressArray[2],
                    County: addressArray[3],
                    Eircode: addressArray[4]
                }
            }
        };
        await collection.updateOne({ _id: new ObjectId(userId) }, updateDocument);
        console.log('Address updated successfully.');
    } catch (error) {
        console.error('Failed to update address:', error);
    }
}
// this code retrieves information
async function findCustomer(){
    const db = await connectToDatabase();
console.log("Enter the user name");
let userArray = [] ;
const questions = ["User first name? ", "User last name? "];
for (let i = 0; i < questions.length; i++) {
    const input = await new Promise(resolve => rl.question(questions[i], resolve));
    if (input.toLowerCase() === 'done') {
        console.log("User opted to terminate input early.");
        rl.close();
        return;
    }
    userArray.push(input);
}
const collection = db.collection('personalInfo');
const query = { "First_Name(s)": userArray[0] , "Surname" : userArray[1]};
const documents = await collection.find(query).toArray();
documents.forEach((document) => {
    console.log("Document Details:");
    printObject(document);
    console.log("");
});

function printObject(obj, indent = '') {
    Object.keys(obj).forEach(key => {
        if (obj[key] !== null && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            //address cann be seen as encrypted so i dont want to print it
        } else {
            console.log(`${indent}${key}: ${obj[key]}`);
        }
    });
}
}

async function deleteCustomer() {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('personalInfo');
        const filter = { Surname: "Lucky" };  // Correctly format "Lucky" as a string
        const updateDocument = {
            $set: {
                Phone: 891823423,
                Email: "slucky@gmail.com",  
                "_title(s)": "Mrs",  
                Address1: "13 Keadue Lane"  
            }
        };
        const result = await collection.updateOne(filter, updateDocument);  // Corrected usage of 'await'
        if (result.modifiedCount === 0) {
            console.log("No documents matched the filter, or none were modified.");
        } else {
            console.log("Document updated successfully.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}
async function updateCustomer() {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('personalInfo');
        const filter = { Surname: "Lucky" };  // Correctly format "Lucky" as a string
        const updateDocument = {
            $set: {
                Phone: 891823423,
                Email: "slucky@gmail.com",  
                "_title(s)": "Mrs",  
                Address1: "13 Keadue Lane"  
            }
        };
        const result = await collection.updateOne(filter, updateDocument);  // Corrected usage of 'await'
        if (result.modifiedCount === 0) {
            console.log("No documents matched the filter, or none were modified.");
        } else {
            console.log("Document updated successfully.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

//this code works on the phone database and adds phones to it, manufacturer names etc.


async function newPhone() {
    const db = await connectToDatabase();
    const collection = db.collection("MobilePhones");
    let userInputArray = [];
    const questions = ["Enter Manufacturer Name: ", "Enter Model Name: ", "Enter Price: ", "Enter identification Number: "];

    for (let i = 0; i < questions.length; i++) {
        const input = await new Promise(resolve => rl.question(questions[i], resolve));
        if (input.toLowerCase() === 'done') {
            console.log("User opted to terminate input early.");
            rl.close();
            return;
        }
        userInputArray.push(input);
    }

    try {
        const result = await collection.insertOne({
           "Manufacturer": userInputArray[0],
           "Model": userInputArray[1],
           "Price(£)": userInputArray[2],
           "Number": userInputArray[3]
        });
        console.log(`Document inserted with id: ${result.insertedId}`);
    } catch (error) {
        console.error('Failed to insert data:', error);
    } finally {
        rl.close();
    }
}

async function deletePhone(){
    const db = await connectToDatabase();
    const collection = db.collection('MobilePhones');
    let userArray = [] ;
    const questions = ["Phones Model Name? "];
    for (let i = 0; i < questions.length; i++) {
        const input = await new Promise(resolve => rl.question(questions[i], resolve));
        if (input.toLowerCase() === 'done') {
            console.log("User opted to terminate input early.");
            rl.close();
            return;
        }
        userArray.push(input);
    }
   
    const query = { "Model": userArray[0]};

    const result = await collection.deleteOne(query);
    if (result.deletedCount === 0) {
        console.log("Phone Not found or Could Not be deleted");
    } else {
        console.log("Phone successfully deleted.");
    }
}

async function updatePhone(){
    try {
        const db = await connectToDatabase();
        const collection = db.collection('MobilePhones');
        const filter = { Model : "Samsung Galaxy S22 Ultra" };  // Correctly format "Lucky" as a string
        const updateDocument = {
            $set: {
              " Price(£)" : 2000
            }
        };
        const result = await collection.updateOne(filter, updateDocument);  // Corrected usage of 'await'
        if (result.modifiedCount === 0) {
            console.log("No documents matched the filter, or none were modified.");
        } else {
            console.log("Document updated successfully.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}
async function retrievePhone(){

    let userInputArray = [];
    const questions = ["Enter Phone Identification Number: "];

    for (let i = 0; i < questions.length; i++) {
        const input = await new Promise(resolve => rl.question(questions[i], resolve));
        if (input.toLowerCase() === 'done') {
            console.log("User opted to terminate input early.");
            rl.close();
            return;
        }
        userInputArray.push(input);
    }
    console.log(findPurchasedItem(userInputArray))
}



// functions for the creation, retrieval and deleting of purchase

async function phoneOrder(db, userId) {
    const collection = db.collection('MobilePhones');
    const phones = await collection.find({}).toArray();
    console.log("Available phones:");
    phones.forEach((phone, index) => console.log(`${index + 1}. ${phone.Model} - Price: £${phone["Price(£)"]}`));

    let phonePurchases = [];
    const processInput = async (index) => {
        rl.question(`Enter phone number ${index + 1} or type 'done' to finish: `, async (input) => {
            if (input.toLowerCase() === 'done') {
                console.log("Purchase Completed.");
                if (phonePurchases.length > 0) {
                    await enterPurchased(db, userId, phonePurchases);
                }
                rl.close();
                client.close(); // Closing MongoDB connection
                return;
            }
            const phoneIndex = parseInt(input) - 1;
            if (phoneIndex >= 0 && phoneIndex < phones.length) {
                phonePurchases.push(phones[phoneIndex]);
                console.log(`Added: ${phones[phoneIndex].Model} to your cart.`);
            } else {
                console.log("Invalid selection, please try again.");
            }
            processInput(index + 1); // Recursive call to get the next input
        });
    };

    processInput(0); // Start the process
}

async function enterPurchased(db, userId, phoneArray) {
    const collection = db.collection("Purchases");
    try {
        const result = await collection.insertOne({
            userId: (userId),
            itemsPurchased: phoneArray.map(phone => ({
                model: phone.Model,
                price: phone["Price(£)"]
            }))
        });
        console.log(`Purchase document inserted with id: ${result.insertedId}`);
    } catch (error) {
        console.error('Failed to insert purchase data:', error);
    }
}
async function retrievePhone(){

    let userInputArray = [];
    const questions = ["Enter Phone Identification Number: "];

    for (let i = 0; i < questions.length; i++) {
        const input = await new Promise(resolve => rl.question(questions[i], resolve));
        if (input.toLowerCase() === 'done') {
            console.log("User opted to terminate input early.");
            rl.close();
            return;
        }
        userInputArray.push(input);
    }
    console.log(findPurchasedItem(userInputArray))
}

async function findPurchasedItem(number) {
    const db = await connectToDatabase();
    const collection = db.collection('MobilePhones');
    const query = { Number : number }; 
    return collection.findOne(query);
}

async function enterPurchased(db, userId, phoneArray) {
    const collection = db.collection("Purchases");
    try {
        const result = await collection.insertOne({
            userId: (userId),
            itemsPurchased: phoneArray.map(phone => ({
                model: phone.Model,
                price: phone["Price(£)"]
            }))
        });
        console.log(`Purchase document inserted with id: ${result.insertedId}`);
    } catch (error) {
        console.error('Failed to insert purchase data:', error);
    }
}

async function retrieveOrder(){

    let userArray = [] ;
    const questions = ["User first name? ", "User last name? "];
    for (let i = 0; i < questions.length; i++) {
        const input = await new Promise(resolve => rl.question(questions[i], resolve));
        if (input.toLowerCase() === 'done') {
            console.log("User opted to terminate input early.");
            rl.close();
            return;
        }
        userArray.push(input);
    }

    await findID(db, userArray[0], userArray[1]); 


async function findID(db, firstName, Surname) {
    const collection = db.collection('personalInfo');
    const query = { "First_Name(s)": firstName , "Surname" : Surname};
    const documents = await collection.find(query).toArray();
    if(documents.length > 0){
        const ids = documents.map(doc => doc._id.toString());
        console.log("Searching for all orders of "+ firstName);
        await printOrder(db, ids);
    } else {
        console.log("No user found with the name:", firstName);
    }
}

async function printOrder(db, userIds) {
    const collection = db.collection("Purchases");
    const query = { userId: { $in: userIds } };
    const orders = await collection.find(query).toArray();

    if (orders.length > 0) {
        console.log("Orders found:");
        orders.forEach(order => {
            console.log(order); 
        });
    } else {
        console.log("No orders found for the given users.");
    }
}
}


async function deleteOrders() {
    const db = await connectToDatabase();
    const collection = db.collection('Purchases');  // Adjust the collection name as needed

    rl.question('Please enter the user ID to delete orders: ', async (userId) => {
        const query = { userId: userId };
        try {
            const result = await collection.deleteMany(query);

            if (result.deletedCount === 0) {
                console.log("No orders found for the user ID, or none were deleted.");
            } else {
                console.log(`Successfully deleted ${result.deletedCount} orders.`);
            }
        } catch (error) {
            console.error("An error occurred while deleting orders:", error);
        } finally {
            rl.close(); 
        }
    });

}
