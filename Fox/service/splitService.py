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
        i_content = re.sub(r'\n|\r|\s|\t', '', item['content'])
        split_content = list(jieba.cut(i_content))
        content += " ".join(split_content)
        # print split_content
        count = top_count_data(split_content)
    return content


def top_count_data(data=[]):
    if len(data) == 0:
        return []
    items = []

    def find_index(self, i, value):
        return sorted(self, key=lambda x: x[i] != value)[0]

    for item in data:
        try:
            result=find_index(data, 0, item)
            print result
            if find_index(data, 0, item):
                pass
        except IOError:
            el = (item, data.count(item))
            items.append(el)
    items.sort(key=lambda x: x[1], reverse=True)
    print items
    return items


def split():
    data = get_data()
    return split_data(data)
