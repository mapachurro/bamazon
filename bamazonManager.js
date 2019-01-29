var mysql = require("mysql");
var inquirer = require("inquirer");
var itemID;
var itemQuantity;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Man0Negra",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;


function managerQuery(){
    inquirer
    .prompt({
        type: "checkbox",
        name: "managerChoices",
        message: "Hello Manager. What would you like to do?",
        choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product", ],
    })
    .then(function (answer){
        switch(answer){
            case "View Products": 
            var query = connection.query(
                "SELECT * FROM products;",
                (function (err, res) {
                    if (err) throw err;
                    console.log("\n Item ID: " + res.itemID + "\n Product Name: " + res.product_name + "\n Department Name: " + res.department_name + "\n Price: " + res.price + "\n Stock Quantity: " + res.stock_quantity);
                    IDSearch();
                })
            )
            break;
            case "View Low Inventory":

            break;
            case "Add to Inventory":

            break;
            case "Add New Product":

            break;
            default:
            console.log("Try something else.")
            var query = connection.query(
                "SELECT * FROM bamazon.products;",
                (function (err, res) {
                    if (err) throw err;
                    console.log("\n Item ID: " + res.itemID + "\n Product Name: " + res.product_name + "\n Department Name: " + res.department_name + "\n Price: " + res.price + "\n Stock Quantity: " + res.stock_quantity);
                })
            )
        }
    })
}






managerQuery();

// End of connection function
});