var personal_ID;
var chatroom_ID;
var friend_ID;
var person_ID;
var friend_list;
var mission_list;
var header_pic,group_name,first_line;
var friend_header,friend_name;
var mission_name;
var output_mission,output_friend;
var person_header,person_name;
var your_message;
var rooms_data;


var room_magnitude=5;
var friend_magnitude=8;
var mission_magnitude=5;

//some text need to be modified by variable
var friend="<div id='friend-num'class='friend'><img id='friend-header'src='../resources/nav/create_chat.png'/><div class='friend-text'><h3 id='friend-name'>鄭青宇</h3></div></div>";



//chat page
function choose_mission(){
    var obj=document.getElementsByName("choose_mission");
    var len = obj.length;
    for(var i=len-1;i>=0;i--){
        console.log("stop?");
        if(obj[i].checked==true){
            console.log(i+"missions");
            $("#choosed-mission"+i).removeClass("unchosen").addClass("chosen");
            $(".button-sure").removeClass("hidden").addClass("show");
        }else{
            $("#choosed-mission"+i).removeClass("chosen").addClass("unchosen");
        }
    }
    
}
function choose_friend(){
    var obj=document.getElementsByName("choose_friend");
    var len = obj.length;
    for(var i=len-1;i>=0;i--){
        console.log(len+"friends");
        if(obj[i].checked==true){
            
            $("#choosed-friend"+i).removeClass("unchosen").addClass("chosen");
            $(".button-creategroup").removeClass("hidden").addClass("show");
        }else{
            $("#choosed-friend"+i).removeClass("chosen").addClass("unchosen");
        }
    }
}


function appendrooms(){
    for(var i=0;i<room_magnitude;i++){
        var chatroom="<div id='chat-room-num"+i+"'class='chat-room'><img id='chat-header'src='"+header_pic+"'/><div class='chat-room-text'><h3 id='chat-group-name'>"+group_name+"</h3><h4 id='chat-firstline>"+first_line+"</h4></div></div>";
        $("#chat-record").append(chatroom)
    }
}
function appendmissions(){
    for(var i=0;i<mission_magnitude;i++){
        var missions="<input type='radio' name='choose_mission' id='C_M"+i+"'><label for='C_M"+i+"'><div id='choosed-mission"+i+"'class='choosed-mission unchosen'onclick='choose_mission()'><h3>和陌生的你夜衝</h3></div></label>";
        $("#chat-choose-missions").append(missions)
    }
}
function appendfriends(){
    for(var i=0;i<friend_magnitude;i++){
        var friends="<input type='checkbox' name='choose_friend' id='C_F"+i+"'><label for='C_F"+i+"'><div id='choosed-friend"+i+"'class='choosed-friend unchosen'><img src='../resources/nav/create_chat.png'/><h3>鄭青宇</h3></div>";
        $("#chat-choose-friends").append(friends)
    }
}
function newgroup(){
    $.post('./newgroup', {//****************************************************************
        personal_ID,
        output_mission,//選擇的任務
        output_friend//選擇的好友
    } ,
    function(data){
        
        //just return data==true,and create a new group
    });
}
function findfriend(){
    const search_friend=document.forms['group-search-friend'];
    const name = search_friend.elements.friendtosearch.value;
    
    for(var i=0;i<friend_list.length;i++){
        if(friend_list[i].name==name){
            //show the friend
        }else{
            //show nothing
        }
    }
}
function findmission(){
    const search_mission=document.forms['group-search-mission'];
    const name = search_mission.elements.missiontosearch.value;
    
    for(var i=0;i<mission_list.length;i++){
        if(mission_list[i].name==name){
            //show the mission
            break;
        }else{
            //show nothing
        }
    }
}
function sendmessage(){
     $.post('./sendmessage', {//****************************************************************
        personal_ID,
        your_message
    } ,
    function(data){
        //return data==true(succeed) and i can push the message into chatroom
    });
}
//getmessage(){}    use this or websocket

function chatwithfriend(){
    $.post('./chatwithfriend', {//****************************************************************
        personal_ID,
        friend_ID
    } ,
    function(ID){
        chatroom_ID=ID;//獲得聊天室ID名稱
    });
}
//chat page

