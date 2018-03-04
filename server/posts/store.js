const db = require(`../../src/database`);

const setupCollection = async () => {
  const dBase = await db;

  const collection = dBase.collection(`posts`);
  collection.createIndex({username: -1}, {unique: true});
  return collection;
};

class PostStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getPost(date) {
    return (await this.collection).findOne({date});
  }

  async getAllPosts() {
    return (await this.collection).find();
  }

  async save(postData) {
    return (await this.collection).insertOne(postData);
  }

}

module.exports = new PostStore(setupCollection().catch((e) => console.error(`Failed to set up "posts"-collection`, e)));
