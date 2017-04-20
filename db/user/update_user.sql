UPDATE users
SET
  userfirstname = COALESCE($2, userfirstname),
  userlastname = COALESCE($3, userlastname),

  useraddress = COALESCE($4, useraddress),
  useraddress2 = COALESCE($5, useraddress2),
  usercity = COALESCE($6, usercity),
  userstate = COALESCE($7, userstate),
  userzip = COALESCE($8, userzip),
  usercountry = COALESCE($9, usercountry),

  useremail = COALESCE($10, useremail),
  userphone = COALESCE($11, userphone)
WHERE userid = $1
RETURNING *;
