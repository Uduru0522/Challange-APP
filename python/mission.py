import sqlite3
import sys
import json

def allmission(conn, User):
    rows = conn.execute("select * from mission;")
    data = conn.execute("select * from {user};".format(user=User))
    _json = []
    
    field_name = [des[0] for des in rows.description]#找到項目名
    for row in rows:
        _row_json = dict()
        Member = conn.execute("SELECT member FROM mission where ID = {m_ID};".format(m_ID=row[4]))#拿出member
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
    conn.execute("create table if not exists {user}(name text, category text, description text, points integer, ID TEXT, completed boolean DEFAULT(0), date time DATE DEFAULT (datetime('now','localtime')), category_no integer, picture text, pic_text TEXT)".format(user=User))#建立玩家任務清單
    conn.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM mission WHERE ID= {m_ID};".format(user=User, m_ID=M_ID))
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
            if(field_name[field]!='category_no' and field_name[field]!='progressing' and field_name[field]!= 'member'and field_name[field]!= 'picture'and field_name[field]!= 'pic_text'):
                _row_json[field_name[field]] = row[field]
    
    Picture = conn.execute("SELECT picture FROM {user} where ID = {m_ID};".format(user=User,m_ID=M_ID))#拿出Picture
    Pic = Picture.fetchone()
    if((Pic != None) and (Pic[0] != None)):
        Pic = Pic[0]
        pic=Pic.split(";;")
        Picture_text = conn.execute("SELECT pic_text FROM {user} where ID = {m_ID};".format(user=User,m_ID=M_ID))#拿出Pic_text
        Pic_text = Picture_text.fetchone()[0]
        pic_Text=Pic_text.split(";;")
        Pic_detail=[]
        for num in range(len(pic)):
            Pic_Detail = dict()
            Pic_Detail["picture"] = pic[num]
            Pic_Detail["pic_text"] = pic_Text[num]
            Pic_detail.append(Pic_Detail)
        _row_json['Pic_detail'] = Pic_detail
    _json.append(_row_json)
    #print(_json)
    output = json.dumps(_json, ensure_ascii = False)
    
    conn.commit()
    conn.close()
    return output

