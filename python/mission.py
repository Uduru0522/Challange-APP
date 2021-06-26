import sqlite3
import sys
import json

def allmission(conn, User):
    rows = conn.execute("select * from mission;")
    _json = []
    
    field_name = [des[0] for des in rows.description]#找到項目名
    for row in rows:
        _row_json = dict()
        Member = conn.execute("SELECT member FROM mission where ID = {m_ID};".format(m_ID=row[7]))#拿出member
        Mem = Member.fetchone()[0]
        _member=Mem.split(",")
        if(User in _member):
            _row_json["progress"] = "1"
        else:
            _row_json["progress"] = "0"
        for field in range(len(row)):
            if(field_name[field]!='category_no' and field_name[field]!='progressing' and field_name[field]!= 'member'):
                _row_json[field_name[field]] = row[field]
        _json.append(_row_json)
    #print(_json)
    output = json.dumps(_json, ensure_ascii = False)
    
    conn.commit()
    conn.close()
    return output

def accept(conn, User, M_ID):#傳入使用者名字和要接的任務
    conn.execute("create table if not exists {user}(name text, category text, description text, guide text, points integer, ID text, completed boolean DEFAULT(0), date time DATE DEFAULT (datetime('now','localtime')), category_no integer, picture text DEFAULT(';;'), pic_text text DEFAULT(';;'),stage integer, now_stage integer DEFAULT(1),multiple text)".format(user=User))#建立玩家任務清單
    conn.execute("INSERT INTO {user} (name, category, description, guide, points, ID, category_no, stage, multiple) SELECT name, category, description, guide, points, ID, category_no, stage, multiple FROM mission WHERE ID= {m_ID};".format(user=User, m_ID=M_ID))
    conn.execute("UPDATE mission SET progressing=progressing+1 where ID = {m_ID};".format(m_ID=M_ID))#進行人數加一

    Member = conn.execute("SELECT member FROM mission where ID = {m_ID};".format(m_ID=M_ID))#拿出member
    Mem = Member.fetchone()[0] + User + ","
    conn.execute("UPDATE mission SET member = '{}' where ID = {};".format(Mem, M_ID))#紀錄誰在做
    
    conn.commit()
    conn.close()

def giveup(conn, User, M_ID):#傳入使用者名字和要放棄的任務
    conn.execute("DELETE FROM {user} WHERE ID = {m_ID} and completed = 0;".format(user=User, m_ID=M_ID))
    conn.execute("UPDATE mission SET progressing=progressing-1 where ID = {m_ID};".format(m_ID=M_ID))#進行人數減一
    Member = conn.execute("SELECT member FROM mission where ID = {m_ID};".format(m_ID=M_ID))#拿出member
    Mem = Member.fetchone()[0]
    _member=Mem.split(",")
    _member.remove("{}".format(User))
    str = ",".join(_member)
    conn.execute("UPDATE mission SET member='{m}' where ID = {m_ID};".format(m=str,m_ID=M_ID))#把完成的人刪掉
    conn.commit()
    conn.close()

def doing(conn, User):#進行中任務
    data = conn.execute("select * from {user} where completed=0;".format(user=User))
    out = getJSON1(data)
    conn.commit()
    conn.close()
    return out

