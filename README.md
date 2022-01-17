node-express-mongo-training



# Mongoose basics

Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

## Connection to the database

```js
// getting-started.js
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/test");
}
```

## Basic Schema

```js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  price: {
    type: Number,
    min: [0, "EL PRECIO DEBE SER POSITIVO"],
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  categories: [String],
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
  size: {
    type: String,
    enum: ["S", "M", "L"],
  },
});
```

## Basic Model Creation

```js
const Person = mongoose.model("Person", personSchema);
```

## Methods

### Instance

```js
//Declaration
productSchema.methods.toggleOnSale = function () {
  //this --> refers to the instance
  this.onSale = !this.onSale;
  return this.save();
};

//Execution

const findProduct = async () => {
  const productFound = await Product.findOne({ name: "Super Bike 100" });
  await productFound.toggleOnSale();
  console.log(productFound);
};
```

### Static

```js
//Declaration

productSchema.statics.fireSale = function () {
  //this --> refers to the model
  return this.updateMany({}, { onSale: true, price: 0 });
};

//Execution

async function fireSale() {
  const resultStaticMethod = await Product.fireSale();
  console.log(resultStaticMethod);
}
```

## Middlewares

### pre save example

```js
personSchema.pre("save", async function () {
  this.firstName = "pre";
  this.lastName = "middleware";

  console.log("ABOUT TO SAVE");
});
```

### post save example

```js
personSchema.post("save", async function () {
  console.log("JUST SAVED");
});
```

## Virtuals

Properties that are not stored at the database.

```js
personSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});
```

## runValidators: true

Allows to apply model validations on update

```js
const updated = await Product.findOneAndUpdate(query, newDocument, {
  new: true,
  runValidators: true,
});
```

## How to change default validation error message

```js
  price: {
    type: Number,
    min: [0, "EL PRECIO DEBE SER POSITIVO"],
  },
```

## Documentation

- [Mongoose](https://mongoosejs.com/).



# CRUD (NodeJS - Express - Mongoose - Mongo)



## Endpoints

### GET products

Gets all the products from the database. Those products can be filtered by category or name, using querystring.

#### Example response

```json

[
    {
        "_id": "61dee9b4254f7f5e5cbaaaa8",
        "name": "Manzana",
        "price": 900000,
        "category": "vegetable",
        "__v": 0
    },
    {
        "_id": "61deeb12db7f8a6906ded2cf",
        "name": "Lechuga",
        "price": 50,
        "category": "vegetable",
        "__v": 0
    }
]
```

### GET products/{id}
Returns the detail of a specific product

#### Example response
```json
{
    "_id": "61dee9b4254f7f5e5cbaaaa8",
    "name": "Manzana",
    "price": 200,
    "category": "fruit",
    "__v": 0
}
```

### POST /product

#### Body
```json
{
    "name": "Tomate",
    "price": 900,
    "category": "fruit"
}
```

#### Example response
```json
{
    "name": "Tomate",
    "price": 900,
    "category": "fruit",
    "_id": "61df1d928f4eedad5f36dab4",
    "__v": 0
}
```

### PUT /products

#### Body
```json
{
    "_id": "61dee9b4254f7f5e5cbaaaa8",
    "name": "Manzana",
    "price": 900000,
    "category": "vegetable"
}
```

#### Example response
```json
{
    "_id": "61dee9b4254f7f5e5cbaaaa8",
    "name": "Manzana",
    "price": 900000,
    "category": "vegetable",
    "__v": 0
}
```

### DELETE /products

#### Body
```json
{
    "_id": "61deeb12db7f8a6906ded2d0"
}
```

#### Example response
```json
{
    "_id": "61deeb12db7f8a6906ded2d0",
    "name": "Papa",
    "price": 100,
    "category": "vegetable",
    "__v": 0
}
```


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

## Documentation

- [Using middleware](http://expressjs.com/en/guide/using-middleware.html#using-middleware).
- [Writing middleware](http://expressjs.com/en/guide/writing-middleware.html#writing-middleware-for-use-in-express-apps).

# Handling errors

![Handling Errors](assets/imgs/errors01.png?raw=true "Handling Errors")

## The default error handler

Express comes with a built-in error handler that takes care of any errors that might be encountered in the app. This default error-handling middleware function is added at the end of the middleware function stack.

If you pass an error to next() and you do not handle it in a custom error handler, it will be handled by the built-in error handler; the error will be written to the client with the stack trace. The stack trace is not included in the production environment.

## How to throw an error

```js
throw new Error('Password required')
```

## Writing error handlers

Define error-handling middleware functions in the same way as other middleware functions, except error-handling functions have four arguments instead of three: (err, req, res, next). For example:

```js
app.use(function (err, req, res, next) {
  console.error(err.stack)
  //next(err) --> this will trigger the default error handler
  res.status(500).send('Something broke!')
})
```
## Custom Error Class

```js

//Class
class AppError extends Error {
    constructor(message, status){
        super();
        this.message = message;
        this.status = status;
    }
}

module.exports = AppError;
//Implementation

app.get("/error", (req, res) => {
  throw new AppError('password required', 401)
});

//Error Handler
app.use((err, req, res, next) => {
  const { status = 500, message = 'Something sent wrong' } = err;
  res.status(status).send('Error')
})

```

## Documentation

- [Error handling](https://expressjs.com/en/guide/error-handling.html).


# Mongo data relationships

# Cookies

# Session and flash

# Authentication
