UPDATE incart
SET
  qty = $2
WHERE id = $1
RETURNING *;