def getdetail(conn, User, M_ID):#給任務詳細資料
    rows = conn.execute("select * from mission WHERE ID = {m_ID};".format(m_ID=M_ID))
    Member = conn.execute("SELECT member FROM mission where ID = {m_ID};".format(m_ID=M_ID))#拿出member
    Mem = Member.fetchone()[0]
    _member=Mem.split(",")
    
    field_name = [des[0] for des in rows.description]#找到項目名
    _json=[]
    for row in rows:
        _row_json = dict()
        if(User in _member):
            _row_json["progress"] = "1"
        else:
            _row_json["progress"] = "0"
        for field in range(len(row)):
            if(field_name[field]!='ID'and field_name[field]!='category_no' and field_name[field]!='progressing' and field_name[field]!= 'member'and field_name[field]!= 'F_member'):
                _row_json[field_name[field]] = row[field]
    
    F_Member = conn.execute("SELECT F_member FROM mission where ID = {m_ID};".format(m_ID=M_ID))#拿出F_member
    F_Mem = F_Member.fetchone()[0]
    if(F_Mem != ','):
        f_member=F_Mem.split(",")
        check=True#有完成過的使用者
    else:
        check=False

    
    if(check == True):
        for F_mem in f_member :
            if(F_mem !=""):
                Picture = conn.execute("SELECT picture FROM {user} where ID = {m_ID} and completed = 1;".format(user=F_mem,m_ID=M_ID))#拿出Picture
                Pic = Picture.fetchone()
                if((Pic != None) and (Pic[0] != None)):
                    Pic = Pic[0]
                    pic=Pic.split(";;")
                    Picture_text = conn.execute("SELECT pic_text FROM {user} where ID = {m_ID};".format(user=F_mem,m_ID=M_ID))#拿出Pic_text
                    Pic_text = Picture_text.fetchone()[0]
                    pic_Text=Pic_text.split(";;")
                    Pic_detail=[]
                    for number in range(len(pic)-2):#去頭尾
                        Pic_Detail = dict()
                        Pic_Detail["picture"] = pic[number+1]#不要第一項
                        Pic_Detail["pic_text"] = pic_Text[number+1]
                        Pic_detail.append(Pic_Detail)
                    _row_json['Pic_detail'] = Pic_detail
    
    
    _json.append(_row_json)


    print(_json)
    #output = json.dumps(_json, ensure_ascii = False)
    
    conn.commit()
    conn.close()
    #return output

def getJSON1(rows):#轉成json，for doing
    _json=[]
    field_name = [des[0] for des in rows.description]#找到項目名
    for row in rows:
        _row_json = dict()
        for field in range(len(row)):
            if(field_name[field]=='name' or field_name[field]=='category' or field_name[field]=='ID'or field_name[field]== 'points'or field_name[field]== 'multiple'or field_name[field]== 'stage'or field_name[field]== 'now_stage'):
                _row_json[field_name[field]] = row[field]
        _json.append(_row_json)
    #print(_json)
    output = json.dumps(_json, ensure_ascii = False)
    return output

def getJSON2(rows):#轉成json，詳細的
    _json=[]
    field_name = [des[0] for des in rows.description]#找到項目名
    for row in rows:
        _row_json = dict()
        for field in range(len(row)):
            if(field_name[field]!='category_no' and field_name[field]!='progressing' and field_name[field]!= 'member'):
                _row_json[field_name[field]] = row[field]
        _json.append(_row_json)
    #print(_json)
    output = json.dumps(_json, ensure_ascii = False)
    return output

def player(conn, M_ID):
    Member = conn.execute("SELECT member FROM mission where ID = {m_ID};".format(m_ID=M_ID))#拿出member
    _json=[]
    Mem = Member.fetchone()[0]
    _member=Mem.split(",")
    _row_json = dict()
    _row_json['member'] = _member[1:-1]#去掉空的
    _json.append(_row_json)
    #print(_json)
    output = json.dumps(_json, ensure_ascii = False)
    
    conn.commit()
    conn.close()
    return output

def done(conn, User):#做過的任務
    rows = conn.execute("select * from {user} where completed=1;".format(user=User))
    _json = []
    field_name = [des[0] for des in rows.description]#找到項目名
    for row in rows:
        _row_json = dict()
        Member = conn.execute("SELECT member FROM mission where ID = {m_ID};".format(m_ID=row[7]))#拿出member
        Mem = Member.fetchone()[0]
        _member=Mem.split(",")
        if(User in _member):
            _row_json["progress"] = "1"
        else:
            _row_json["progress"] = "0"
        for field in range(len(row)):
            if(field_name[field]=='name' or field_name[field]=='category' or field_name[field]=='ID'or field_name[field]== 'multiple'):
                _row_json[field_name[field]] = row[field]
        _json.append(_row_json)
    #print(_json)
    output = json.dumps(_json, ensure_ascii = False)
    
    conn.commit()
    conn.close()
    return output

