import json
import sys 
import os
import time
a=0
def setuptalk(name1,name2):#建立好友聊天室,name1跟name2的
    output=[]
    mes={name1+" "+name2:" enter the room"}
    recordtime={"time_num":time.time(),"time":time.ctime(time.time())}
    mes.update(recordtime)
    output.append(mes)
    with open(name1+","+name2+".json","w",encoding='utf-8') as f:
            json.dump(output,f,ensure_ascii=False)

    namelist1=[name1,name2]####################記錄誰跟誰有好友聊天室
    namelist2=[name2,name1]
    namelist=[namelist1,namelist2]
    if not os.path.isfile("friendtalk.json"):
        with open("friendtalk.json","w",encoding='utf-8') as f:
            json.dump(namelist,f,ensure_ascii=False)
    else: #讀出來，寫回去
        with open("friendtalk.json", 'r') as obj:
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
        with open("friendtalk.json","w", encoding='utf-8') as f:
            json.dump(output, f, ensure_ascii=False) #########################

def talk(name1,name2,talk):#好友聊天,name1對name2說talk,然後會回傳聊天內容
    name=name1+","+name2+".json"#選出正確的json檔
    if not os.path.isfile(name):
        name=name2+","+name1+".json"
    
    data={name1:talk}###########聊天
    recordtime={"time_num":time.time(),"time":time.ctime(time.time())}
    data.update(recordtime)
    with open(name, 'r') as obj:
        output = json.load(obj)
    output.append(data)
    
    with open(name,"w", encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False) 
    output=json.dumps(output)
    return output


def setupassi(assi,name):#建立任務聊天室,assi:任務,name:誰建立
    output=[]
    mes={name:" enter the room"}
    recordtime={"time_num":time.time(),"time":time.ctime(time.time())}
    mes.update(recordtime)
    output.append(mes)
    with open(assi+","+name+".json","w",encoding='utf-8') as f:#創聊天室json檔
            json.dump(output,f,ensure_ascii=False)
    
    filepath="assignmentname.json"#建立一個json檔，它記錄那些人在同一個任務並擁有相同聊天室
    assignmet={"assignment":assi}
    group={"group":name}
    searchname={"searchname":assi+","+name+".json"}
    namelist=[]
    namelist.append(assignmet)
    namelist.append(group)
    namelist.append(searchname)
    if not os.path.isfile(filepath):#如果一開始沒這個檔案
        with open("assignmentname.json","w",encoding='utf-8') as f:
            json.dump(namelist,f,ensure_ascii=False)
    else: #讀出來，寫回去
        with open("assignmentname.json", 'r') as obj:
            output = json.load(obj)
        
        output.append(namelist)
        
        with open("assignmentname.json","w", encoding='utf-8') as f:
            json.dump(output, f, ensure_ascii=False) 

def assignmentadd(assi,name1,name2):#加入任務聊天室,name1:invite,name2:receive,assi:任務,name1邀請name2加入assi這個任務聊天室
    with open("assignmentname.json", 'r') as obj:
        output = json.load(obj)
    str1=output[1]['group'].split(',')
    for i in range(len(str1)):
        if str1[i]==name1 and output[0]['assignment']==assi:
            output[1]['group']+=','
            output[1]['group']+=name2
            break
    for i in range(3,len(output)):
        str2=output[i][1]['group'].split(',')
        for j in range(len(str2)):
            if str2[j]==name1 and output[i][0]['assignment']==assi:
                output[i][1]['group']+=','
                output[i][1]['group']+=name2
                break
    with open("assignmentname.json","w", encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False) 
    
def assignmenttalk(assi,name,talk):#任務聊天,在assi這個任務聊天室,name這個人說了talk,然後會回傳聊天內容
    with open("assignmentname.json", 'r') as obj:
        output = json.load(obj)
    str1=output[1]['group'].split(',')
    str2=""
    for i in range(len(str1)):
        if str1[i]==name and output[0]['assignment']==assi:
            str2=output[2]['searchname']
            break
    for i in range(3,len(output)):
        str1=output[i][1]['group'].split(',')
        for j in range(len(str1)):
            if str1[j]==name and output[i][0]['assignment']==assi:
                str2=output[i][2]['searchname']
                break
    data={name:talk}
    recordtime={"time_num":time.time(),"time":time.ctime(time.time())}
    data.update(recordtime)
    with open(str2,'r') as obj:#對話
        output = json.load(obj)
    output.append(data)
    
    with open(str2,"w", encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False) 
    output=json.dumps(output)
    
    return output #########################


