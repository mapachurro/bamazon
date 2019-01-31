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
    allProducts();

    // This function gets the ID of the item being searched for.
    function IDSearch() {
        inquirer
            .prompt({
                name: "itemNo",
                type: "input",
                message: "What is the ID of the item you're looking for?",
            })
            .then(function (answer) {
                itemID = answer;
                // The function then passes this number off to the Amount Inquiry function, and calls that function.
                amtInquiry(itemID);
            })
    }
    // The Amount Inquiry function asks how many of the item the customer wants.
    function amtInquiry(itemID) {
        inquirer
            .prompt({
                name: "itemAmt",
                type: "input",
                message: "How many of the item would you like?",
            })
            .then(function (answer) {
                itemQuantity = answer;
                // Now it takes the item ID and the amount of the item requested and passes it off, to make sure there's
                // enough of the product in stock.
                inventoryCheck(itemID, itemQuantity);
            }
            )
    }

    // This function will allow us to see if there are enough of the item to even purchase them,
    // and give feedback to the customer.
    function inventoryCheck(itemID, itemQuantity) {
        var query = connection.query(
            "SELECT stock_quantity FROM products WHERE item_id = " + itemID.itemNo + ";",
            (function (err, res) {
                curStock = res[0].stock_quantity;
                console.log(curStock);
                if (curStock <= 0) {
                    console.log("Sorry, we're all out! Please select a different product.")
                    IDSearch();
                }
                else if (curStock > itemQuantity.itemAmt) {
                    getTotal(itemID, itemQuantity);
                }
                else if (curStock < itemQuantity.itemAmt){
                    console.log("Sorry, we don't have enough of that product. Please select less than " + curStock)
                    amtInquiry(itemID);
                }
                if (err) throw err;
            })
        )
    }

    function allProducts() {
        var query = connection.query(
            "SELECT * from bamazon.products;",
            (function (err, res) {
                if (err) throw err;
                for (var j = 0; j < res.length; j++){ 
                    id = res[j].item_id;
                    name = res[j].product_name;
                    dept = res[j].department_name;
                    price = res[j].price;
                    stock = res[j].stock_quantity;
                    console.log("\n Item ID: " + id + "\n Product Name: " + name + "\n Department Name: " + dept + "\n Price: " + price + "\n Stock: " + stock );
                  }
                IDSearch();
            })
        )
    }

function getTotal(itemID, itemQuantity){
    var query = connection.query(
        "SELECT price from bamazon.products WHERE item_id = " + itemID.itemNo + ";",
        (function (err, res) {
            if (err) throw err;
            total = (itemQuantity.itemAmt * res[0].price);
            console.log("\n The total price for your order is: " + total);
            update();
        })
    )
}

    function update() {
        var query = connection.query(
            "UPDATE bamazon.products SET stock_quantity = stock_quantity - " + itemQuantity.itemAmt + " WHERE item_id = " + itemID.itemNo + ";",
            (function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " product(s) updated!", );
                console.log("Thanks for shopping!")
                process.exit();

                // Can't figure out how to get inquirer to work properly for this.
                // inquirer
                // .prompt({
                //     name: "buyagain",
                //     type: "confirm",
                //     message: "Your order is complete. Would you like to order again?",
                //     default: "No"
                // })
                // .then(function (answer) {
                //     switch(answer){
                //         case "Yes":
                //         allProducts();
                //         break;
                //         case "No":
                //         console.log("Thanks for shopping!") 
                //         return;
                //         break;
                //         default: 

                //     }
                // })
            })
        )
        
    }

});