def submit(conn,conn2,conn3, User, M_ID, Pic, Pic_text):#提交任務(已修改)
    rows = conn.execute("select * from {user} where completed=1 and ID = {m_ID};".format(user=User, m_ID=M_ID))
    row = rows.fetchall()
    STAGE = conn.execute("select stage from {user} where ID = {m_ID};".format(user=User, m_ID=M_ID))#找階段數
    Stage=STAGE.fetchone()[0]
    N_STAGE = conn.execute("select now_stage from {user} where ID = {m_ID} and completed=0;".format(user=User, m_ID=M_ID))#找現階段數
    Nstage=N_STAGE.fetchone()[0]
    if(row == []):#非重複任務
        if(Stage != 1):#階段任務
            if(Nstage != Stage):#最終階未完成
                conn.execute("UPDATE {user} SET now_stage=now_stage+1 where ID = {m_ID};".format(user=User, m_ID=M_ID))#階段數加一
            else:#最終階完成
                conn.execute("UPDATE {user} SET completed=1 where ID = {m_ID};".format(user=User, m_ID=M_ID))#設為完成
        else:#非階段任務
            conn.execute("UPDATE {user} SET completed=1 where ID = {m_ID};".format(user=User, m_ID=M_ID))#設為完成
        conn.execute("UPDATE {user} SET picture= picture ||'{pic}'|| ';;' where ID = {m_ID};".format(user=User,pic=Pic, m_ID=M_ID))#儲存圖片
        conn.execute("UPDATE {user} SET pic_text= pic_text || '{pic_Text}'|| ';;'  where ID = {m_ID};".format(user=User, pic_Text=Pic_text, m_ID=M_ID))#儲存圖片敘述
        repeat = False
    else:#重複任務
        if(Stage != 1):#階段任務
            if(Nstage != Stage):#最終階未完成
                conn.execute("UPDATE {user} SET now_stage=now_stage+1 where ID = {m_ID} and completed=0;".format(user=User, m_ID=M_ID))#階段數加一
                conn.execute("UPDATE {user} SET picture= picture ||'{pic}'|| ';;' where ID = {m_ID};".format(user=User,pic=Pic, m_ID=M_ID))#儲存圖片
                conn.execute("UPDATE {user} SET pic_text= pic_text || '{pic_Text}'|| ';;'  where ID = {m_ID};".format(user=User, pic_Text=Pic_text, m_ID=M_ID))#儲存圖片敘述
            else:#最終階完成
                conn.execute("UPDATE {user} SET picture= picture ||'{pic}'|| ';;' where ID = {m_ID};".format(user=User,pic=Pic, m_ID=M_ID))#儲存圖片
                conn.execute("UPDATE {user} SET pic_text= pic_text || '{pic_Text}'|| ';;'  where ID = {m_ID};".format(user=User, pic_Text=Pic_text, m_ID=M_ID))#儲存圖片敘述
                conn.execute("DELETE FROM {user} WHERE ID = {m_ID} and completed = 0;".format(user=User, m_ID=M_ID))
        else:#非階段任務
            conn.execute("UPDATE {user} SET picture= picture ||'{pic}'|| ';;' where ID = {m_ID};".format(user=User,pic=Pic, m_ID=M_ID))#儲存圖片
            conn.execute("UPDATE {user} SET pic_text= pic_text || '{pic_Text}'|| ';;'  where ID = {m_ID};".format(user=User, pic_Text=Pic_text, m_ID=M_ID))#儲存圖片敘述
            conn.execute("DELETE FROM {user} WHERE ID = {m_ID} and completed = 0;".format(user=User, m_ID=M_ID))
        repeat = True
        
    
    POINT = conn.execute("select points from {user} where ID = {m_ID};".format(user=User, m_ID=M_ID))#找任務分數
    if(Stage != 1):
        Point=POINT.fetchone()[0]/Stage#分次給
    else:
        Point=POINT.fetchone()[0]
    
    cat = conn.execute("select category_no from {user} where ID = {m_ID};".format(user=User, m_ID=M_ID))#找分類
    Category=cat.fetchone()[0]
    if(Category == 1):#工作
        Pts=conn2.execute("SELECT sport from users where ID = '{user}';".format(point=Point, user=User))#拿原分數
        pts = Pts.fetchone()[0]#原分數
        conn2.execute("UPDATE users SET sport= sport+{point} where ID = '{user}';".format(point=Point, user=User))#加分
        conn2.execute("UPDATE users SET total= total+{point} where ID = '{user}';".format(point=Point, user=User))#加總分
        if(pts<100 and pts+Point>=100):
            conn3.execute("create table if not exists {user}(name text, category text, description text, points integer, ID text, chosen boolean DEFAULT(0), category_no integer)".format(user=User))#建立玩家稱號清單
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='101'))
        elif(pts<300 and pts+Point>=300):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='102'))
        elif(pts<500 and pts+Point>=500):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='103'))
        elif(pts<1000 and pts+Point>=1000):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='104'))
    elif(Category == 2):#感情
        Pts=conn2.execute("SELECT self from users where ID = '{user}';".format(point=Point, user=User))#拿原分數
        pts = Pts.fetchone()[0]#原分數
        conn2.execute("UPDATE users SET self= self+{point} where ID = '{user}';".format(point=Point, user=User))#加分
        conn2.execute("UPDATE users SET total= total+{point} where ID = '{user}';".format(point=Point, user=User))#加總分
        if(pts<100 and pts+Point>=100):
            conn3.execute("create table if not exists {user}(name text, category text, description text, points integer, ID text, chosen boolean DEFAULT(0), category_no integer)".format(user=User))#建立玩家稱號清單
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='201'))
        elif(pts<300 and pts+Point>=300):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='202'))
        elif(pts<500 and pts+Point>=500):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='203'))
        elif(pts<1000 and pts+Point>=1000):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='204'))
    elif(Category == 3):
        Pts=conn2.execute("SELECT food from users where ID = '{user}';".format(point=Point, user=User))#拿原分數
        pts = Pts.fetchone()[0]#原分數
        conn2.execute("UPDATE users SET food= food+{point} where id = '{user}';".format(point=Point, user=User))#加分
        conn2.execute("UPDATE users SET total= total+{point} where ID = '{user}';".format(point=Point, user=User))#加總分
        if(pts<100 and pts+Point>=100):
            conn3.execute("create table if not exists {user}(name text, category text, description text, points integer, ID text, chosen boolean DEFAULT(0), category_no integer)".format(user=User))#建立玩家稱號清單
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='301'))
        elif(pts<300 and pts+Point>=300):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='302'))
        elif(pts<500 and pts+Point>=500):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='303'))
        elif(pts<1000 and pts+Point>=1000):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='304'))
    elif(Category == 4):
        Pts=conn2.execute("SELECT activity from users where ID = '{user}';".format(point=Point, user=User))#拿原分數
        pts = Pts.fetchone()[0]#原分數
        conn2.execute("UPDATE users SET activity= activity+{point} where ID = '{user}';".format(point=Point, user=User))#加分
        conn2.execute("UPDATE users SET total= total+{point} where ID = '{user}';".format(point=Point, user=User))#加總分
        if(pts<100 and pts+Point>=100):
            conn3.execute("create table if not exists {user}(name text, category text, description text, points integer, ID text, chosen boolean DEFAULT(0), category_no integer)".format(user=User))#建立玩家稱號清單
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='401'))
        elif(pts<300 and pts+Point>=300):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='402'))
        elif(pts<500 and pts+Point>=500):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='403'))
        elif(pts<1000 and pts+Point>=1000):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='404'))
        if(M_ID == "402"and repeat == False):
            conn3.execute("create table if not exists {user}(name text, category text, description text, points integer, ID text, chosen boolean DEFAULT(0), category_no integer)".format(user=User))#建立玩家稱號清單
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='405'))
    elif(Category == 5):
        Pts=conn2.execute("SELECT travel from users where ID = '{user}';".format(point=Point, user=User))#拿原分數
        pts = Pts.fetchone()[0]#原分數
        conn2.execute("UPDATE users SET travel= travel+{point} where ID = '{user}';".format(point=Point, user=User))#加分
        conn2.execute("UPDATE users SET total= total+{point} where ID = '{user}';".format(point=Point, user=User))#加總分
        if(pts<100 and pts+Point>=100):
            conn3.execute("create table if not exists {user}(name text, category text, description text, points integer, ID text, chosen boolean DEFAULT(0), category_no integer)".format(user=User))#建立玩家稱號清單
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='501'))
        elif(pts<300 and pts+Point>=300):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='502'))
        elif(pts<500 and pts+Point>=500):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='503'))
        elif(pts<1000 and pts+Point>=1000):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='504'))
        if(M_ID == "513"and repeat == False and Nstage == Stage):
            conn3.execute("create table if not exists {user}(name text, category text, description text, points integer, ID text, chosen boolean DEFAULT(0), category_no integer)".format(user=User))#建立玩家稱號清單
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='505'))
    elif(Category == 6):#朋友
        Pts=conn2.execute("SELECT social from users where ID = '{user}';".format(point=Point, user=User))#拿原分數
        pts = Pts.fetchone()[0]#原分數
        conn2.execute("UPDATE users SET social= social+{point} where ID = '{user}';".format(point=Point, user=User))#加分
        conn2.execute("UPDATE users SET total= total+{point} where ID = '{user}';".format(point=Point, user=User))#加總分
        if(pts<100 and pts+Point>=100):
            conn3.execute("create table if not exists {user}(name text, category text, description text, points integer, ID text, chosen boolean DEFAULT(0), category_no integer)".format(user=User))#建立玩家稱號清單
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='601'))
        elif(pts<300 and pts+Point>=300):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='602'))
        elif(pts<500 and pts+Point>=500):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='603'))
        elif(pts<1000 and pts+Point>=1000):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='604'))
    if(Nstage == Stage):
        conn.execute("UPDATE mission SET progressing=progressing-1 where ID = {m_ID};".format(m_ID=M_ID))#進行人數減一
        Member = conn.execute("SELECT member FROM mission where ID = {m_ID};".format(m_ID=M_ID))#拿出member
        Mem = Member.fetchone()[0]
        _member=Mem.split(",")
        _member.remove("{}".format(User))
        str = ",".join(_member)
        conn.execute("UPDATE mission SET member='{m}' where ID = {m_ID};".format(m=str,m_ID=M_ID))#把完成的人刪掉
    conn.commit()
    conn.close()
    conn2.commit()
    conn2.close()
    conn3.commit()
    conn3.close()

