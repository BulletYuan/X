from controller.HomeController import HomeController
from controller.SplitController import SplitController

routes = [
    (r'/', HomeController),
    (r'/split', SplitController),
]
