import sqlite3
import sys
import json

#sys.argv[]：0為調用函式、1為使用者ID、2為任務ID、3為圖片
con = sqlite3.connect('mission.db')
if(sys.argv[0] == 0):#全部任務
    allmission(con)
elif(sys.argv[0] == 1):#你可能會喜歡的任務
    maylike(con, sys.argv[1])
elif(sys.argv[0] == 2):#熱門任務
    popular(con)
elif(sys.argv[0] == 3):#進行中任務
    doing(con, sys.argv[1])
elif(sys.argv[0] == 4):#做過的任務
    done(con, sys.argv[1])
elif(sys.argv[0] == 5):#接取任務
    accept(con, sys.argv[1], sys.argv[2])
elif(sys.argv[0] == 6):#放棄任務
    giveup(con, sys.argv[1], sys.argv[2])
elif(sys.argv[0] == 7):#提交任務
    submit(con, sys.argv[1], sys.argv[2], sys.argv[3])

def allmission(conn):
    data = conn.execute("select * from mission;")
    getJSON(data)
    conn.commit()
    conn.close()

def accept(conn, User, M_ID):#傳入使用者名字和要接的任務(還無法儲存目前進行的用戶)
    conn.execute("create table if not exists {user}(name text, category text, description text, points integer, ID integer, completed boolean DEFAULT(0), date time DATE DEFAULT (datetime('now','localtime')), category_no integer, picture text)".format(user=User))#建立玩家任務清單
    conn.execute("INSERT INTO {user} (name, category, description, points, ID, category_no) SELECT name, category, description, points, ID, category_no FROM mission WHERE ID= {m_ID};".format(user=User, m_ID=M_ID))
    conn.execute("UPDATE mission SET progressing=progressing+1 where ID = {m_ID};".format(m_ID=M_ID))#進行人數加一
    '''
    Member=conn.execute("SELECT member FROM mission where ID = {m_ID};".format(m_ID=M_ID))#拿出member
    Mem=Member.fetchone()[0]+User
    conn.execute("UPDATE mission SET member = Mem where ID = {m_ID};".format(m_ID=M_ID))#紀錄誰在做
    '''
    conn.commit()
    conn.close()

def giveup(conn, User, M_ID):#傳入使用者名字和要放棄的任務
    conn.execute("DELETE FROM {user} WHERE ID = {m_ID};".format(user=User, m_ID=M_ID))
    conn.commit()
    conn.close()

def doing(conn, User):#進行中任務
    data = conn.execute("select * from {user} where completed=0;".format(user=User))
    getJSON(data)
    conn.commit()
    conn.close()

def getJSON(rows):#轉成json
    _json=[]
    field_name = [des[0] for des in rows.description]#找到項目名
    for row in rows:
        _row_json = dict()
        for field in range(len(row)):
            _row_json[field_name[field]] = row[field]
        _json.append(_row_json)
    #print(_json)
    output = json.dumps(_json)
    print(str(output))

def done(conn, User):#做過的任務
    data = conn.execute("select * from {user} where completed=1;".format(user=User))
    getJSON(data)
    conn.commit()
    conn.close()

def submit(conn, User, M_ID, pic):#提交任務(圖片部分未完成)
    conn.execute("UPDATE {user} SET completed=1 where ID = {m_ID};".format(user=User, m_ID=M_ID))
    conn.commit()
    conn.close()

def maylike(conn, User):#可能喜歡的任務(目前功能陽春)
    recent = conn.execute("select category_no from {user} order by date DESC LIMIT 1;".format(user=User))#最近做過的任務的類別
    like=recent.fetchone()[0]
    data = conn.execute("select * from mission where category_no = {recommend};".format(recommend=like))
    getJSON(data)
    conn.commit()
    conn.close()

def popular(conn):#很多人在做的任務
    data = conn.execute("select * from mission order by progressing DESC;")#從多人進行中的任務排到少人
    getJSON(data)
    conn.commit()
    conn.close()


#accept(con, "Jeremy", "202")
#doing(con, "Jeremy")
#submit(con, "Jeremy", "302")
#done(con, "Jeremy")
#maylike(con, "Jeremy")
#allmission(con)
#popular(con)
'''
row=con.execute("SELECT * FROM mission")
field_name = [des[0] for des in row.description]
for row in field_name:
    print(row)
'''
