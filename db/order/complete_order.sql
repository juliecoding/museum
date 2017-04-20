UPDATE orders
SET
  userid = coalesce($2, userid),
  datecompleted = coalesce($3, datecompleted),
  dateshipped = coalesce($4, dateshipped),
  orderamount = coalesce($5, orderamount),
  shipname = coalesce($6, shipname),
  shipaddress = coalesce($7, shipaddress),
  shipaddress2 = coalesce($8, shipaddress2),
  shipcity = coalesce($9, shipcity),
  shipstate = coalesce($10, shipstate),
  shipzip = coalesce($11, shipzip),
  shipcountry = coalesce($12, shipcountry),
  shipemail = coalesce($13, shipemail),
  shipphone = coalesce($14, shipphone)
  -- shipping = coalesce($15, shipping),
  -- tax = coalesce($16, tax)

WHERE orderid = $1
RETURNING *;
