# MongoDB Operations

## 1. Managing DB & Collections

In MongoDB, a database is a container for collections, and a collection is a container for documents. Here’s a breakdown of how you manage them:

### Databases:

A MongoDB instance can contain multiple databases. You create and switch between databases using commands like:

- `use <dbname>`: Switches to a specific database.
- `db`: Shows the current database.
- `show dbs`: Lists all databases.
- `db.createCollection(<name>)`: Creates a collection in the current database.
- `db.dropDatabase()`: Drops the current database.

### Collections:

Collections are like tables in SQL but don’t require a predefined schema. You can add documents without needing to define the structure beforehand.

- `db.createCollection(<name>)`: Creates a collection.
- `db.<collection>.drop()`: Drops the collection.
- `show collections`: Lists all collections in the current database.

---

## 2. CRUD Operations

CRUD stands for Create, Read, Update, and Delete, which are the fundamental operations you can perform on documents in MongoDB.

### Create: Insert new documents into a collection.

- `db.collection.insertOne(<document>)`: Inserts a single document.
- `db.collection.insertMany([<documents>])`: Inserts multiple documents.

### Read: Retrieve documents from a collection.

- `db.collection.find(<query>)`: Finds documents based on a query.
- `db.collection.findOne(<query>)`: Finds a single document.

### Update: Modify existing documents.

- `db.collection.updateOne(<filter>, <update>)`: Updates one document.
- `db.collection.updateMany(<filter>, <update>)`: Updates multiple documents.
- `db.collection.replaceOne(<filter>, <replacement>)`: Replaces a document.

### Delete: Remove documents from a collection.

- `db.collection.deleteOne(<filter>)`: Deletes one document.
- `db.collection.deleteMany(<filter>)`: Deletes multiple documents.

---

## 3. Comparison Operators

MongoDB supports several comparison operators that allow you to query documents based on specific conditions:

- `$eq`: Equal to (e.g., `db.collection.find({ age: { $eq: 25 } })`).
- `$ne`: Not equal to (e.g., `db.collection.find({ age: { $ne: 25 } })`).
- `$gt`: Greater than (e.g., `db.collection.find({ age: { $gt: 18 } })`).
- `$gte`: Greater than or equal to (e.g., `db.collection.find({ age: { $gte: 18 } })`).
- `$lt`: Less than (e.g., `db.collection.find({ age: { $lt: 30 } })`).
- `$lte`: Less than or equal to (e.g., `db.collection.find({ age: { $lte: 30 } })`).
- `$in`: Matches values in an array (e.g., `db.collection.find({ age: { $in: [18, 25, 30] } })`).
- `$nin`: Matches values not in an array (e.g., `db.collection.find({ age: { $nin: [18, 25, 30] } })`).

These operators are used to build complex queries and filter data.

---

## 4. Logical Operators

Logical operators allow you to combine multiple conditions in a query. Some common ones are:

- `$and`: Matches documents that satisfy all conditions (e.g., `db.collection.find({ $and: [{ age: { $gt: 18 } }, { age: { $lt: 30 } }] })`).
- `$or`: Matches documents that satisfy at least one condition (e.g., `db.collection.find({ $or: [{ age: { $lt: 18 } }, { age: { $gt: 60 } }] })`).
- `$not`: Negates a condition (e.g., `db.collection.find({ age: { $not: { $gt: 60 } } })`).
- `$nor`: Matches documents that do not satisfy any of the conditions (e.g., `db.collection.find({ $nor: [{ age: { $gt: 60 } }, { age: { $lt: 18 } }] })`).

These operators help you filter documents based on multiple conditions.

---

## 5. Cursors

In MongoDB, a cursor is the object that is used to iterate over the results of a query. When you run a query, MongoDB returns a cursor object, not the actual data itself. This allows you to efficiently handle large result sets by fetching documents as needed.

- `cursor.next()`: Retrieves the next document in the cursor.
- `cursor.hasNext()`: Checks if there are more documents to iterate through.
- `cursor.forEach(callback)`: Iterates over the results and applies a function to each document.
- `cursor.limit(n)`: Limits the number of documents returned.

Cursors help manage memory and performance when working with large datasets.

---

## 6. `$expr` & Elements Operator

### `$expr`:

Allows you to use aggregation expressions within a query. It lets you compare fields to each other or evaluate expressions directly in the query.

Example:

```javascript
db.collection.find({ $expr: { $gt: ["$price", "$discount"] } });
```

---

## 7. Elements Operator:

The $exists operator checks if a field exists or not. This can be useful for querying documents where a field might be missing or null.

```js
db.collection.find({ age: { $exists: true } });
```

## 8. Embedded Documents :

Embedded documents in MongoDB are documents within documents, similar to nested objects in JSON. You can store related data within a single document, which makes MongoDB a NoSQL database.

Example :

```json
{
  "_id": 1,
  "name": "John",
  "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "state": "IL"
  }
}
```

In this example, the address is an embedded document within the main document. You can query nested fields like address.city using dot notation:

```js
db.collection.find({ "address.city": "Springfield" });
```

---

## 8. Projection

Projection allows you to specify which fields to include or exclude in the results of a query. This is useful when you want to limit the amount of data returned.

Include Fields:
To include specific fields, use 1 to specify which fields should be returned.

Example:

```js
db.collection.find({}, { name: 1, age: 1 });
```

This will return only the name and age fields of each document.

Exclude Fields:
To exclude fields, use 0.

Example:

```js
db.collection.find({}, { _id: 0, name: 1 });
```

This will return all documents without the \_id field, but include the name field.

Projection allows you to control the size of the response by limiting unnecessary data.
