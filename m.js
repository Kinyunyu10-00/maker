
// <script>
//     const data = [
//         date: 23/03/2000, cartegory: "food",price:"tsh.400" },
//         date: 23/04/2000, cartegory: "transport",price:"tsh.450" }
        
//     ];

//     const table = document.getElementById("dataTable");

//     data.forEach(item => {
//         let row = table.insertRow();
//         let cell1 = row.insertCell(0);
//         let cell2 = row.insertCell(1);
//         cell1.innerHTML = item.name;
//         cell2.innerHTML = item.age;
//     });
// </script>
document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector("button");
    
    button.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form submission

        // Get input values
        let date = document.querySelector("input[type='date']").value;
        let category = document.querySelector("input[placeholder='category']").value;
        let price = document.querySelector("input[placeholder='price']").value;

        // Validate inputs
        if (date.trim() === "" || category.trim() === "" || price.trim() === "") {
            alert("Please fill in all fields!");
            return;
        }

        // Select table and create a new row
        let table = document.querySelector("table");
        let newRow = table.insertRow(-1);

        // Insert cells and fill them with input values
        let dateCell = newRow.insertCell(0);
        let categoryCell = newRow.insertCell(1);
        let priceCell = newRow.insertCell(2);

        dateCell.textContent = date;
        categoryCell.textContent = category;
        priceCell.textContent = `Tsh. ${price}`;

        // Clear input fields after adding
        document.querySelector("input[type='date']").value = "";
        document.querySelector("input[placeholder='category']").value = "";
        document.querySelector("input[placeholder='price']").value = "";
    });
});



//backend
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MySQL Database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Change if you have a MySQL password
    database: "ben"
});

db.connect(err => {
    if (err) {
        console.error("Database Connection Failed:", err);
    } else {
        console.log("Connected to MySQL Database!");
    }
});

// API Route to Insert Expense
app.post("/add-expense", (req, res) => {
    const { date, category, price } = req.body;
    
    if (!date || !category || !price) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    const sql = "INSERT INTO expense (date, category, price) VALUES (?, ?, ?)";
    db.query(sql, [date, category, price], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Expense added successfully!" });
    });
});

// API Route to Get Expenses
app.get("/get-expenses", (req, res) => {
    const sql = "SELECT * FROM expense";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});

// Start the Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