//get rooms
$("#chat-record").ready(function(){//get all chatroom record
    
     $.post('./chatrecord', {//****************************************************************
        personal_ID
    } ,
    function(chatrooms){
         room_magnitude=chatrooms.length;
         for(var i=0;i<chatrooms.length;i++){
            //rooms_data[i].header_pic=?大頭照  
            //rooms_data[i].group_name=?群組名稱
            //rooms_data[i].first_line=?顯示的第一句話
         }

    });
    header_pic="../resources/nav/create_chat.png";//for test
    group_name="鄭青宇";//for test
    first_Line="哈哈哈哈";//for test
    
    appendrooms();//write into html
    

});
$("#chat-choose-missions").ready(function(){
    $.post('./chatchoosemissions', {//****************************************************************
        personal_ID
    } ,
    function(missions){
        
        //mission_list[i]=missions[i]  某人擁有的所有任務的ID與name
    });
    appendmissions();
});
$("#chat-choose-friends").ready(function(){
    $.post('./chatchoosefriends', {//****************************************************************
        personal_ID
    } ,
    function(friends){
        //friend_list[i]=friends[i];某人擁有的所有朋友的data
        //header_pic=?
        //friend_name=?
        //friend_ID=?
    });
    appendfriends();
});
;


//friend page
function appendfriendsformenu(){
    for(var i=0;i<friend_magnitude;i++){
        $("#friend-record").append(friend)
    }
}
//friend page
$("#friend-record").ready(function(){
     $.post('./friendrecord', {//****************************************************************
        personal_ID
    } ,
    function(friends){
        //friend_list[i]=friends[i];
        //similar to chatchoosefriends, but in different place
        //header_pic=?
        //friend_name=?
        //friend_nickname?
        //friend_ID?
    });
    console.log("friend");
    appendfriendsformenu();
    

});
function findperson(){//find a unknown person with ID
    $.post('./findperson', {//****************************************************************
        person_ID
    } ,
    function(data){
        //data.person_header=?
        //data.person_name=?
    });
}
function addfriend(){//add friend
    $.post('./addfriend', {//****************************************************************
        person_ID,//他人ID
        personal_ID//本人ID
    } ,
    function(data){
        //return data==true
        //refresh friend-record
    });
}

function deletefriend(){//delete friend
    $.post('./deletefriend', {//****************************************************************
        person_ID
    } ,
    function(data){
        //return data==true
        //refresh friend-record
    });
}
//mypage page
$("#mypage-record").ready(function(){
     $.post('./mypage-record', {//****************************************************************
        personal_ID
    } ,
    function(/*multiple data*/){
        //many different data,whatever the data structure
    });
   

});

//functions which is click
$(document).ready(function(){
    $.post('./getpersonID', {//****************************************************************
        } ,
        function(ID){
            personal_ID=ID;
        });
    
    $("#create-chat-button").click(function (){
        console.log("create chat");
        $("#chat-choose-missions").removeClass("hidden").addClass("show");
        $(".chat-cover").removeClass("hidden").addClass("show");
    });
    $(".chat-room").click(function (){//go into a chatroom by chatroom record
        document.getElementById("chat-room-name").innerHTML = "阿元";
        $.post('./chatroom', {//****************************************************************
            personal_ID,
            chatroom_ID
        } ,
        function(message){
            //from recent to past
            //need who send the message(message.ID.name.header)
        });
        console.log("create room");
        $("#chat-main").removeClass("show").addClass("hidden");
        $("#room-main").removeClass("hidden").addClass("show");
        
        
    });

     $(".button-sure").click(function (){
       $("#chat-choose-missions").removeClass("show").addClass("hidden");
       $("#chat-choose-friends").removeClass("hidden").addClass("show");
       $(".button-sure").removeClass("show").addClass("hidden");
    });
    $(".choosed-friend").click(function (){
       choose_friend();
    });
     $(".button-creategroup").click(function (){
       $("#chat-choose-friends").removeClass("show").addClass("hidden");
       $(".button-creategroup").removeClass("show").addClass("hidden");
       $(".chat-cover").removeClass("show").addClass("hidden");
    });
    
    
    
    //friend page
    $(".single-friend").click(function (){//go into chatroom by friend page
       $.post('./singlefriend', {//****************************************************************
            personal_ID,
            friend_ID
        } ,
        function(ID){//get the chatroom_ID of you and the friend
            //chatroom_ID=ID
        });
        document.getElementById("chat-room-name").innerHTML = "";//??
        $.post('./chatroom', {//as same as the above one//****************************************************************
            personal_ID,
            chatroom_ID
        } ,
        function(message){
            //from recent to past
            //need who send the message(ID,name,header)
        });
    });
});




