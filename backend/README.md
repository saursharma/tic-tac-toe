Here are the curl commands to call the registration and login APIs:

Registration API:

curl -X POST -H "Content-Type: application/json" -d '{"username":"your_username","password":"your_password"}' http://localhost:4000/register

Replace "your_username" with the desired username and "your_password" with the desired password.

Login API:

curl -X POST -H "Content-Type: application/json" -d '{"username":"your_username","password":"your_password"}' http://localhost:4000/login

Replace "your_username" with the registered username and "your_password" with the corresponding password.