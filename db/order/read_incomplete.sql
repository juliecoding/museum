SELECT * FROM orders
WHERE userid = $1
   AND datecompleted IS NULL;