def getJSON1(rows):#轉成json，簡略版
    _json=[]
    field_name = [des[0] for des in rows.description]#找到項目名
    for row in rows:
        _row_json = dict()
        for field in range(len(row)):
            if(field_name[field]=='name' or field_name[field]=='category' or field_name[field]=='ID'or field_name[field]=='completed'or field_name[field]== 'points'):
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
    data = conn.execute("select * from {user};".format(user=User))
    _json = []
    field_name = [des[0] for des in rows.description]#找到項目名
    for row in rows:
        _row_json = dict()
        Member = conn.execute("SELECT member FROM mission where ID = {m_ID};".format(m_ID=row[4]))#拿出member
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
    if(row == []):#非重複任務
        conn.execute("UPDATE {user} SET picture='{pic}' where ID = {m_ID};".format(user=User,pic=Pic, m_ID=M_ID))#設為完成
        conn.execute("UPDATE {user} SET completed=1 where ID = {m_ID};".format(user=User, m_ID=M_ID))#設為完成
        conn.execute("UPDATE {user} SET pic_text='{pic_Text}' where ID = {m_ID};".format(user=User, pic_Text=Pic_text, m_ID=M_ID))#設為完成
        repeat = False
    else:
        conn.execute("UPDATE {user} SET picture= picture || ';;'||'{pic}' where ID = {m_ID};".format(user=User,pic=Pic, m_ID=M_ID))#設為完成
        conn.execute("UPDATE {user} SET pic_text= pic_text || ';;' || '{pic_Text}' where ID = {m_ID};".format(user=User, pic_Text=Pic_text, m_ID=M_ID))#設為完成
        conn.execute("DELETE FROM {user} WHERE ID = {m_ID} and completed = 0;".format(user=User, m_ID=M_ID))
        repeat = True
        
    
    POINT = conn.execute("select points from {user} where ID = {m_ID};".format(user=User, m_ID=M_ID))#找分數
    Point=POINT.fetchone()[0]
    
    cat = conn.execute("select category_no from {user} where ID = {m_ID};".format(user=User, m_ID=M_ID))#找分類
    Category=cat.fetchone()[0]
    if(Category == 1):
        Pts=conn2.execute("SELECT sport from users where ID = '{user}';".format(point=Point, user=User))#拿原分數
        pts = Pts.fetchone()[0]+Point#加總後分數
        conn2.execute("UPDATE users SET sport={point} where ID = '{user}';".format(point=pts, user=User))#加分
        if(Point<100 and pts>=100):
            conn3.execute("create table if not exists {user}(name text, category text, description text, points integer, ID integer, chosen boolean DEFAULT(0), category_no integer)".format(user=User))#建立玩家稱號清單
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='101'))
        elif(Point<300 and pts>=300):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='102'))
        elif(Point<500 and pts>=500):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='103'))
        elif(Point<1000 and pts>=1000):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='104'))
    elif(Category == 2):
        Pts=conn2.execute("SELECT social from users where ID = '{user}';".format(point=Point, user=User))#拿原分數
        pts = Pts.fetchone()[0]+Point#加總後分數
        conn2.execute("UPDATE users SET social={point} where ID = '{user}';".format(point=pts, user=User))#加分
        if(Point<100 and pts>=100):
            conn3.execute("create table if not exists {user}(name text, category text, description text, points integer, ID integer, chosen boolean DEFAULT(0), category_no integer)".format(user=User))#建立玩家稱號清單
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='201'))
        elif(Point<300 and pts>=300):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='202'))
        elif(Point<500 and pts>=500):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='203'))
        elif(Point<1000 and pts>=1000):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='204'))
        if(M_ID == "204" and repeat == False):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='205'))
    elif(Category == 3):
        Pts=conn2.execute("SELECT food from users where ID = '{user}';".format(point=Point, user=User))#拿原分數
        pts = Pts.fetchone()[0]+Point#加總後分數
        conn2.execute("UPDATE users SET food={point} where id = '{user}';".format(point=pts, user=User))#加分
        if(Point<100 and pts>=100):
            conn3.execute("create table if not exists {user}(name text, category text, description text, points integer, ID integer, chosen boolean DEFAULT(0), category_no integer)".format(user=User))#建立玩家稱號清單
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='301'))
        elif(Point<300 and pts>=300):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='302'))
        elif(Point<500 and pts>=500):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='303'))
        elif(Point<1000 and pts>=1000):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='304'))
        if(M_ID == "304"and repeat == False):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='305'))
    elif(Category == 4):
        Pts=conn2.execute("SELECT activity from users where ID = '{user}';".format(point=Point, user=User))#拿原分數
        pts = Pts.fetchone()[0]+Point#加總後分數
        conn2.execute("UPDATE users SET activity={point} where ID = '{user}';".format(point=pts, user=User))#加分
        if(Point<100 and pts>=100):
            conn3.execute("create table if not exists {user}(name text, category text, description text, points integer, ID integer, chosen boolean DEFAULT(0), category_no integer)".format(user=User))#建立玩家稱號清單
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='401'))
        elif(Point<300 and pts>=300):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='402'))
        elif(Point<500 and pts>=500):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='403'))
        elif(Point<1000 and pts>=1000):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='404'))
        if(M_ID == "402"and repeat == False):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='405'))
    elif(Category == 5):
        Pts=conn2.execute("SELECT travel from users where ID = '{user}';".format(point=Point, user=User))#拿原分數
        pts = Pts.fetchone()[0]+Point#加總後分數
        conn2.execute("UPDATE users SET travel={point} where ID = '{user}';".format(point=pts, user=User))#加分
        if(Point<100 and pts>=100):
            conn3.execute("create table if not exists {user}(name text, category text, description text, points integer, ID integer, chosen boolean DEFAULT(0), category_no integer)".format(user=User))#建立玩家稱號清單
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='501'))
        elif(Point<300 and pts>=300):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='502'))
        elif(Point<500 and pts>=500):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='503'))
        elif(Point<1000 and pts>=1000):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='504'))
        if(M_ID == "513"and repeat == False):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='505'))
        if(M_ID == "515"and repeat == False):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='506'))
    elif(Category == 6):
        Pts=conn2.execute("SELECT self from users where ID = '{user}';".format(point=Point, user=User))#拿原分數
        pts = Pts.fetchone()[0]+Point#加總後分數
        conn2.execute("UPDATE users SET self={point} where ID = '{user}';".format(point=pts, user=User))#加分
        if(Point<100 and pts>=100):
            conn3.execute("create table if not exists {user}(name text, category text, description text, points integer, ID integer, chosen boolean DEFAULT(0), category_no integer)".format(user=User))#建立玩家稱號清單
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='601'))
        elif(Point<300 and pts>=300):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='602'))
        elif(Point<500 and pts>=500):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='603'))
        elif(Point<1000 and pts>=1000):
            conn3.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM title WHERE ID= {m_ID};".format(user=User, m_ID='604'))

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
    data = conn.execute("select * from {user};".format(user=User))
    _json = []
    field_name = [des[0] for des in rows.description]#找到項目名
    for row in rows:
        _row_json = dict()
        Member = conn.execute("SELECT member FROM mission where ID = {m_ID};".format(m_ID=row[4]))#拿出member
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
    data = conn.execute("select * from {user};".format(user=User))
    _json = []
    field_name = [des[0] for des in rows.description]#找到項目名
    for row in rows:
        _row_json = dict()
        Member = conn.execute("SELECT member FROM mission where ID = {m_ID};".format(m_ID=row[4]))#拿出member
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
    data = conn.execute("select * from {user};".format(user=User))
    _json = []
    field_name = [des[0] for des in rows.description]#找到項目名
    for row in rows:
        _row_json = dict()
        Member = conn.execute("SELECT member FROM mission where ID = {m_ID};".format(m_ID=row[4]))#拿出member
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
        if(Pic[num] != (None,)):
            pic=Pic[num][0].split(";;")
            pic_Text=Pic_text[num][0].split(";;")
            for number in range(len(pic)):
                Pic_Detail = dict()
                Pic_Detail["picture"] = pic[number]
                Pic_Detail["pic_text"] = pic_Text[number]
                Pic_Detail["ID"] = Pic_id[num][0]
                Pic_detail.append(Pic_Detail)

    #print(Pic_detail)
    output = json.dumps(Pic_detail, ensure_ascii = False)
    conn.commit()
    conn.close()
    return output

