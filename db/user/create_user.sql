INSERT INTO users (useremail, userfirstname, userlastname) --DOES THIS WORK GIVEN THE CALLS IN THE SERVER???
VALUES ($1, $2, $3)
RETURNING *;
