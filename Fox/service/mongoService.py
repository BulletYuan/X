import pymongo

DBClient = pymongo.MongoClient('mongodb://127.0.0.1:27017/')
DBName = "wolf"
ColName = "wolf"
DB = DBClient[DBName]
Col = DB[ColName]


def find(project={"url": 1, "content": 1}, query={"state": 1}, limit=10, sort={"key": "createTime", "sort": -1}):
    return list(Col.find(query, project).limit(limit).sort(sort["key"], sort["sort"]))


def update_one(query, values):
    if not (query or values):
        return False
    return Col.update_one(query, {"$set": values}).modified_count > 0