def maylike(conn, User):#可能喜歡的任務(目前功能陽春)
    recent = conn.execute("select category_no from {user} order by date DESC LIMIT 1;".format(user=User))#最近做過的任務的類別
    like=recent.fetchone()[0]
    rows = conn.execute("select * from mission where category_no = {recommend};".format(recommend=like))
    _json = []
    field_name = [des[0] for des in rows.description]#找到項目名
    for row in rows:
        _row_json = dict()
        Member = conn.execute("SELECT member FROM mission where ID = {m_ID};".format(m_ID=row[7]))#拿出member
        Mem = Member.fetchone()[0]
        _member=Mem.split(",")
        if(User in _member):
            _row_json["progress"] = "1"
        else:
            _row_json["progress"] = "0"
        for field in range(len(row)):
            if(field_name[field]!='category_no' and field_name[field]!='progressing' and field_name[field]!= 'member'):
                _row_json[field_name[field]] = row[field]
        _json.append(_row_json)
    #print(_json)
    output = json.dumps(_json, ensure_ascii = False)
    
    conn.commit()
    conn.close()
    return output

def popular(conn, User):#很多人在做的任務
    rows = conn.execute("select * from mission order by progressing DESC limit 10;")#從多人進行中的任務排到少人
    _json = []
    field_name = [des[0] for des in rows.description]#找到項目名
    for row in rows:
        _row_json = dict()
        Member = conn.execute("SELECT member FROM mission where ID = {m_ID};".format(m_ID=row[7]))#拿出member
        Mem = Member.fetchone()[0]
        _member=Mem.split(",")
        if(User in _member):
            _row_json["progress"] = "1"
        else:
            _row_json["progress"] = "0"
        for field in range(len(row)):
            if(field_name[field]!='category_no' and field_name[field]!='progressing' and field_name[field]!= 'member'):
                _row_json[field_name[field]] = row[field]
        _json.append(_row_json)
    #print(_json)
    output = json.dumps(_json, ensure_ascii = False)
    
    conn.commit()
    conn.close()
    return output

