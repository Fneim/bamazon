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

menu();

function menu() {
  inquirer.prompt([
    {
      type:"list",
      name:"option",
      message: "MENU",
      choices:["View Products On Sale", "View Low Inventory",
      "Add to Inventory", "Add New Product"]
    }
  ]).then(function(response){
    var option = response.option;
    switch(option){
      case "View Products On Sale":
        console.log("works");
        viewProducts();
        break;
      case "View Low Inventory":
        console.log("also works");
        lowInventory();
        break;
      case "Add to Inventory":
        console.log("this too works");
        addToInventory();
        break;
      case "Add New Product":
        console.log("awesome");
        addProduct();
        break;
      default:
      console.log("nothing");
    }
  });
}
var items = [];

function viewProducts() {
  console.log("\nPRODUCTS ON SALE");
  var query = connection.query("SELECT * FROM products", function(err,res){
    if(err) throw err;
    console.log("");
    console.table(res);
    //push item_ids into array
    for(var i = 0; i < res.length; i++){
      items.push(res[i].item_id);
    }
  })
}

function lowInventory() {
  var lowInventory = [];
  console.log("\nON SALE");
  var query = connection.query("SELECT * FROM products", function(err,res){
    if(err) throw err;
    console.log("");
    for(var i = 0; i < res.length; i++){
      if(res[i].stock_quantity < 5) {
        items.push({
          id: res[i].item_id,
          name: res[i].product_name,
          department: res[i].department_name,
          price: res[i].price,
          quantity: res[i].stock_quantity
        });
      }
    }
    console.table(items);
  })
}

function addToInventory() {
  connection.query("SELECT * FROM products", function(err, res){
    console.log("");
    for(var i = 0; i < res.length; i++){
      if(res[i].stock_quantity < 5) {
        items.push({
          id: res[i].item_id,
          name: res[i].product_name,
          department: res[i].department_name,
          price: res[i].price,
          quantity: res[i].stock_quantity
        });
      }
    }
    console.table(items);
    inquirer.prompt([
      {
        name:"product",
        message:"Enter Item_ID: ",
      },
      {
        name:"quantity",
        message:"Enter Quantity to Add: "
      }.then(function(response){
        
      })
    ])
    })
  })
}

function addProduct() {
  console.log("ADD NEW PRODUCT");
  inquirer.prompt([
    {
      name:"product",
      message:"Post a new item \n Item Name: ",
    },
    {
      name:"department",
      message:"Department",
      choices:["Apparel", "Electronics", "Toys", "Collectibles",
      "Apps & Games", "Books & Comics", "Appliances"]
    },
    {
      name:"price",
      message: "Set Price: "
    },
    {
      name:"quantity",
      message: "Set Quantity: "
    }
  ]).then(function(response){
    connection.query(
      "INSERT INTO products SET ?",
      {
        product_name: response.product,
        department_name: response.department,
        price: response.price,
        stock_quantity: response.quantity
      },
      function(err, res){
        if(err) throw err;
        console.log(res.affectedRows + " items inserted\n");
      }
    );
  })
}
