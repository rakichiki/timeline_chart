# -*- coding:utf-8 -*-

from bottle import get, post, request, route, run, template, static_file

from bottle import template
import json
import os
from datetime import datetime as dt


@get('/timeline_chart')
def timeline_chart():
    f = open('timeline_chart.json', 'r')
    data = json.load(f)

    return template('timeline_chart.pty', data=data)

@get('/man')
def man():

    return template('man.pty')


@post('/timeline_chart')
def timeline_chart():
    if os.path.exists("./old") == False:
        os.mkdir("./old")  

    tdatetime = dt.now()
    tstr = tdatetime.strftime('%Y%m%d%H%M%S')
    for count in ["00","01","02","03","04","05","06","07","08","09"]:
        if os.path.exists("./old/timeline_chart_"+tstr+count+".json") == False:
            rename_file = "./old/timeline_chart_"+tstr+count+".json"
            os.rename("./timeline_chart.json", rename_file)
            break
    #print(rename_file)

    f          = open(rename_file, 'r')
    data       = json.load(f)
    f.close()
    category   = int(request.forms.get("category"))
    month      = int(request.forms.get("month")) -1
    day        = int(request.forms.get("day")) -1
    group      = request.forms.get("group")
    data_type  = request.forms.get("data_type")
    #print(category)
    #print(month)
    #print(day)
    #print(group)
    #print(data_type)

    if data_type == "add":
        for cate_id in data:
            if cate_id["category"] == category:
                cate_id["days"][month][day] = group
                break
        
    elif data_type == "del":
        for cate_id in data:
            if cate_id["category"] == category:
                cate_id["days"][month][day] = 0
                break
    
    fw = open('timeline_chart.json', 'w')
    json.dump(data,fw,indent=4)
    fw.close()
    #os.remove("./timeline_chart_old.json")



@get('/static/css/<filename:re:.*\.css>')
def css(filename):
    return static_file(filename, root="./static/css")

@get('/static/js/<filename:re:.*\.js>')
def js(filename):
    return static_file(filename, root="./static/js")

@get('/static/img/<filename:re:.*\.png>')
def img(filename):
    return static_file(filename, root="./static/img")


run(host='localhost', port=8080, debug=True)

