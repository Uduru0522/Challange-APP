
var friend_list_ID=[];
var friend_list=[];
var mission_list;
var header_pic,group_name,first_line;
var friend_header,friend_name;
var mission_name;
var output_mission=[];
var output_friend=[];
var person_header,person_name;
var your_message;
var rooms_data=[];
var searched_friend_name,searched_mission_name;
var check_friend=[];
var message;
var room_magnitude;
var friend_magnitude;
var mission_magnitude;
var myname;//="鄭青宇";
var ID; 
var roomstyle,roomID;
   /* var message=[
      {name:"鄭青宇",msg:"jiooooooooooooooooooooooooooo",time:"06:48",image:"../resources/nav/create_chat.png"},
      {name:"莊小萱",msg:"weffffffffffffffffffffffffefw",time:"07:48",image:"../resources/nav/create_chat.png"},
      {name:"鄭青宇",msg:"jiooooooooooooooooooooooooooo",time:"06:48",image:"../resources/nav/create_chat.png"},
      {name:"許育騰",msg:"weffffffffffffffffffffffffefw",time:"07:48",image:"../resources/nav/create_chat.png"},
      {name:"鄭青宇",msg:"jiooooooooooooooooooooooooooo",time:"06:48",image:"../resources/nav/create_chat.png"},
      {name:"莊小萱",msg:"周詩鏇周詩鏇周詩鏇周詩鏇周詩鏇周詩鏇",time:"07:48",image:"../resources/nav/create_chat.png"},
      {name:"鄭青宇",msg:"jiooooooooooooooooooooooooooo",time:"06:48",image:"../resources/nav/create_chat.png"},
      {name:"許育騰",msg:"周詩鏇周詩鏇周詩鏇周詩鏇周詩鏇",time:"07:48",image:"../resources/nav/create_chat.png"},
      {name:"鄭青宇",msg:"jiooooooooooooooooooooooooooo",time:"06:48",image:"../resources/nav/create_chat.png"},
      {name:"何何額",msg:"weffffffffffffffffffffffffefw",time:"07:48",image:"../resources/nav/create_chat.png"},
      {name:"鄭青宇",msg:"周詩鏇周詩鏇周詩鏇周詩鏇周詩鏇周詩鏇",time:"06:48",image:"../resources/nav/create_chat.png"},
      {name:"莊小萱",msg:"weffffffffffffffffffffffffefw",time:"07:48",image:"../resources/nav/create_chat.png"},
    ];*/

var value={name:"鄭青宇",nickname:"?????",id:"E24076344",intro:"自介",social:50,travel:45,food:23,activity:20,sport:15,self:10};



//some text need to be modified by variabl



//chat page
function choose_mission(){//handle checkbox
    let obj=document.getElementsByName("choose_mission");
    let len = obj.length;
    $("#chat-choose-missions").removeClass("hidden").addClass("show");
    $(".chat-cover").removeClass("hidden").addClass("show");
    output_mission=[]
    for(let i=len-1;i>=0;i--){
        console.log("stop?");
        if(obj[i].checked==true){
            console.log(i+"missions");
            output_mission.push(mission_list[i].name)//mission_list[i]);
        }else{
        }
    }
    
}
function choose_friend(){//handle radio
    let obj=document.getElementsByName("choose_friend");
    let len = obj.length;
    output_friend=[];
    for(let i=len-1;i>=0;i--){
        console.log(len+"friends");
        if(obj[i].checked==true){
            output_friend.push(friend_list[i].id);
        }else{
        }
    }
}


