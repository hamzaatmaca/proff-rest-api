const { MongoClient } = require("mongodb");

module.exports = async (collectionName, payload, method) => {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();

    console.log("connection open");

    const database = client.db("restapi");

    const selectedCollection = database.collection(collectionName);

    let result;

    switch (method) {
      case "insertOne":
        result = await selectedCollection.insertOne(payload);

        return result;

      case "find":
        result = await selectedCollection.find();

        return result;

      case "findOne":
        result = await selectedCollection.findOne(payload);

        return result;
      default:
        break;
    }

    return result;
  } finally {
    console.log("connection closed");
    await client.close();
  }
};
