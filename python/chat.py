import json
import sys 
import os
import time

def setuptalk(name1,name2):#建立好友聊天室,name1跟name2的
    output=[]
    str1=time.ctime(time.time()).split(' ')
    mes={"name":name1+" "+name2,"talk":" enter the room"}
    recordtime={"time_num":time.time(),"time":str1[3][:-3],"date":str1[4]+' '+str1[1]+' '+str1[2]}
    mes.update(recordtime)
    output.append(mes)
    if not os.path.isfile("./json/"+name1+","+name2+".json") and not os.path.isfile("./json/"+name2+","+name1+".json"):
        with open("./json/"+name1+","+name2+".json","w",encoding='utf-8') as f:
            json.dump(output,f,ensure_ascii=False)

    namelist1=[name1,name2]####################記錄誰跟誰有好友聊天室
    namelist2=[name2,name1]
    namelist=[namelist1,namelist2]
    if not os.path.isfile("./json/friendtalk.json"):
        with open("./json/friendtalk.json","w",encoding='utf-8') as f:
            json.dump(namelist,f,ensure_ascii=False)
    else: #讀出來，寫回去
        with open("./json/friendtalk.json", 'r',encoding='utf-8') as obj:
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
        with open("./json/friendtalk.json","w", encoding='utf-8') as f:
            json.dump(output, f, ensure_ascii=False) #########################


def talk(name1,name2,talk):#好友聊天,name1對name2說talk,然後會回傳聊天內容
    name="./json/"+name1+","+name2+".json"#選出正確的json檔
    if not os.path.isfile(name):
        name="./json/"+name2+","+name1+".json"
    str1=time.ctime(time.time()).split(' ')
    data={"name":name1,"talk":talk}###########聊天
    recordtime={"time_num":time.time(),"time":str1[3][:-3],"date":str1[4]+' '+str1[1]+' '+str1[2]}
    data.update(recordtime)
    with open(name, 'r',encoding='utf-8') as obj:
        output = json.load(obj)
    output.append(data)

    for i in range(len(output)):
        output[i].update({name1:1})
    with open(name,"w", encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False) 
    output=json.dumps(output, ensure_ascii = False)
    return output

def setupassi(assi,name):#建立任務聊天室,assi:任務,name:誰建立
    output=[]
    mes={"name":name,"talk":" enter the room"}
    str1=time.ctime(time.time()).split(' ')
    recordtime={"time_num":time.time(),"time":str1[3][:-3],"date":str1[4]+' '+str1[1]+' '+str1[2]}
    mes.update(recordtime)
    output.append(mes)
    if not os.path.isfile("./json/"+assi+","+name+".json"):#########################################可能會有問題
        with open("./json/"+assi+","+name+".json","w",encoding='utf-8') as f:#創聊天室json檔
            json.dump(output,f,ensure_ascii=False)
    
    filepath="./json/"+"assignmentname.json"#建立一個json檔，它記錄那些人在同一個任務並擁有相同聊天室
    assignmet={"assignment":assi}
    group={"group":name}
    searchname={"searchname":"./json/"+assi+","+name+".json"}
    namelist=[]
    namelist.append(assignmet)
    namelist.append(group)
    namelist.append(searchname)
    if not os.path.isfile(filepath):#如果一開始沒這個檔案
        with open("./json/assignmentname.json","w",encoding='utf-8') as f:
            json.dump(namelist,f,ensure_ascii=False)
    else: #讀出來，寫回去
        with open("./json/assignmentname.json", 'r',encoding='utf-8') as obj:
            output = json.load(obj)
        exist=False
        if output[0]["assignment"]==assi and name in output[1]["group"]:
                exist=True
        for i in range(3,len(output)):
            if output[i][0]["assignment"]==assi and name in output[i][1]["group"]:
                exist=True
        if exist==False:
            output.append(namelist)
        
        with open("./json/assignmentname.json","w", encoding='utf-8') as f:
            json.dump(output, f, ensure_ascii=False) 

def assignmentadd(assi,name1,name2):#加入任務聊天室,name1:invite,name2:receive,assi:任務,name1邀請name2加入assi這個任務聊天室
    with open("./json/assignmentname.json", 'r',encoding='utf-8') as obj:
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
    with open("./json/assignmentname.json","w", encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False) 

def assignmentdel(assi,name):
    with open("./json/assignmentname.json", 'r',encoding='utf-8') as obj:
        output = json.load(obj)
    str1=output[1]['group'].split(',')
    if name in str1:
        str1.remove(name)
    output[1]['group']=""
    for i in range(len(str1)):
        if output[0]['assignment']==assi:
            output[1]['group']+=str1[i]
            output[1]['group']+=','
            break
    output[1]['group']=output[1]['group'][:-1]

    for i in range(3,len(output)):
        str2=output[i][1]['group'].split(',')
        if name in str2:
            str2.remove(name)
        output[i][1]['group']=""
        for j in range(len(str2)):
            if output[i][0]['assignment']==assi:
                output[i][1]['group']+=str2[j]
                output[i][1]['group']+=','
                break
        output[i][1]['group']=output[i][1]['group'][:-1]
        """
    if output[i][1]['group']=="":
        os.remove(findassifile(name,assi))
        """
    with open("./json/assignmentname.json","w", encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False) 