function appendrooms(){//show rooms in chatroom page
    document.getElementById("chat-record").innerHTML="";

    for(let i=0;i<room_magnitude;i++){
        //let chatroom="<div id='chat-room-num"+i+"'class='chat-room'><img id='chat-header'src='"+header_pic+"'/><div class='chat-room-text'><h3 id='chat-group-name'>"+group_name+"</h3><h4 id='chat-firstline>"+first_line+"</h4></div></div>";
        console.log(rooms_data.name)
        if(rooms_data[i].type=="friend"){
            $.post('./findperson', {
                person_ID:rooms_data[i].name
            } ,
            function(data){
                console.log(data)
                //data.name, data.title, data.id, data.intro, data.image, data.social, data.travel, data.food, data.activity, data.sport, data.self;
                $("#chat-record").append("<div id='chat-room-num"+i+"'class='chat-room'><img id='chat-header'src='"+data.image+"'/><div class='chat-room-text'><h3 id='chat-group-name'>"+data.name+"</h3><h4 id='chat-firstline'>"+rooms_data[i].talk+"</h4></div></div>")

            });
            //let chatroom="<div id='chat-room-num"+i+"'class='chat-room'><img id='chat-header'src='"+friend_list[i].image+"'/><div class='chat-room-text'><h3 id='chat-group-name'>"+rooms_data[i].name+"</h3><h4 id='chat-firstline'>"+rooms_data[i].talk+"</h4></div></div>";
            
        }else{
            $.post('./findperson', {
                person_ID:myname
            } ,
            function(data){
                let chatroom="<div id='chat-room-num"+i+"'class='chat-room'><img id='chat-header'src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAH0AfQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9k='/><div class='chat-room-text'><h3 id='chat-group-name'>"+rooms_data[i].name+"</h3><h4 id='chat-firstline'>"+rooms_data[i].talk+"</h4></div></div>";
                $("#chat-record").append(chatroom)
            });
        }


    }
}
function appendmissions(){//show missions in group create
    
    document.getElementById("chat-choose-missions").innerHTML="<div id='choose-mission-text'>選擇任務</div><form name='group-choose-mission' id='group-choose-mission'><input type='text' placeholder='輸入任務名稱'name='missiontosearch' id='missiontosearch'><button type='submit' class='search-mission'><img src='../resources/nav/search.png'/></button></form>";
    for(let i=0;i<mission_magnitude;i++){
        //let missions="<input type='radio' name='choose_mission' id='C_M"+i+"'><label for='C_M"+i+"'><div id='choosed-mission"+i+"'class='choosed-mission unchosen'><h3>和陌生的你夜衝</h3></div></label>";

        let missions="<input type='radio' name='choose_mission' id='C_M"+i+"'><label for='C_M"+i+"'><div id='choosed-mission"+i+"'class='choosed-mission unchosen'><div id='mission-name-text'>"+mission_list[i].name+"</div></div></label>";

        $("#chat-choose-missions").append(missions)
    }
}
function appendfriends(){//show friends in group create
    document.getElementById("chat-choose-friends").innerHTML="<div id='choose-friend-text'>選擇好友</div><form name='group-choose-friend' id='group-choose-friend'><input type='text' name='friendtosearch' id='friendtosearch'><button type='submit' class='search-friend'><img src='../resources/nav/search.png'/></button></form>";
    for(let i=0;i<friend_magnitude;i++){
        //let friends="<input type='checkbox' name='choose_friend' id='C_F"+i+"'><label for='C_F"+i+"'><div id='choosed-friend"+i+"'class='choosed-friend unchosen'><img src='../resources/nav/create_chat.png'/><h3>鄭青宇</h3></div>";
        let friends="<input type='checkbox' name='choose_friend' id='C_F"+i+"'><label for='C_F"+i+"'><div id='choosed-friend"+i+"'class='choosed-friend unchosen'><img src='"+friend_list[i].image+"'/><div id='friend-name-text'>"+friend_list[i].name+"</div></div>";        
        $("#chat-choose-friends").append(friends)
    }
}
function newgroup(){//create a new group
    $.post('./newgroup', {
        output_mission:output_mission,//選擇的任務
        //output_friend:output_friend//選擇的好友
    } ,
    function(data){
        data == "Success" //just return data==true,and create a new group
        for(let i=0;i<output_friend.length;i++){
            $.post('./assignmentadd', {
                output_mission:output_mission,
                friend_ID:output_friend[i]//選擇的好友
             } ,
            function(data){
            
            
            });
        }
        setTimeout(function() {
        }, 500);
        $.post('./chatrecord', 
        function(chatrooms){
            console.log(chatrooms);
            room_magnitude=chatrooms.length;
            rooms_data=chatrooms;
            setTimeout(function() {
            }, 300);
            appendrooms();
        });
    });
}

