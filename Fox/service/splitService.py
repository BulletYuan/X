import sys
import jieba
import re

import service.mongoService as mongoService


def get_data():
    try:
        data = mongoService.find(query={"state": 1},
                                 project={"url": 1, "content": 1},
                                 limit=1)
        return data
    except IOError as io_err:
        print("IOError:\n" + io_err)
        return []
    except:
        print("Unexpected error:", sys.exc_info()[0])
        return []


def split_data(data=[]):
    if len(data) == 0:
        return ""
    content = ""
    for item in data:
        # i_content = item["content"].replace('^\S+', '')
        i_content = re.sub(r'\n|\r|\s', '', item['content'])
        print i_content
        content += " /".join(jieba.cut(i_content))
    return content


def split():
    data = get_data()
    return split_data(data)
