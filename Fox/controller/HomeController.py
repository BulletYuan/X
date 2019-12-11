import tornado

class HomeController(tornado.web.RequestHandler):
    def get(self):
        self.write('welcome home!')
