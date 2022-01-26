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
throw new Error("Password required");
```

## Writing error handlers

Define error-handling middleware functions in the same way as other middleware functions, except error-handling functions have four arguments instead of three: (err, req, res, next). For example:

```js
app.use(function (err, req, res, next) {
  console.error(err.stack);
  //next(err) --> this will trigger the default error handler
  res.status(500).send("Something broke!");
});
```

## Custom Error Class

```js
//Class
class AppError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}

module.exports = AppError;
//Implementation

app.get("/error", (req, res) => {
  throw new AppError("password required", 401);
});

//Error Handler
app.use((err, req, res, next) => {
  const { status = 500, message = "Something sent wrong" } = err;
  res.status(status).send(message);
});
```

## Async Utility

We create a function, for example wrapAsync.

We pass as argument all the code that normally would be at the try.

This function will return a function and that function is gonna call the function that we passed as an argument.

```js
//Function

/**
 * This function receives an async function and executes it.
 * @param {function} fn Async function
 * @returns
 */
function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
}

//Implementation

router.get("/:id", wrapAsync(productController.getProductDetail));
```

## Mongo Custom Middleware Error Handler

```js
//Mongo validation error middleware
app.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name === "ValidationError") err = handleValidationErr(err);
  //if(err.name ==='CastError') err = handleValidationErr(err) for example, another use.
  next(err);
});

const handleValidationErr = (err) => {
  console.log(err);
  return new AppError(`Validation Failed...${err.message}`, 400);
};
```

## Documentation

- [Error handling](https://expressjs.com/en/guide/error-handling.html).

# Body Validations with Joi

joi lets you describe your data using a simple, intuitive, and readable language.

Example:

```js
const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required().min(0),
  category: Joi.array(),
}).required();

const { error } = productSchema.validate(req.body);
```

# Middleware to validate with Joi

## BodySchemas

```js
const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required().min(0),
  category: Joi.string(),
}).required();

module.exports = productSchema;
```

## Middleware

```js
const AppError = require("../utilities/AppError");

const productSchema = require("../bodySchemas/product");

module.exports = (req, res, next) => {
  const { error } = productSchema.validate(req.body);

  if (error) {
    const msg = error.details[0].message;
    throw new AppError(msg, 400);
  } else {
    next();
  }
};
```

## Implementation

```js
const validateProduct = require("../middlewares/validateProduct");

router.post("/", validateProduct, wrapAsync(productController.createProduct));
```

## Documentation

- [joi](https://joi.dev/api/?v=17.5.0).

# Mongo data relationships

## One to few

Embed the data directly in the document.

### Schema

```js
const userSchema = new mongoose.Schema({
  first: String,
  last: String,
  addresses: [
    {
      _id: { id: false }, //This prevents of autocreated ID
      street: String,
      city: String,
      state: String,
      country: {
        type: String,
        required: true,
      },
    },
  ],
});
```

### Document

```json
{
        "_id" : ObjectId("61e8354c5d70c61a5000a322"),
        "first" : "Harry",
        "last" : "Potter",
        "addresses" : [
                {
                        "street" : "Quiroga",
                        "city" : "Lomas",
                        "state" : "Buenos Aires",
                        "country" : "Argentina"
                },
                {
                        "street" : "Alsina",
                        "city" : "Temperley",
                        "state" : "Buenos Aires",
                        "country" : "Argentina"
                }
        ],
        "__v" : 1
}
```

## One to many

Store your data separately, but then store references to document ID's somewhere inside the parent.
The parent has a reference to the child.
The reference is on the parent.

```js
//FarmSchema (Parent)

const farmSchema = new Schema({
  name: String,
  city: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

//ProductSchema (Child)

const productSchema = new Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["Spring", "Summer", "Fall", "Winter"],
  },
});

//Create Farm and add a product

const makeFarm = async () => {
  const farm = new Farm({
    name: "Don Mario",
    city: "Burzaco",
  });
  const Sandia = await Product.findOne({ name: "Sandia" });

  farm.products.push(Sandia);

  await farm.save();

  console.log(farm);
};
```

```json
//Farms (Parent):

{
        "_id" : ObjectId("61e85ee3d4519739ec10f810"),
        "name" : "Don Mario",
        "city" : "Burzaco",
        "products" : [
                ObjectId("61e85c45a20a5d29b95f8ae0") //Refers to the product with this ID
        ],
        "__v" : 0
}

//Products (Child):

{
        "_id" : ObjectId("61e85c45a20a5d29b95f8ae0"),
        "name" : "Sandia",
        "price" : 20,
        "season" : "Summer",
        "__v" : 0
}
```

The ref option is what tells Mongoose which model to use during population.

## Mongoose Populate

### How to populate a field?

```js
Farm.findOne({ name: "Don Mario" })
  .populate("products")
  .then((farm) => console.log(farm));
