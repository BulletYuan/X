import tornado.web
import service.splitService as splitService


class SplitController(tornado.web.RequestHandler):
    def data_received(self, chunk):
        pass

    def get(self):
        result = splitService.split()
        self.write('SplitController: \n: ' + result + '\n')