function findmission(name){//search misiion in create group
    $("#missiontosearch").val("");
    console.log(name+"123");
    for(let i=0;i<mission_magnitude;i++){
        $("#choosed-mission"+i).addClass("gone");
    }
    for(let i=0;i<mission_magnitude;i++){
        if(mission_list[i].name==name){
            $("#choosed-mission"+i).removeClass("gone");
            break;
        }else if(name==""){
            $("#choosed-mission"+i).removeClass("gone");
        }
        else{

        }
    }
}
function findfriend(name){//search friend in create group
    $("#friendtosearch").val("");
    console.log(name);
    for(let i=0;i<friend_magnitude;i++){
         $("#choosed-friend"+i).addClass("gone");
    }
    for(let i=0;i<friend_magnitude;i++){
        if(friend_list[i].name==name){
            $("#choosed-friend"+i).removeClass("gone");
        }else if(name==""){
            $("#choosed-friend"+i).removeClass("gone");
        }    
        else{

        }
    }
}

function sendmessage_friend(your_message){
    console.log(your_message+"12345");
    console.log(roomID+"jo6su6");
     $.post('./sendmessage_friend', {
        friend_ID:roomID, // 要傳跟誰說話
        your_message:your_message
    } ,
    function(data){
        //data[1].name // 1可以換成2,3,4....
        //data[1].msg
        //data[1].time
        //data[1].image
        console.log(data.length);
	    message=data;
        console.log(data);
	    $('#chat-content').append("<div class='my-message'><div class='message-time'>"+data[data.length-1].time+"</div><div class='what-i-say'>"+data[data.length-1].talk+"</div></div>" );
});
	
}
function getmessage_friend(your_message){
     $.post('./chatroom_friend', {
        friend_ID:roomID // 要傳跟誰說話
    } ,
    function(data){
        //data[1].name // 1可以換成2,3,4....
        //data[1].msg
        //data[1].time
        //data[1].image
        
	if(!message||data.length>message.length){
		for(let i=data.length-message.length-1;i>0;i--){
            if(data[i].name==myname){
                let mymessage="<div class='my-message'><div class='message-time'>"+data[i].time+"</div><div class='what-i-say'>"+data[i].talk+"</div></div>";
                $('#chat-content').append(mymessage);
            }else{
               let yourmessage= "<div class='your-message'><div class='message-pic'><img class='your-header'src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAH0AfQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9k='><div class='your-name'>"+data[i].name+"</div></div><div class='what-you-say'>"+data[i].talk+"</div><div class='message-time'>"+data[i].time+"</div></div>";
               $('#chat-content').append(yourmessage);
            }   
            
		}
	}message=data;
    });		
}
function sendmessage_mission(your_message){
    
    $.post('./sendmessage_mission', {
        chatroom_name:roomID, // 要傳聊天室的名字
        your_message:your_message
   } ,
   function(data){
        //data[1].name // 1可以換成2,3,4....
        //data[1].msg
        //data[1].time
        //data[1].image
	message=data;
	let mymessage="<div class='my-message'><div class='message-time'>"+message[data.length-1].time+"</div><div class='what-i-say'>"+message[data.length-1].talk+"</div></div>";
   $('#chat-content').append(mymessage);
});	
	
}
function getmessage_mission(your_message){
     $.post('./chatroom_mission', {
        chatroom_name:roomID // 要傳跟誰說話
    } ,
    function(data){
        //data[1].name // 1可以換成2,3,4....
        //data[1].msg
        //data[1].time
        //data[1].image
	if(!message||data.length>message.length){
		
		for(let i=data.length-message.length-1;i>=0;i--){
            if(data[i].name==myname){
                let mymessage="<div class='my-message'><div class='message-time'>"+data[i].time+"</div><div class='what-i-say'>"+data[i].talk+"</div></div>";
                $('#chat-content').append(mymessage);
            }else{
               let yourmessage= "<div class='your-message'><div class='message-pic'><img class='your-header'src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAH0AfQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9k='><div class='your-name'>"+data[i].name+"</div></div><div class='what-you-say'>"+data[i].talk+"</div><div class='message-time'>"+data[i].time+"</div></div>";
                $('#chat-content').append(yourmessage);
            }
		 
        
	}
	}message=data
    });
}
//var getbytime_F= setInterval(getmessage_friend,5000);
//var getbytime_M= setInterval(getmessage_mission,5000);
var settimecheck=setInterval(checkifroom,5000);
var getbytime_F;
var getbytime_M;
function checkifroom(){
    
if($("#room-main").is(".show")){
    console.log("show");
    if(roomstyle=="friend"){
        getmessage_friend();
    }else{
       getmessage_mission(); 
    }
    
    
}else if($("#room-main").is(".hidden")){
    console.log("hidden");

}
}
//chat page

