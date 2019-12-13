# -*- coding: utf-8 -*-
# import json
import sys


import tornado.web
import service.mongoService as mongoService

reload(sys)
sys.setdefaultencoding('utf8')


class HomeController(tornado.web.RequestHandler):
    def data_received(self, chunk):
        pass

    def get(self):
        grabed = mongoService.find(project={"url": 1, "content": 1},
                                   query={"state": 1},
                                   limit=1,
                                   sort={"key": "createTime", "sort": -1})
        self.write('welcome home!\ngrabed count: ' + str(len(grabed)) + '\n')
