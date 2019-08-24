SELECT email, password
FROM users
WHERE email IS $1 AND password IS $2;


