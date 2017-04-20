INSERT INTO orders (userid)
VALUES ($1)
RETURNING *;