def findfriendtalk(name):#輸入name,找到這個人有跟哪些人聊天,回傳那些人的list
    with open("friendtalk.json", 'r') as obj:
        output = json.load(obj)
    for i in range(len(output)):
        if output[i][0]==name:
            del output[i][0]
            return output[i]

def findassignment(name):#輸入name,找到這個人有哪些任務聊天室,回傳聊天室list
    assignmentlist=[]
    with open("assignmentname.json", 'r') as obj:
        output = json.load(obj)
    str1=output[1]['group'].split(',')#找到assignment
    for i in range(len(str1)):
        if str1[i]==name:
            assignmentlist.append(output[0]['assignment'])
            break
    for i in range(3,len(output)):
        str1=output[i][1]['group'].split(',')
        for j in range(len(str1)):
            if str1[j]==name:
                assignmentlist.append(output[i][0]['assignment'])
                break
    return assignmentlist

def findassifile(name,assi):
    
    with open("assignmentname.json", 'r') as obj:
        output = json.load(obj)
    str1=output[1]['group'].split(',')#找到assignment
    for i in range(len(str1)):
        if str1[i]==name and assi==output[0]['assignment']:
            assignmentfile=output[2]['searchname']
            break
    for i in range(3,len(output)):
        str1=output[i][1]['group'].split(',')
        for j in range(len(str1)):
            if str1[j]==name and output[i][0]['assignment']==assi:
                assignmentfile=output[i][2]['searchname']
                break
    return assignmentfile
    
def chatroomlist(name):
    list1=findfriendtalk(name)
    sortlist={}
    for i in range(len(list1)):
        namecor=name+","+list1[i]+".json"#選出正確的json檔
        if not os.path.isfile(namecor):
            namecor=list1[i]+","+name+".json"

        with open(namecor, 'r') as obj:
            output = json.load(obj)
        
        a={list1[i]:output[len(output)-1]["time_num"]}
        sortlist.update(a)
        
    list2=findassignment(name)
    
    for i in range(len(list2)):
        filename=findassifile(name,list2[i])
        with open(filename, 'r') as obj:
            output = json.load(obj)
        b={list2[i]:output[len(output)-1]["time_num"]}
        sortlist.update(b)
        
    sortlist=sorted(sortlist.items(), key=lambda x:x[1], reverse=True)
    listsave=[]
    listfinal=[]
    for i in range(len(sortlist)):
        listsave.append(time.ctime(sortlist[i][1]))
    
    for i in range(len(sortlist)):
        li={sortlist[i][0]:listsave[i]}
        listfinal.append(li)
    listfinal=json.dumps(listfinal)
    return listfinal

    
def talkfile(name1,name2):#好友聊天室剛點進去的內容
    name=name1+","+name2+".json"#選出正確的json檔
    if not os.path.isfile(name):
        name=name2+","+name1+".json" 
    with open(name, 'r') as obj:
        output = json.load(obj)
    output=json.dumps(output)
    return output

def assignmentfile(assi,name):#任務聊天室剛點進去的內容
    filename=findassifile(name,assi)
    with open(filename, 'r') as obj:
        output = json.load(obj)
    output=json.dumps(output)
    return output





if(argv[1]=="setuptalk"):
    setuptalk(argv[2],argv[3])
elif(argv[1]=="talk"):
    print(talk(argv[2],argv[3],argv[4]))
elif(argv[1]=="setupassi"):
    setupassi(argv[2],argv[3])
elif(argv[1]=="assignmentadd"):
    assignmentadd(argv[2],argv[3],argv[4])
elif(argv[1]=="assignmenttalk"):
    print(assignmenttalk(argv[2],argv[3],argv[4]))
elif(argv[1]=="chatroomlist"):
    print(assignmenttalk(argv[2],argv[3],argv[4]))
elif(argv[1]=="talkfile"):
    print(talkfile(argv[2],argv[3]))
elif(argv[1]=="assignmentfile"):
    print(assignmentfile(argv[2],argv[3]))
