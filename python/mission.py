import sqlite3
import sys
import json

def allmission(conn):
    data = conn.execute("select * from mission;")
    out = getJSON1(data)
    conn.commit()
    conn.close()
    return out

def accept(conn, User, M_ID):#傳入使用者名字和要接的任務(還無法儲存目前進行的用戶)
    conn.execute("create table if not exists {user}(name text, category text, description text, points integer, ID integer, completed boolean DEFAULT(0), date time DATE DEFAULT (datetime('now','localtime')), category_no integer, picture text)".format(user=User))#建立玩家任務清單
    conn.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM mission WHERE ID= {m_ID};".format(user=User, m_ID=M_ID))
    conn.execute("UPDATE mission SET progressing=progressing+1 where ID = {m_ID};".format(m_ID=M_ID))#進行人數加一

    Member = conn.execute("SELECT member FROM mission where ID = {m_ID};".format(m_ID=M_ID))#拿出member
    Mem = Member.fetchone()[0] + User + ","
    conn.execute("UPDATE mission SET member = '{}' where ID = {};".format(Mem, M_ID))#紀錄誰在做
    
    conn.commit()
    conn.close()

def giveup(conn, User, M_ID):#傳入使用者名字和要放棄的任務
    conn.execute("DELETE FROM {user} WHERE ID = {m_ID};".format(user=User, m_ID=M_ID))
    conn.execute("UPDATE mission SET progressing=progressing-1 where ID = {m_ID};".format(m_ID=M_ID))#進行人數減一
    Member = conn.execute("SELECT member FROM mission where ID = {m_ID};".format(m_ID=M_ID))#拿出member
    Mem = Member.fetchone()[0]
    _member=Mem.split(",")
    _member.remove("{}".format(User))
    str = ",".join(_member)
    conn.execute("UPDATE mission SET member='{m}' where ID = {m_ID};".format(m=str,m_ID=M_ID))#把放棄的人刪掉
    conn.commit()
    conn.close()

def doing(conn, User):#進行中任務
    data = conn.execute("select * from {user} where completed=0;".format(user=User))
    out = getJSON1(data)
    conn.commit()
    conn.close()
    return out

def getdetail(conn, M_ID):#給任務詳細資料
    data = conn.execute("select * from mission WHERE ID = {m_ID};".format(m_ID=M_ID))
    out = getJSON2(data)
    conn.commit()
    conn.close()
    return out

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

def player(conn, M_ID):#回傳同樣在執行該任務的玩家
    Member = conn.execute("SELECT member FROM mission where ID = {m_ID};".format(m_ID=M_ID))#拿出member
    _json=[]
    Mem = Member.fetchone()[0]
    _member=Mem.split(",")
    _row_json = dict()
    _row_json['member'] = _member[:-1]#去掉空的
    _json.append(_row_json)
    #print(_json)
    output = json.dumps(_json, ensure_ascii = False)
    return output

def done(conn, User):#做過的任務
    data = conn.execute("select * from {user} where completed=1;".format(user=User))
    out = getJSON1(data)
    conn.commit()
    conn.close()
    return out

def submit(conn, User, M_ID, Pic):#提交任務(已修改)
    conn.execute("UPDATE {user} SET picture='{pic}' where ID = {m_ID};".format(user=User,pic=Pic, m_ID=M_ID))#設為完成
    conn.execute("UPDATE {user} SET completed=1 where ID = {m_ID};".format(user=User, m_ID=M_ID))#設為完成
    conn.execute("UPDATE mission SET progressing=progressing-1 where ID = {m_ID};".format(m_ID=M_ID))#進行人數減一
    Member = conn.execute("SELECT member FROM mission where ID = {m_ID};".format(m_ID=M_ID))#拿出member
    Mem = Member.fetchone()[0]
    _member=Mem.split(",")
    _member.remove("{}".format(User))
    str = ",".join(_member)
    conn.execute("UPDATE mission SET member='{m}' where ID = {m_ID};".format(m=str,m_ID=M_ID))#把完成的人刪掉
    conn.commit()
    conn.close()

def maylike(conn, User):#可能喜歡的任務(目前功能陽春)
    recent = conn.execute("select category_no from {user} order by date DESC LIMIT 1;".format(user=User))#最近做過的任務的類別
    like=recent.fetchone()[0]
    data = conn.execute("select * from mission where category_no = {recommend};".format(recommend=like))
    out = getJSON1(data)
    conn.commit()
    conn.close()
    return out

def popular(conn):#很多人在做的任務
    data = conn.execute("select * from mission order by progressing DESC;")#從多人進行中的任務排到少人
    out = getJSON1(data)
    conn.commit()
    conn.close()
    return out



#sys.argv[]：1為調用函式、2為使用者ID、3為任務ID、4為圖片
con = sqlite3.connect('./database/mission.db')
if(sys.argv[1] == '0'):#全部任務
    print(allmission(con))
elif(sys.argv[1] == '1'):#你可能會喜歡的任務
    print(maylike(con, sys.argv[2]))
elif(sys.argv[1] == '2'):#熱門任務
    print(popular(con))
elif(sys.argv[1] == '3'):#進行中任務
    print(doing(con, sys.argv[2]))
elif(sys.argv[1] == '4'):#做過的任務
    print(done(con, sys.argv[2]))
elif(sys.argv[1] == '5'):#接取任務
    print(accept(con, sys.argv[2], sys.argv[3]))
elif(sys.argv[1] == '6'):#放棄任務
    print(giveup(con, sys.argv[2], sys.argv[3]))
elif(sys.argv[1] == '7'):#提交任務
    print(submit(con, sys.argv[2], sys.argv[3], sys.argv[4]))
elif(sys.argv[1] == '8'):#給任務詳細資料
    print(getdetail(con, sys.argv[3])
elif(sys.argv[1] == '10'):#回傳同樣在執行該任務的玩家
    print(player(con, sys.argv[3])


# accept(con, "Jeremy", "202")
# doing(con, "Jeremy")
# submit(con, "Jeremy", "302")
# done(con, "Jeremy")
# maylike(con, "Jeremy")
# allmission(con)
# popular(con)
'''
row=con.execute("SELECT * FROM mission")
field_name = [des[0] for des in row.description]
for row in field_name:
    print(row)
'''