//get rooms
$("#nav-chat").click(function(){//get all chatroom record
    
     $.post('./chatrecord', 
    function(chatrooms){
    room_magnitude=chatrooms.length;
/*
            rooms_data[i].header_pic
            rooms_data[i].group_name
            rooms_data[i].first_line
            rooms_data[i].time
*/
	rooms_data=chatrooms;
    setTimeout(function() {
    }, 300);
    appendrooms();
    });
    //header_pic="../resources/nav/create_chat.png";//for test
    //group_name="鄭青宇";//for test
    //first_Line="哈哈哈哈";//for test
    
    //write into html
    

});
$("#create-chat-button").click(function(){
    mission_list=[];
    $.post('./mission/doing', 
    function(data){
        //data[0].name, data[0].category //0可以換成其他數字,有哪些屬性可以去看mission.db的column name
        console.log(data.length);
        mission_magnitude=data.length;
        mission_list=data;
        appendmissions();
        $("#chat-choose-missions").removeClass("hidden").addClass("show");
        $(".chat-cover").removeClass("hidden").addClass("show");
        
    });
    console.log("create chat");
    
});
$(".button-sure").click(function(){
    console.log("haha");
     $.post('./friendrecord', function(friends){
        //friends.friend[0] // 0可以換成其他數字，目前只會回傳id
        //console.log(friends.friend.length);
	    friend_magnitude=friends.friend.length;
	    friend_list_ID=friends.friend;	
       
	//if(friends){
        friend_list=[];
    for(let i=0;i<friend_list_ID.length;i++){
        $.post('./findperson', {
            person_ID:friend_list_ID[i]
        } ,
        function(data){
            //data.name, data.title, data.id, data.intro, data.image, data.social, data.travel, data.food, data.activity, data.sport, data.self;
		        
            friend_list.push(data);
            setTimeout(function() {
            }, 100);
                if(i==friend_list_ID.length-1){
                    appendfriends();
                }
        });
    }
    appendfriends();

    });
});

//friend page
function appendfriendsformenu(){
    document.getElementById("friend-record").innerHTML="";	

    console.log(friend_magnitude)
    for(let j=0;j<friend_magnitude;j++){
        
       // let friend="<div class='slideleft'><button class='deletebutton'>删除</button><div id='friend-num"+i+"'class='friend'><img id='friend-header'src='../resources/nav/create_chat.png'/><div class='friend-text'><h3 id='friend-name'>鄭青宇</h3></div></div><s class='space'></s></div>";
        let friend="<div class='slideleft'><button class='deletebutton'id='delete-num"+j+"'>删除</button><div id='friend-num"+j+"'class='friend'><img id='friend-header'src='"+friend_list[j].image+"'/><div class='friend-text'><h3 id='friend-name'>"+friend_list[j].name+"</h3></div></div><s class='space'></s></div>";
        
        $("#friend-record").append(friend)
    }
}
function refreshfriend(){
    console.log("haha");
     $.post('./friendrecord', 
    function(friends){  
        //friends.friend[0] // 0可以換成其他數字，目前只會回傳id
        //console.log(friends.friend.length);
	    friend_magnitude=friends.friend.length;
	    friend_list_ID=friends.friend;	
       
	//if(friends){
        friend_list=[];
    for(let i=0;i<friend_list_ID.length;i++){
        $.post('./findperson', {
            person_ID:friend_list_ID[i]
        } ,
        function(data){
            //data.name, data.title, data.id, data.intro, data.image, data.social, data.travel, data.food, data.activity, data.sport, data.self;
		        
            	friend_list.push(data);
                setTimeout(function() {
                  }, 100);
                if(i==friend_list_ID.length-1){
                    appendfriendsformenu();
                }
        });
    }
    appendfriendsformenu();
    console.log("friend");
    
	//}
    });   
}
//friend page
$("#nav-friend").click(function (){
    refreshfriend();
});    
/*$(".friend").on('swiperight', function(event) {
     event.preventDefault();
     $(".deletebutton").removeClass("gone");
});*/
function findperson(){//find a unknown person with ID
    console.log(ID);
    document.getElementById("addfriend_pic").src="";
    document.getElementById("addfriend_name").innerHTML="";
    document.getElementById("button_add").innerHTML="加入";
    $.post('./findperson', {
        person_ID:ID
    } ,
    function(data){
        //data.name, data.title, data.id, data.intro, data.image, data.social, data.travel, data.food, data.activity, data.sport, data.self;
        if(data){
            document.getElementById("addfriend_pic").src=data.image;
            document.getElementById("addfriend_name").innerHTML=data.name;	
            $("#button_cantfind").removeClass("show").addClass("hidden");
            $("#button_add").removeClass("hidden").addClass("show");
        }else{
		    $("#button_add").removeClass("show").addClass("hidden");
            $("#button_cantfind").removeClass("hidden").addClass("show");
	}
    });
    $("#addfriend").removeClass("hidden").addClass("show");
    $(".friend-cover").removeClass("hidden").addClass("show");
   // document.getElementById("addfriend_pic").src="../resources/nav/create_chat.png";
   // document.getElementById("addfriend_name").innerHTML="鄭青宇";
}
function addfriend(){//add friend
    console.log("1234"+ID);
    $.post('./addfriend', {
        person_ID:ID//他人ID
    } ,
    function(data){
        console.log(data);
        //data == "Success" //return data==true
        //refresh friend-record
        refreshfriend();
    });
    
}

