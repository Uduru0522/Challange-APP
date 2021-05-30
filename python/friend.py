import json
import os
import sys 

def addfriend(name1,name2):#name1跟name2互加為好友

    namelist1=[name1,name2]
    namelist2=[name2,name1]
    namelist=[namelist1,namelist2]
    if not os.path.isfile("./json/friend.json"):#namelist
        with open("./json/friend.json","w",encoding='utf-8') as f:
            json.dump(namelist,f,ensure_ascii=False)
        #return "wqeqweq"
    else: #讀出來，寫回去
        with open("./json/friend.json", 'r',encoding='utf-8') as obj:
            output = json.load(obj)
        exist1=True
        exist2=True
        for i in range(len(output)):
            if output[i][0]==name1:
                if name2 not in output[i]:
                    output[i].append(name2)
                exist1=False
            if output[i][0]==name2:
                if name1 not in output[i]:
                    output[i].append(name1)
                exist2=False
        if exist1==True:
            output.append(namelist1)
        if exist2==True:
            output.append(namelist2)
        #output.append(namelist)
        with open("./json/friend.json","w", encoding='utf-8') as f:
            json.dump(output, f, ensure_ascii=False) 

def delfriend(name1,name2):#name1,name2互刪好友
    with open("./json/friend.json", 'r',encoding='utf-8') as obj:
        output = json.load(obj)
    for i in range(len(output)):
        if output[i][0]==name1:
            
            output[i].remove(name2)
        if output[i][0]==name2:
            
            output[i].remove(name1)
    with open("./json/friend.json","w", encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False) 
    #刪除json檔案
    if not os.path.isfile("./json/"+name1+","+name2+".json"):
        os.remove("./json/"+name2+","+name1+".json")
    else:
        os.remove("./json/"+name1+","+name2+".json")
            

def findfriend(name):#輸入name,找到name這個人的所有好友
    data={}

    with open("./json/friend.json", 'r',encoding='utf-8') as obj:
        output = json.load(obj)
    for i in range(len(output)): 
        
        if output[i][0]==name:
           
            
            data={"friend":output[i][1:]}
            data = json.dumps(data)
            return data

"""
sys.stdout.reconfigure(encoding='utf-8')

if(sys.argv[1]=="addfriend"):
    addfriend(sys.argv[2], sys.argv[3])
elif(sys.argv[1]=="delfriend"):
    delfriend(sys.argv[2], sys.argv[3])
elif(sys.argv[1]=="findfriend"):
    print(findfriend(sys.argv[2]))
"""

#print(findfriend(sys.argv[2]))
