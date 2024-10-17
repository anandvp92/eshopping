const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017/";

const dbName = "eshopping";

class connection {
  constructor() {
    this.url = url;
    this.dbName = dbName;
    this.client = new MongoClient(this.url);
    this.db = null;
    this.dbConf()
  }

  async dbConf() {
    try {
      await this.client.connect();
      this.db = await this.client.db(this.dbName);
      console.log("Db connected sucessfully");
    } catch (err) {
      return `Db connection causes some error :${err} `;
    }
  }

  getDb() {
    if (!this.db) {
      throw new Error("Database not initialized. Please check your connection.");
    }
    return this.db;
  }

  async close() {
    if(this.client){
      await this.client.close()
      console.log("Connection closed");
    }
  }
}

module.exports = new connection();