function deletefriend(){//delete friend
    $.post('./deletefriend', {//****************************************************************
        person_ID:ID//他人ID
    } ,           
    function(data){
        console.log(ID);
        //data == "Success" //return data==true
        //refresh friend-record
        refreshfriend();
    });
}

//mypage page
$("#nav-mypage").click(function(){
     $.post('./mypage-record',
    function(data){
        //many different data,whatever the data structure
        //data.name, data.title, personal_ID=data.id, data.intro, data.image, data.social, data.travel, data.food, data.activity, data.sport, data.self
	value=data;
	document.getElementById("data-pic").src=value.image;
	document.getElementById("data-name").innerHTML=value.name;
	document.getElementById("data-nickname").innerHTML=value.title;
	document.getElementById("data-ID").innerHTML=value.id;
	document.getElementById("data-selfintro-text").innerHTML=value.intro;
   	document.getElementById("value-social").innerHTML="人際: "+value.social;
	document.getElementById("value-travel").innerHTML="旅遊: "+value.travel;
	document.getElementById("value-food").innerHTML="食物: "+value.food;
	document.getElementById("value-activity").innerHTML="活動: "+value.activity;
	document.getElementById("value-sport").innerHTML="運動: "+value.sport;
	document.getElementById("value-self").innerHTML="自我: "+value.self;
var radardata = {
  labels: [
    '人際',
    '旅遊',
    '食物',
    '活動',
    '運動',
    '自我',
  ],
  datasets: [{
    label: '你的任務',
    data: [value.social,value.travel,value.food,value.activity,value.sport,value.self],
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
  }]
};
var radaroptions = 
	{
	scale: 
		{
			ticks: 
			{
				fontSize: 100,
				beginAtZero: true,
				maxTicksLimit: 7,
				min:0,
				max:100
			},
			pointLabels: 
			{
                            font: {
                                   size: 36,            //大小
                                   weight: 700       //粗細
                            },
			},
			gridLines: 
			{
				color: '#009FCC'
			}
		},
	plugins:{
		legend:{
			display:false
		}
	}
		
	};
var chartRadarDOM = document.getElementById("myChart");
var chartRadar = new Chart(chartRadarDOM, {
		type: 'radar',
		data: radardata,
		options: radaroptions
	});
	     
});	
	
});
//room page
function handle_message(){
      console.log("print");
	document.getElementById("chat-content").innerHTML="";
      for(let i=1;i<message.length;i++){
      let mymessage="<div class='my-message'><div class='message-time'>"+message[i].time+"</div><div class='what-i-say'>"+message[i].talk+"</div></div>";
      let yourmessage= "<div class='your-message'><div class='message-pic'><img class='your-header'src='"+message[i].image+"'><div class='your-name'>"+message[i].name+"</div></div><div class='what-you-say'>"+message[i].talk+"</div><div class='message-time'>"+message[i].time+"</div></div>";
        console.log(myname+"dsa")
      if(message[i].name==myname){
          $('#chat-content').append(mymessage);
        }else{
          $('#chat-content').append(yourmessage);
        }
      }
      $('#chat-content').scrollTop(9999999)
}
     
    $('.friend').click(function (){
        console.log("what");
    });
