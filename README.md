node-express-mongo-training

# Mongoose basics

# CRUD (NodeJS - Express - Mongoose - Mongo)

# Middleware basics

![Middleware basics](assets/imgs/middleware01.png?raw=true "Middleware basics")

• Middleware are just functions
• Each middleware has access to the request and response objects
• Middleware can end the HTTP request by sending back a response with methods like res.send()
• OR middleware can be chained together, one after another by calling next()

Middleware functions can perform the following tasks:

- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware function in the stack.
- If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

An Express application can use the following types of middleware:

- Application-level middleware
- Router-level middleware
- Error-handling middleware
- Built-in middleware
- Third-party middleware


![Middleware parts](assets/imgs/middleware02.png?raw=true "Middleware parts")


# Handling errors

# Mongo data relationships

# Cookies

# Session and flash

# Authentication