def search_pts(conn, User, num1, num2):
    rows = conn.execute("select * from mission where points between {Num1} and {Num2};".format(Num1=num1,Num2=num2))
    _json = []
    field_name = [des[0] for des in rows.description]#找到項目名
    for row in rows:
        _row_json = dict()
        Member = conn.execute("SELECT member FROM mission where ID = {m_ID};".format(m_ID=row[7]))#拿出member
        Mem = Member.fetchone()[0]
        _member=Mem.split(",")
        if(User in _member):
            _row_json["progress"] = "1"
        else:
            _row_json["progress"] = "0"
        for field in range(len(row)):
            if(field_name[field]!='category_no' and field_name[field]!='progressing' and field_name[field]!= 'member'):
                _row_json[field_name[field]] = row[field]
        _json.append(_row_json)
    #print(_json)
    output = json.dumps(_json, ensure_ascii = False)
    conn.commit()
    conn.close()
    return output

def allpic(conn, User):
    Picture = conn.execute("SELECT picture FROM {user};".format(user=User))#拿出Picture
    Pic = Picture.fetchall()
    Picture_text = conn.execute("SELECT pic_text FROM {user};".format(user=User))#拿出Pic_text
    Pic_text = Picture_text.fetchall()
    pic_id = conn.execute("SELECT ID FROM {user};".format(user=User))#拿出id
    Pic_id = pic_id.fetchall()
    Pic_detail=[]
    for num in range(len(Pic)):
        if(Pic[num] != (';;',)):
            pic=Pic[num][0].split(";;")
            pic_Text=Pic_text[num][0].split(";;")
            for number in range(len(pic)-2):#去頭尾
                Pic_Detail = dict()
                Pic_Detail["picture"] = pic[number+1]#不要第一項
                Pic_Detail["pic_text"] = pic_Text[number+1]
                Pic_Detail["ID"] = Pic_id[num][0]
                Pic_detail.append(Pic_Detail)

    #print(Pic_detail)
    output = json.dumps(Pic_detail, ensure_ascii = False)
    conn.commit()
    conn.close()
    return output