def assignmenttalk(assi,name,talk):#任務聊天,在assi這個任務聊天室,name這個人說了talk,然後會回傳聊天內容
    with open("./json/assignmentname.json", 'r',encoding='utf-8') as obj:
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
    data={"name":name,"talk":talk}
    str1=time.ctime(time.time()).split(' ')
    recordtime={"time_num":time.time(),"time":str1[3][:-3],"date":str1[4]+' '+str1[1]+' '+str1[2]}
    data.update(recordtime)
    with open(str2,'r', encoding='utf-8') as obj:#對話
        output = json.load(obj)
    output.append(data)
    
    for i in range(len(output)):
        output[i].update({name:1})
    with open(str2,"w", encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False) 
    output=json.dumps(output, ensure_ascii = False)

    return output #########################



def findfriendtalk(name):#輸入name,找到這個人有跟哪些人聊天,回傳那些人的list
    with open("./json/friendtalk.json", 'r',encoding='utf-8') as obj:
        output = json.load(obj)
    for i in range(len(output)):
        if output[i][0]==name:
            del output[i][0]
            return output[i]

def findassignment(name):#輸入name,找到這個人有哪些任務聊天室,回傳聊天室list
    assignmentlist=[]
    with open("./json/assignmentname.json", 'r',encoding='utf-8') as obj:
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
    
    with open("./json/assignmentname.json", 'r',encoding='utf-8') as obj:
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
    

def findassifile(name,assi):
    
    with open("./json/assignmentname.json", 'r',encoding='utf-8') as obj:
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
    listfinal=[]    
    if os.path.isfile("./json/"+"friendtalk.json"):
        list1=findfriendtalk(name)
        for i in range(len(list1)):
            namecor="./json/"+name+","+list1[i]+".json"#選出正確的json檔
            if not os.path.isfile(namecor):
                namecor="./json/"+list1[i]+","+name+".json"
            with open(namecor, 'r',encoding='utf-8') as obj:
                output = json.load(obj)
            #number
            num=0
            for j in range(len(output)):
                if not output[j].__contains__(name):
                    num+=1
            a={"name":list1[i],"time_num":output[len(output)-1]["time_num"],"time":output[len(output)-1]["time"],"talk":output[len(output)-1]["talk"],"type":"friend","number":num}
            listfinal.append(a)

    if os.path.isfile("./json/"+"assignmentname.json"):
        list2=findassignment(name)
        for i in range(len(list2)):
            filename=findassifile(name,list2[i])
            with open(filename, 'r',encoding='utf-8') as obj:
                output = json.load(obj)
            #number
            num2=0
            for k in range(len(output)):
                if not output[k].__contains__(name):
                    num2+=1
            b={"name":list2[i],"time_num":output[len(output)-1]["time_num"],"time":output[len(output)-1]["time"],"talk":output[len(output)-1]["talk"],"type":"mission","number":num2}
            listfinal.append(b)
            
    listfinal.sort(key = lambda s: s["time_num"],reverse=True)
    listfinal=json.dumps(listfinal, ensure_ascii = False)
    return listfinal


def talkfile(name1,name2):#好友聊天室剛點進去的內容
    name="./json/"+name1+","+name2+".json"#選出正確的json檔
    if not os.path.isfile(name):
        name="./json/"+name2+","+name1+".json" 
    with open(name, 'r',encoding='utf-8') as obj:
        output = json.load(obj)
    #output=json.dumps(output, ensure_ascii = False)
##################################
    for i in range(len(output)):
        output[i].update({name1:1})
    with open(name,"w", encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False) 
    output=json.dumps(output, ensure_ascii = False)
###################################
    return output
talkfile('a','b')
def assignmentfile(assi,name):#任務聊天室剛點進去的內容
    filename=findassifile(name,assi)
    with open(filename, 'r',encoding='utf-8') as obj:
        output = json.load(obj)
    #output=json.dumps(output, ensure_ascii = False)
#################################
    for i in range(len(output)):
        output[i].update({name:1})
    with open(name,"w", encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False) 
    output=json.dumps(output, ensure_ascii = False)
#################################
    return output





sys.stdout.reconfigure(encoding='utf-8')
if(sys.argv[1]=="setuptalk"):
    setuptalk(sys.argv[2],sys.argv[3])
elif(sys.argv[1]=="talk"):
    print(talk(sys.argv[2],sys.argv[3],sys.argv[4]))
elif(sys.argv[1]=="setupassi"):
    setupassi(sys.argv[2],sys.argv[3])
elif(sys.argv[1]=="assignmentadd"):
    assignmentadd(sys.argv[2],sys.argv[3],sys.argv[4])
elif(sys.argv[1]=="assignmenttalk"):
    print(assignmenttalk(sys.argv[2],sys.argv[3],sys.argv[4]))
    #print(sys.argv[2],sys.argv[3],sys.argv[4])
elif(sys.argv[1]=="chatroomlist"):
    print(chatroomlist(sys.argv[2]))
elif(sys.argv[1]=="talkfile"):
    print(talkfile(sys.argv[2],sys.argv[3]))
elif(sys.argv[1]=="assignmentfile"):
    print(assignmentfile(sys.argv[2],sys.argv[3]))
    