def alltitle(conn, User):#傳入使用者名字
    conn.execute("create table if not exists {user}(name text, category text, description text, points integer, ID integer, chosen boolean DEFAULT(0), category_no integer)".format(user=User))#建立玩家任務清單
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




#sys.argv[]：1為調用函式、2為使用者ID、3為任務ID、4為圖片、5為圖片敘述、6為下界、7為上界
sys.stdout.reconfigure(encoding='utf-8')
con = sqlite3.connect('./database/mission.db')
con2 = sqlite3.connect('./database/users.db')
con3 = sqlite3.connect('./database/title.db')


#sys.argv[]：1為調用函式、2為使用者ID、3為任務ID、4為圖片、5為圖片敘述、6為下界、7為上界、8為稱號ID

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
elif(sys.argv[1] == '10'):#給分數區間
    print(search_pts(con, sys.argv[2], sys.argv[3], sys.argv[4]))
elif(sys.argv[1] == '11'):#回傳所有照片
    print(allpic(con, sys.argv[2]))
elif(sys.argv[1] == '12'):#回傳所有稱號
    print(alltitle(con3, sys.argv[2]))
elif(sys.argv[1] == '13'):#選擇稱號
<<<<<<< HEAD
    choosetitle(con3, sys.argv[2], sys.argv[3])

    
=======
    choosetitle(con3, sys.argv[2], sys.argv[3])
>>>>>>> 6aff930a64d2d84f2377ec3ab41be54217418a72