//functions which is click
$(document).ready(function(){
	$.post('./mypage-record',
    function(data){
        myname=data.id
    });
	$(".chat-cover").click(function (){
		$("#chat-choose-missions").removeClass("show").addClass("hidden");
        $("#chat-choose-friends").removeClass("show").addClass("hidden");
        $(".button-sure").removeClass("show").addClass("hidden");
        $(".chat-cover").removeClass("show").addClass("hidden");
	});

$(document).on("click",'.chat-room',function(){
        
    let i = $(".chat-room").index(this);
	$("#room-main").removeClass("hidden").addClass("show");
    if(rooms_data[i].type=="mission"){
        document.getElementById("chat-room-name").innerHTML = rooms_data[i].name;
	    roomstyle="mission";
    }else{
        $.post('./findperson', {
            person_ID:rooms_data[i].name
        } ,
        function(data){
           document.getElementById("chat-room-name").innerHTML = data.name; 
           roomstyle="friend";
        });
        
	    
    }
	roomID=rooms_data[i].name;
	if(rooms_data[i].type=="mission"){
        $.post('./chatroom_mission', {//****************************************************************
            chatroom_name:rooms_data[i].name
        } ,
        function(data){
            //from recent to past
            //need who send the message(message.ID.name.header)
            //data[1].name // 1可以換成2,3,4....
            //data[1].msg
            //data[1].time
            //data[1].image
            console.log("create room");
		    message=data;
		    handle_message();
        });
    }else{
        $.post('./chatroom_friend', {//****************************************************************
            chatroom_name:rooms_data[i].name
        } ,
        function(data){
            //from recent to past
            //need who send the message(message.ID.name.header)
            //data[1].name // 1可以換成2,3,4....
            //data[1].msg
            //data[1].time
            //data[1].image
            console.log("create room");
		    message=data;
		    handle_message();
        });
    }
        $("#chat-main").removeClass("show").addClass("hidden");
        $("#room-main").removeClass("hidden").addClass("show");
        
         
    });



   // for(let i=0;i<mission_magnitude;i++){//to be green
   $(document).on("click",'.choosed-mission',function(){      
    let i = $(".choosed-mission").index(this);

	     $(".button-sure").removeClass("hidden").addClass("show");
	     console.log("mission"+i);
	     for(let j=0;j<mission_magnitude;j++){
	     	$("#choosed-mission"+j).removeClass("chosen").addClass("unchosen");

	     }
       $("#choosed-mission"+i).removeClass("unchosen").addClass("chosen");
        choose_mission();
    });
   // }    
     $(".button-sure").click(function (){
       $("#chat-choose-missions").removeClass("show").addClass("hidden");
       $("#chat-choose-friends").removeClass("hidden").addClass("show");
       $(".button-sure").removeClass("show").addClass("hidden");
	for(let i=friend_magnitude-1;i>=0;i--){//歸零
		check_friend[i]=0;
	}
    });
    console.log("nani");
    //for(let i=0;i<friend_magnitude;i++){//to be green
    $(document).on("click",'.choosed-friend',function(){
        let i = $(".choosed-friend").index(this);
        console.log("what");
	     if(check_friend[i]==1){
	     	$("#choosed-friend"+i).removeClass("chosen").addClass("unchosen");
		check_friend[i]=0;  
	     }else{
	     	$("#choosed-friend"+i).removeClass("unchosen").addClass("chosen");
		check_friend[i]=1;
	     }	     
	     console.log("friend"+i);
	     let c=0;
	     for(let j=0;j<friend_magnitude;j++){
	     	if(check_friend[j]==1){
			c=1;
			break;
		}
	     }
	     if(c==1){
	     	$(".button-creategroup").removeClass("hidden").addClass("show");
	     }else{
	     $(".button-creategroup").removeClass("show").addClass("hidden");
	     }
        choose_friend();
       });
   // }

     $(".button-creategroup").click(function (){
       $("#chat-choose-friends").removeClass("show").addClass("hidden");
       $(".button-creategroup").removeClass("show").addClass("hidden");
       $(".chat-cover").removeClass("show").addClass("hidden");
	    newgroup();

    });
    $(document).on("click", "#group-choose-mission button[type='submit']", function(event) {
        event.preventDefault();
        let name=$('#group-choose-mission input[id=missiontosearch]').val();
        console.log("234324");
        
        findmission(name);
    });
    $(document).on("click", "#group-choose-friend button[type='submit']", function(event) {
        event.preventDefault();
        let name=$('#group-choose-friend input[id=friendtosearch]').val();
        
        findfriend(name);
    });
    
    
    //friend page
//for(let i=0;i<friend_magnitude;i++){
    $(document).on("click",'.friend',function(){
        
        let i = $(".friend").index(this);
        console.log("friendroom"+i);
	    $("#room-main").removeClass("hidden").addClass("show");
        $.post('./singlefriend', {//****************************************************************
            friend_ID:friend_list_ID[i]
        } ,
        function(data){//get the chatroom_ID of you and the friend
            //chatroom_ID=ID
            data == "Success"
            document.getElementById("chat-room-name").innerHTML = friend_list[i].name;//??
	        roomstyle="friend";
	        roomID=friend_list[i].id;
            $.post('./chatroom_friend', {//as same as the above one//****************************************************************
                friend_ID:friend_list_ID[i]
            } ,
            function(data){
            //from recent to past
            //need who send the message(ID,name,header)
            //data[1].name // 1可以換成2,3,4....
            //data[1].msg
            //data[1].time
            //data[1].image
	            message=data;
                handle_message();
            });
        });
        
	    
    });
	
//}
    $('#ID-choose-friend button[type="submit"]').click((event) => {
	
        event.preventDefault();
        console.log("addfriend");
        ID=$('#ID-choose-friend input[id=persontosearch]').val();
        $("#persontosearch").val("");
        findperson();
    });
	$('#button_add').click((event) => {
		$("#addfriend").removeClass("show").addClass("hidden");
    	$(".friend-cover").removeClass("show").addClass("hidden");
        $("#button_add").removeClass("show").addClass("hidden");
        
		addfriend();
	});
    $('#button_cantfind').click((event) => {
		$("#addfriend").removeClass("show").addClass("hidden");
    	$(".friend-cover").removeClass("show").addClass("hidden");
        $("#button_cantfind").removeClass("show").addClass("hidden");
	});
	//for(let i=0;i<friend_magnitude;i++){
	$(document).on("click",'.deletebutton',function(){
        
        let i = $(".deletebutton").index(this);
        console.log("delete "+i);
		ID=friend_list_ID[i];
		deletefriend();
	});

	//}
	$('.friend-cover').click((event) => {
		$(".friend-cover").removeClass("show").addClass("hidden");
		$(".addfriend").removeClass("show").addClass("hidden");
        $("#button_cantfind").removeClass("show").addClass("hidden");
        $("#button_add").removeClass("show").addClass("hidden");
	});
    $('.navbar').click((event) => {
		$(".friend-cover").removeClass("show").addClass("hidden");
		$(".addfriend").removeClass("show").addClass("hidden");
        $("#button_cantfind").removeClass("show").addClass("hidden");
        $("#button_add").removeClass("show").addClass("hidden");
	});
	
	//room page
	$("#input-message input[name=messagetosend]").keyup((event) =>{
		event.preventDefault();
     		if(event.keyCode == 13){
			
          		let talk=$('#input-message input[name=messagetosend]').val();
                  $("#messagetosend").val("");
			console.log(roomstyle);
			if(roomstyle=="friend"){
				sendmessage_friend(talk);
			}
			else if(roomstyle=="mission"){
				sendmessage_mission(talk);
			}
			return false;
     	}
	});
	$("#input-message").submit((event) =>{
		event.preventDefault();
	});
});

