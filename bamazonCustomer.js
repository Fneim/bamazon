var inquirer = require("inquirer");
var mysql = require("mysql");
var fs = require("fs");
require("console.table");

var connection = mysql.createConnection({
  host:"localhost",
  port:3306,
  user:"root",
  password:"@NeimPrince13",
  database:"bamazon"
});

//display products' id's, names, and prices
showItems();

function showItems(){
  var items = [];
  console.log("\nON SALE");
  var query = connection.query("SELECT item_id, product_name, price FROM products", function(err,res){
    if(err) throw err;
    console.log("");
    console.table(res);
    //push item_ids into array
    for(var i = 0; i < res.length; i++){
      items.push(res[i].item_id);
    }
    //pass array as a parameter
    addToCart(items);
  })
}

//allow user to select item and quantity
function addToCart(items) {
  inquirer.prompt([
    {
      name:"item_id",
      message:"SELECT ITEM_ID TO ADD ITEM TO CART?"
    },
    {
      name:"quantity",
      message:"Quantity?"
    }
  ]).then(function(response){
    var item = response.item_id;
    var quantity = response.quantity;

    //check if user's selected id compares to value in array
    //if yes pass user item and quantity to purchase
    if(items.indexOf(item)){
      purchase(item, quantity);
    }
  })
}

//check stock quantity
function purchase(item, quantity) {
    var query = connection.query(
      "SELECT stock_quantity FROM products WHERE ?",
      {
        item_id:item
      },
      function(err, res) {
        var stock_quantity = res[0].stock_quantity;
        if(stock_quantity < quantity || stock_quantity == null) {
          console.log("Insufficient quantity!");
          continueShopping();
        } else {
          var newQuantity = stock_quantity - quantity;
          updateStock(newQuantity, quantity, item);
        }
    }
  );
}

//if stock_quantity insufficient, prompt customer to continue shopping
function continueShopping(){
  inquirer.prompt([
    {
      type:"confirm",
      name:"shop",
      message:"Continue shopping?(y/n)",
      default:true
    }
  ]).then(function(response){
    if(response.shop){
      showItems();
    }
  })
}

//if stock_quantity sufficient, update quantity in storage
function updateStock(newQuantity, quantity, item) {
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
      [
        {
        stock_quantity:newQuantity
      },
      {
        item_id:item
      }
    ],
      function(err, res) {
        console.log("You purchased "+ quantity+ " items");
    }
  );
}
