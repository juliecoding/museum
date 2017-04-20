CREATE TABLE IF NOT EXISTS products (
    productid SERIAL PRIMARY KEY,
    name VARCHAR(200),
    price FLOAT,
    description VARCHAR(3000),
    image1 VARCHAR(2000),
    image2 VARCHAR(2000),
    image3 VARCHAR(2000),
    stock INTEGER,
    category VARCHAR(10),
    productrating FLOAT
);


CREATE TABLE IF NOT EXISTS users (
    userId SERIAL PRIMARY KEY,
    useremail varChar(500),
    userpassword VARCHAR(200),
    userfirstname VARCHAR(200),
    userlastname VARCHAR(200),
    usercity VARCHAR(200),
    userstate VARCHAR(200),
    userzip VARCHAR(200),
    userphone VARCHAR(200),
    useraddress VARCHAR(200),
    useraddress2 VARCHAR(200),
    usercountry VARCHAR(200),
    userregistrationdate TIMESTAMP
);


CREATE TABLE IF NOT EXISTS orders (
    orderid SERIAL PRIMARY KEY,
    userid INTEGER REFERENCES users(userid),
    orderamount float,
    shipname varChar(200),
    shipaddress varChar(500),
    shipaddress2 varChar(200),
    shipcity varChar(200),
    shipstate varChar(200),
    shipzip varChar(200),
    shipcountry varChar(200),
    shipemail varChar(500),
    shipphone varChar(200),
    shipping FLOAT,
    tax FLOAT,
    ordership BOOLEAN,  				--TIMESTAMP
    trackingnumber INTEGER,
    ordercompleted BOOLEAN,				--TIMESTAMP
    datecompleted TIMESTAMP,
    dateshipped TIMESTAMP
);


CREATE TABLE IF NOT EXISTS incart (	     --STEPHEN CALLS THIS products_in_order
    incartid SERIAL PRIMARY KEY,
    orderid INTEGER REFERENCES orders(orderid),
    productid INTEGER REFERENCES products(productid),
    qty INTEGER
);
