use bamazon;

create table products(
item_id integer(10) auto_increment not null,
product_name varchar(50) not null,
department_name varchar(30), 
price decimal(10,2),
stock_quantity integer(10),
primary key(item_id));

select * from products;

insert into products(product_name, department_name, price, stock_quantity)
values("The Elder Wand", "Collectibles", 7.00, 78), 
("Nissian 180 ZX Hotwheel", "Toys", 2.89, 36),
("O2COOL Portable Fan", "Appliances", 57.60, 120), 
("Uhcharted 5 The Last Legacy", "Apps and Games", 39.00, 78),
("Minecraft", "Apps and Games", 6.99, 45), 
("The Alchemist", "Books & Comics", 15.45, 350), 
("Invincible Iron Man Vol 1:Reboot", "Books & Comics", 12.99, 4), 
("IPhone X", "Electronics", 999.99, 458), 
("Wacom Drawing Tablet", "Electronics", 145.99, 132),
("5 Pack Dish Towels", "Appliances", 3.99, 760),
("Ugly Sweater", "Apparel", 23.80, 231);

update products 
set stock_quantity = 10
where item_id = 7;