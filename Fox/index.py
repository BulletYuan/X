#!/usr/bin/python
# -*- coding: UTF-8 -*-

import tornado.web

from config.env import config
import router


def main():
    app = tornado.web.Application(
        router.routes
    )
    app.listen(config['port'])
    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    print config
    main()