def alltitle(conn, User):#傳入使用者名字
    conn.execute("create table if not exists {user}(name text, category text, description text, points integer, ID text, chosen boolean DEFAULT(0), category_no integer)".format(user=User))#建立玩家任務清單
    _json=[]
    rows = conn.execute("select * from {user};".format(user=User))
    field_name = [des[0] for des in rows.description]#找到項目名
    for row in rows:
        _row_json = dict()
        for field in range(len(row)):
            _row_json[field_name[field]] = row[field]
        _json.append(_row_json)
    #print(_json)
    output = json.dumps(_json, ensure_ascii = False)
    
    conn.commit()
    conn.close()
    return output

def choosetitle(conn, User, T_ID):#傳入使用者名字和要選的稱號
    conn.execute("UPDATE {user} SET chosen= 0 where chosen=1;".format(user=User))
    conn.execute("UPDATE {user} SET chosen= 1 where ID = {t_ID};".format(user=User, t_ID=T_ID))#設為完成
    conn.commit()
    conn.close()

def leaderboard(conn, category):
    if(category == 1):
        rows = conn.execute("select name,sport,image from users order by sport DESC;")
    elif(category == 2):
        rows = conn.execute("select name,self,image from users order by self DESC;")
    elif(category == 3):
        rows = conn.execute("select name,food,image from users order by food DESC;")
    elif(category == 4):
        rows = conn.execute("select name,activity,image from users order by activity DESC;")
    elif(category == 5):
        rows = conn.execute("select name,travel,image from users order by travel DESC;")
    elif(category == 6):
        rows = conn.execute("select name,social,image from users order by social DESC;")
    elif(category == 7):
        rows = conn.execute("select name,total,image from users order by total DESC;")
    data=rows.fetchall()
    _json=[]
    field_name = [des[0] for des in rows.description]#找到項目名
    for row in rows:
        _row_json = dict()
        for field in range(len(row)):
            _row_json[field_name[field]] = row[field]
        _json.append(_row_json)
    output = json.dumps(data, ensure_ascii = False)
    #print(data)
    return output


