import json
import os
import sys 
def addfriend(name1,name2):#name1跟name2互加為好友
    namelist1=[name1,name2]
    namelist2=[name2,name1]
    namelist=[namelist1,namelist2]
    if not os.path.isfile("friend.json"):#namelist
        with open("friend.json","w",encoding='utf-8') as f:
            json.dump(namelist,f,ensure_ascii=False)
    else: #讀出來，寫回去
        with open("friend.json", 'r') as obj:
            output = json.load(obj)
        exist1=True
        exist2=True
        for i in range(len(output)):
            if output[i][0]==name1:
                output[i].append(name2)
                exist1=False
            if output[i][0]==name2:
                output[i].append(name1)
                exist2=False
        if exist1==True:
            output.append(namelist1)
        if exist2==True:
            output.append(namelist2)
        #output.append(namelist)
        with open("friend.json","w", encoding='utf-8') as f:
            json.dump(output, f, ensure_ascii=False) 

def delfriend(name1,name2):#name1,name2互刪好友
    with open("friend.json", 'r') as obj:
        output = json.load(obj)
    for i in range(len(output)):
        if output[i][0]==name1:
            
            output[i].remove(name2)
        if output[i][0]==name2:
            
            output[i].remove(name1)
    with open("friend.json","w", encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False) 

def findfriend(name):#輸入name,找到name這個人的所有好友
    with open("friend.json", 'r') as obj:
        output = json.load(obj)
    for i in range(len(output)):
        if output[i][0]==name:
            del output[i][0]
            return output[i]


"""

str1=sys.argv[0].split(',')
if str1[0]=="addfriend":
    addfriend(str1[1],str1[2])
if str1[0]=="delfriend"
    delfriend(str1[1],str1[2])
if str1[0]=="findfriend"
    findfriend(str1[1])
"""