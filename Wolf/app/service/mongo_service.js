const Service = require('egg').Service;

class MongoService extends Service {
    async find(alians = [
        `id`, `url`, `topic`, `digest`, `thumb`, `keywords`, `time`
    ], query = { state: 0 }, limit = 10, sort = { 'createTime': 1 }) {
        const { app } = this;
        const data = await app.mongo.find('wolf', {
            query, limit, sort
        });
        return { data };
    }
    async insert(doc = {}) {
        const { app } = this;
        const { result } = await app.mongo.insertOne('wolf', {
            doc
        });
        let data = false;
        if (result.ok === result.n) {
            data = true;
            return { data };
        }
        return { data };
    }
    async insertArray(docs = []) {
        const { app } = this;
        const { result } = await app.mongo.insertMany('wolf', {
            docs,
        });
        let data = false;
        if (result.ok > 0) {
            data = true;
            return { data };
        }
        return { data };
    }
    async update(update = {}, filter = {}) {
        const { app } = this;
        update = { $set: update };
        const { result } = await app.mongo.updateMany('wolf', {
            filter, update,
        });
        let data = false;
        if (result.ok > 0) {
            data = true;
            return { data };
        }
        return { data };
    }
}

module.exports = MongoService;