SELECT * FROM products
JOIN incart
ON products.productid = incart.productid
WHERE incart.orderid = $1