```

Without populate (We see only the IDs to the referenced documents)

Populate specific field

```js
const findTweet = async () => {
  const t = await Tweet.find({})
    .populate("user", "userName")
    .then((user) => console.log(user));
};
```

```js
{
  _id: new ObjectId("61e85ee3d4519739ec10f810"),
  name: 'Don Mario',
  city: 'Burzaco',
  products: [ new ObjectId("61e85c45a20a5d29b95f8ae0") ],
  __v: 0
}
```

With populate (We see all the referenced documents)

```js
{
  _id: new ObjectId("61e85ee3d4519739ec10f810"),
  name: 'Don Mario',
  city: 'Burzaco',
  products: [
    {
      _id: new ObjectId("61e85c45a20a5d29b95f8ae0"),
      name: 'Sandia',
      price: 20,
      season: 'Summer',
      __v: 0
    }
  ],
  __v: 0
}
```

## One to "Bajillions"

With thousands or more documents, it's more efficient to store a reference to the parent on the child document.
The reference is on the child.

Parent

```js
const userSchema = new Schema({
  userName: String,
  age: Number,
});
```

Child

```js
const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
```

## Documentation

- [6 Rules of Thumb for MongoDB Schema: Part 1](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1).

- [6 Rules of Thumb for MongoDB Schema: Part 2](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-2).

- [6 Rules of Thumb for MongoDB Schema: Part 3](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-3).

# Cookies

Cookies are little bits of information that are stored in a user's browser when browsing a particular website.
Once a cookie is set, a user's browser will send the cookie on every subsequent request to the site.
Cookies allow use to make HTTP stateful.

## Send cookie

```js
res.cookie("name", "Rodrigo");
```

## Request cookie

```js
const { name } = req.cookies;
res.send(`Hi ${name}`);
```

## Sign cookie

Allows to validate the data integrity.

We cannot change the cookie mannualy from dev tools.

If I change the secret, all the saved cookies will be invalid.

```js
app.use(cookieParser("this-is-my-secret")); //The secret should be in a env variable

//set a signed cookie
res.cookie("name", "Rodrigo", { signed: true });

//read a signed cookie
console.log(req.signedCookies.name);
```

## Documentation

- [Cookie parser](https://www.npmjs.com/package/cookie-parser).

# Session and flash

It's not very practical (or secure) to store a lot of data client-side using cookies. This is where sessions come in!
Sessions are a server-side data store that we use to make HTTP stateful. Instead of storing data using cookies, we store the data on the server-side and then send the browser a cookie that can be used to retrieve the data.
A diagram might be helpful here.

The client saves as a cookie an id for each client.

Important: as default, the information would be saved in memory, but is not for production. In production can be used Redis for example. Here everytime we restart the server, the data is deleted, but if you use redis that does not happen.

## Cookies vs session

- Cookies are limited, in quantity of cookies that a domain can have and in the size of each cookie
- Cookies client side
- Session server side

## Basic setup

```js
const session = require("express-session");

const sessionOptions = {
  secret: "my-secret",
  resave: false,
  saveUninitialized: false,
};

app.use(session(sessionOptions));

```

## Example

```js
req.session.count ? (req.session.count += 1) : (req.session.count = 1);
res.send(`You have visited this page ${req.session.count} times`);
```

## Flash

- [Cookie parser](https://github.com/jaredhanson/connect-flash).

# Authentication

## Authentication VS Authorization

### Authentication

Authentication is the process of verifying who a particular user is.
We typically authenticate with a username/password combo, but we can also use security questions, facial recognition, etc.

### Authorization

Authorization is verifying what a specific user has access to.
Generally, we authorize after a user has been authenticated. "Now that we know who you are, here is what you are allowed to do and NOT allowed to do"

## Hashing

Rather than storing a password in the database, we run the password through a hashing function first and
then store the result in the database.

### Hasing functions

Hashing functions are functions that map input data of some arbitrary size to fixed-size output values.

![Hashing](assets/imgs/hashing.png?raw=true "Hashing")

Example:

![Example](assets/imgs/server-db.png?raw=true "Hashing")

### CRYPTOGRAPHIC HASH FUNCTIONS

1. One-way function which is infeasible to invert
2. Small change in input yields large change in the output
3. Deterministic - same input yields same output
4. Unlikely to find 2 outputs with same value
5. Password Hash Functions are deliberately SLOW

### Password salts

A salt is a random value added to the password before we hash it.

It helps ensure unique hashes and mitigate common attacks. One of this common attacks could be a reverse lookup table, in which the hacker runs the hashing function with a list of common passwords and then verifies if the output matches with the hacked database data.

It consist on adding a few characters to the input before encripting it.

### Bcrypt

![Example](assets/imgs/bcrypt-example.png?raw=true "Bcrypt")

- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js).

#### Hash
```js
const bcrypt = require('bcrypt')
const hash = await bcrypt.hash(pw, 12)

```
#### Compare
```js
const bcrypt = require('bcrypt')
const result = await bcrypt.compare(pw, hashedPw)

```

```js

```

```js

```