def find_M_friend(conn, User, M_ID):#User,找到User這個人的所有有該任務的好友
    data={}
    with open("./json/friend.json", 'r',encoding='utf-8') as obj:
        output = json.load(obj)
    for i in range(len(output)): 
        
        if output[i][0]==User:
            data={"friend":output[i][1:]}
    
    Member = conn.execute("SELECT member FROM mission where ID = {m_ID};".format(m_ID=M_ID))#拿出member
    _json=[]
    Mem = Member.fetchone()[0]
    _member=Mem.split(",")
    _row_json = dict()
    _mem=[]
    for Mem in data["friend"]:
        if Mem in _member[1:-1]:#去掉空的
            _mem.append(Mem)
    _row_json["M_friend"] = _mem
    _json.append(_row_json)
    #print(_json)
    output = json.dumps(_json, ensure_ascii = False)
    return output
    
def addmission(conn, User, m_name, cat, multi, descript, gui, diff):
    conn.execute("INSERT INTO mission (name, multiple, category, description, guide, difficulty, author) VALUES ('{M_name}', '{Multi}', '{Cat}', '{Descript}', '{Guide}', {Diff}, '{Author}');".format(M_name=m_name, Multi=multi, Cat=cat, Descript=descript, Guide=gui, Diff=diff, Author=User))
    conn.commit()
    conn.close()


def allstatus(conn, User):#給user id回傳他發起的所有任務及狀態
    rows = conn.execute("select * from mission where author = '{Author}';".format(Author=User))
    _json = []
    field_name = [des[0] for des in rows.description]#找到項目名
    for row in rows:
        _row_json = dict()
        for field in range(len(row)):
            _row_json[field_name[field]] = row[field]
        _json.append(_row_json)
    #print(_json)
    output = json.dumps(_json, ensure_ascii = False)
    
    conn.commit()
    conn.close()
    return output

def waiting(conn):#回傳全部未審核的任務
    rows = conn.execute("select * from mission where status = 0;")
    _json = []
    field_name = [des[0] for des in rows.description]#找到項目名
    for row in rows:
        _row_json = dict()
        for field in range(len(row)):
            _row_json[field_name[field]] = row[field]
        _json.append(_row_json)
    #print(_json)
    output = json.dumps(_json, ensure_ascii = False)
    
    conn.commit()
    conn.close()
    return output

def update(conn, conn2, m_name, stat, M_ID, Point):#更新任務狀態，如果通過就傳1，不通過就傳2，並給一個新ID
    conn.execute("UPDATE mission SET status={Stat} where name = '{M_name}';".format(Stat=stat, M_name=m_name))#更新狀態
    if(stat == 1):
        rows = conn.execute("select * from mission where name = '{M_name}';".format(M_name=m_name))
        field_name = [des[0] for des in rows.description]#找到項目名
        AllStatus = dict()
        for row in rows:
            for field in range(len(row)):
                AllStatus[field_name[field]] = row[field]
        if(AllStatus['category'] == "工作"):
            cat_no=1
        elif(AllStatus['category'] == "感情"):
            cat_no=2
        elif(AllStatus['category'] == "美食"):
            cat_no=3
        elif(AllStatus['category'] == "活動"):
            cat_no=4
        elif(AllStatus['category'] == "旅遊"):
            cat_no=5
        elif(AllStatus['category'] == "朋友"):
            cat_no=6
        conn2.execute("INSERT INTO mission (name, multiple, category, description, guide, difficulty, points, ID, category_no, progressing, stage, member, F_member) VALUES ('{M_name}', '{Multi}', '{Cat}', '{Descript}', '{Guide}', '{diff}', {point}, '{m_ID}', {Cat_no}, 0, 1, ',', ',');".format(M_name=m_name, Multi=AllStatus['multiple'], Cat=AllStatus['category'], Descript=AllStatus['description'], Guide=AllStatus['guide'], diff=AllStatus['difficulty'], point=Point, m_ID=M_ID, Cat_no=cat_no))
    conn.commit()
    conn.close()
    conn2.commit()
    conn2.close()




