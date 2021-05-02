import sqlite3
import sys
import json

def allmission(conn):
    data = conn.execute("select * from mission;")
    out = getJSON(data)
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
    conn.commit()
    conn.close()

def doing(conn, User):#進行中任務
    data = conn.execute("select * from {user} where completed=0;".format(user=User))
    out = getJSON(data)
    conn.commit()
    conn.close()
    return out

def getJSON(rows):#轉成json
    _json=[]
    field_name = [des[0] for des in rows.description]#找到項目名
    for row in rows:
        _row_json = dict()
        for field in range(len(row)):
            _row_json[field_name[field]] = row[field]
        _json.append(_row_json)
    #print(_json)
    output = json.dumps(_json, ensure_ascii = False)
    return output

def done(conn, User):#做過的任務
    data = conn.execute("select * from {user} where completed=1;".format(user=User))
    out = getJSON(data)
    conn.commit()
    conn.close()
    return out

def submit(conn, User, M_ID, pic):#提交任務(圖片部分未完成)
    conn.execute("UPDATE {user} SET completed=1 where ID = {m_ID};".format(user=User, m_ID=M_ID))
    conn.commit()
    conn.close()

def maylike(conn, User):#可能喜歡的任務(目前功能陽春)
    recent = conn.execute("select category_no from {user} order by date DESC LIMIT 1;".format(user=User))#最近做過的任務的類別
    like=recent.fetchone()[0]
    data = conn.execute("select * from mission where category_no = {recommend};".format(recommend=like))
    out = getJSON(data)
    conn.commit()
    conn.close()
    return out

def popular(conn):#很多人在做的任務
    data = conn.execute("select * from mission order by progressing DESC;")#從多人進行中的任務排到少人
    out = getJSON(data)
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