#sys.argv[]：1為調用函式、2為使用者ID、3為任務ID、4為圖片、5為圖片敘述、6為下界、7為上界
sys.stdout.reconfigure(encoding='utf-8')
con = sqlite3.connect('./database/mission.db')
con2 = sqlite3.connect('./database/users.db')
con3 = sqlite3.connect('./database/title.db')


#sys.argv[]：1為調用函式、2為使用者ID、3為任務ID、4為圖片、5為圖片敘述

if(sys.argv[1] == '0'):#全部任務
    print(allmission(con, sys.argv[2]))
elif(sys.argv[1] == '1'):#你可能會喜歡的任務
    print(maylike(con, sys.argv[2]))
elif(sys.argv[1] == '2'):#熱門任務
    print(popular(con, sys.argv[2]))
elif(sys.argv[1] == '3'):#進行中任務
    print(doing(con, sys.argv[2]))
elif(sys.argv[1] == '4'):#做過的任務
    print(done(con, sys.argv[2]))
elif(sys.argv[1] == '5'):#接取任務
    accept(con, sys.argv[2], sys.argv[3])
elif(sys.argv[1] == '6'):#放棄任務
    giveup(con, sys.argv[2], sys.argv[3])
elif(sys.argv[1] == '7'):#提交任務
    submit(con, con2, con3, sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5])
elif(sys.argv[1] == '8'):#給任務詳細資料
    print(getdetail(con, sys.argv[2], sys.argv[3]))
elif(sys.argv[1] == '9'):#回傳同樣在執行該任務的玩家
    print(player(con, sys.argv[2]))
elif(sys.argv[1] == '10'):#給分數區間3為下界、4為上界
    print(search_pts(con, sys.argv[2], sys.argv[3], sys.argv[4]))
elif(sys.argv[1] == '11'):#回傳所有照片
    print(allpic(con, sys.argv[2]))
elif(sys.argv[1] == '12'):#回傳所有稱號
    print(alltitle(con3, sys.argv[2]))
elif(sys.argv[1] == '13'):#選擇稱號、3為稱號ID
    choosetitle(con3, sys.argv[2], sys.argv[3])
elif(sys.argv[1] == '14'):#排行榜、2為分數類別(EX：1為工作,2....,7為總分)
    print(leaderboard(con2, sys.argv[2]))
elif(sys.argv[1] == '15'):#找到相同任務的好友
    print(find_M_friend(con, sys.argv[2], sys.argv[3]))
elif(sys.argv[1] == '16'):#新增任務，2是玩家id，3是任務名，4是任務分類，5是人數，6是任務敘述，7是任務目標，8是任務難度
    addmission(con4, sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5], sys.argv[6], sys.argv[7], sys.argv[8])
elif(sys.argv[1] == '17'):#給user id回傳他發起的所有任務及狀態，2為id
    print(allstatus(con4, sys.argv[2]))
elif(sys.argv[1] == '18'):#回傳全部未審核的任務
    print(waiting(con4))
elif(sys.argv[1] == '19'):#審核任務並更新任務狀態，1是任務名，2是任務審核狀態，3是要給的新id，4是任務能獲得的分數，若審核不給過id和分數隨便給就好不會記錄
    update(con4, con, sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5])