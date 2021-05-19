var friend_list_ID = [];
var friend_list = [];
var mission_list, launch_mission_list, Flaunch_mission_list;
var header_pic, group_name, first_line;
var friend_header, friend_name;
var mission_name;
var output_mission = [];
var output_friend = [];
var person_header, person_name;
var your_message;
var rooms_data = [];
var searched_friend_name, searched_mission_name;
var check_friend = [];
var message;
var room_magnitude;
var friend_magnitude;
var mission_magnitude, launch_mission_magnitude, Flaunch_mission_magnitude;
var mydata; //="鄭青宇";
var ID;
var roomstyle, roomID;
var friend_index;

var value = { name: "鄭青宇", nickname: "?????", id: "E24076344", intro: "自介", social: 50, travel: 45, food: 23, activity: 20, sport: 15, self: 10 };


//chat page
function choose_mission() { //handle checkbox
    let obj = document.getElementsByName("choose_mission");
    let len = obj.length;
    $("#chat-choose-missions").removeClass("hidden").addClass("show");
    $(".chat-cover").removeClass("hidden").addClass("show");
    output_mission = []
    for (let i = len - 1; i >= 0; i--) {
        console.log("stop?");
        if (obj[i].checked == true) {
            console.log(i + "missions");
            output_mission.push(mission_list[i].name) //mission_list[i]);
        } else {}
    }

}

function choose_friend() { //handle radio
    let obj = document.getElementsByName("choose_friend");
    let len = obj.length;
    output_friend = [];
    for (let i = len - 1; i >= 0; i--) {
        console.log(len + "friends");
        if (obj[i].checked == true) {
            output_friend.push(friend_list[i].id);
        } else {}
    }
}


function appendrooms() { //show rooms in chatroom page
    document.getElementById("chat-record").innerHTML = "";
    let chatroom = [];
    for (let i = 0; i < room_magnitude; i++) {
        //let chatroom="<div id='chat-room-num"+i+"'class='chat-room'><img id='chat-header'src='"+header_pic+"'/><div class='chat-room-text'><h3 id='chat-group-name'>"+group_name+"</h3><h4 id='chat-firstline>"+first_line+"</h4></div></div>";
        console.log(rooms_data.name)
        if (rooms_data[i].type == "friend") {
            console.log("hihi");
            for (let j = 0; j < friend_magnitude; j++) {
                if (rooms_data[i].name == friend_list[j].id) {
                    chatroom = chatroom + "<div id='chat-room-num" + i + "'class='chat-room'><img id='chat-header'src='" + friend_list[j].image + "'/><div class='chat-room-text'><h3 id='chat-group-name'>" + friend_list[j].name + "</h3><div id='chat-firstline'>" + rooms_data[i].talk + "</div></div></div>"
                }
            }
            if (i == room_magnitude - 1) {
                $("#chat-record").append(chatroom)
            }

            //let chatroom="<div id='chat-room-num"+i+"'class='chat-room'><img id='chat-header'src='"+friend_list[i].image+"'/><div class='chat-room-text'><h3 id='chat-group-name'>"+rooms_data[i].name+"</h3><h4 id='chat-firstline'>"+rooms_data[i].talk+"</h4></div></div>";

        } else {
            chatroom = chatroom + "<div id='chat-room-num" + i + "'class='chat-room'><img id='chat-header'src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAH0AfQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9k='/><div class='chat-room-text'><h3 id='chat-group-name'>" + rooms_data[i].name + "</h3><h4 id='chat-firstline'>" + rooms_data[i].talk + "</h4></div></div>";
            if (i == room_magnitude - 1) {
                $("#chat-record").append(chatroom)
            }

        }

    }
}

function appendmissions() { //show missions in group create

    document.getElementById("chat-choose-missions").innerHTML = "<div id='choose-mission-text'>選擇任務</div><form name='group-choose-mission' id='group-choose-mission'><input type='text' placeholder='輸入任務名稱'name='missiontosearch' id='missiontosearch'><button type='submit' class='search-mission'><img src='../resources/nav/search.png'/></button></form>";
    let missions = []
    for (let i = 0; i <= mission_magnitude; i++) {
        //let missions="<input type='radio' name='choose_mission' id='C_M"+i+"'><label for='C_M"+i+"'><div id='choosed-mission"+i+"'class='choosed-mission unchosen'><h3>和陌生的你夜衝</h3></div></label>";
        if (i != mission_magnitude) {
            missions = missions + "<input type='radio' name='choose_mission' id='C_M" + i + "'><label for='C_M" + i + "'><div id='choosed-mission" + i + "'class='choosed-mission unchosen'><div id='mission-name-text'>" + mission_list[i].name + "</div></div></label>";
        } else {
            $("#chat-choose-missions").append(missions)
        }

    }
}

function appendfriends() { //show friends in group create
    document.getElementById("chat-choose-friends").innerHTML = "<div id='choose-friend-text'>選擇好友</div><form name='group-choose-friend' id='group-choose-friend'><input type='text' placeholder='輸入好友名稱'name='friendtosearch' id='friendtosearch'><button type='submit' class='search-friend'><img src='../resources/nav/search.png'/></button></form>";
    let friends = [];
    for (let i = 0; i < friend_magnitude; i++) {
        //let friends="<input type='checkbox' name='choose_friend' id='C_F"+i+"'><label for='C_F"+i+"'><div id='choosed-friend"+i+"'class='choosed-friend unchosen'><img src='../resources/nav/create_chat.png'/><h3>鄭青宇</h3></div>";
        friends = friends + "<input type='checkbox' name='choose_friend' id='C_F" + i + "'><label for='C_F" + i + "'><div id='choosed-friend" + i + "'class='choosed-friend unchosen'><img src='" + friend_list[i].image + "'/><div id='friend-name-text'>" + friend_list[i].name + "</div></div>";
        if (i == friend_magnitude - 1) {
            $("#chat-choose-friends").append(friends)
        }

    }

}

function appendmissionsforlaunch() { //show missions in group create

    document.getElementById("mission-container").innerHTML = "<div id='mission-launched-title'>發起任務</div>"
    let missions = []
    console.log(launch_mission_magnitude)
    for (let i = 0; i < launch_mission_magnitude; i++) {
        //let missions="<input type='radio' name='choose_mission' id='C_M"+i+"'><label for='C_M"+i+"'><div id='choosed-mission"+i+"'class='choosed-mission unchosen'><h3>和陌生的你夜衝</h3></div></label>";
        missions = missions + "<div class='launch-missions'><div class='mission-area'>" + launch_mission_list[i].category + "</div><div class='launch-mission-name'>" + launch_mission_list[i].name + "</div><img class='barchart'src='../resources/nav/barchart.png'/></div>";

        if (i == launch_mission_magnitude - 1) {
            $("#mission-container").append(missions)
        }

    }
}

function appendmissionsforlaunchF() { //show missions in group create

    document.getElementById("Fmission-container").innerHTML = "<div id='mission-launched-title'>發起任務</div>"
    let missions = []
    console.log(Flaunch_mission_magnitude)
    for (let i = 0; i < Flaunch_mission_magnitude; i++) {
        //let missions="<input type='radio' name='choose_mission' id='C_M"+i+"'><label for='C_M"+i+"'><div id='choosed-mission"+i+"'class='choosed-mission unchosen'><h3>和陌生的你夜衝</h3></div></label>";
        missions = missions + "<div class='Flaunch-missions'><div class='Fmission-area'>" + launch_mission_list[i].category + "</div><div class='Flaunch-mission-name'>" + launch_mission_list[i].name + "</div><img class='Fbarchart'src='../resources/nav/barchart.png'/></div>";

        if (i == Flaunch_mission_magnitude - 1) {
            $("#Fmission-container").append(missions)
        }

    }
}

function appendmissionsforsmall() { //show missions in group create

    document.getElementById("characteristics-L").innerHTML = "<div id='L-title'>發起任務</div>";
    let missions = []
    console.log(launch_mission_magnitude)
    for (let i = 0; i < launch_mission_magnitude; i++) {
        //let missions="<input type='radio' name='choose_mission' id='C_M"+i+"'><label for='C_M"+i+"'><div id='choosed-mission"+i+"'class='choosed-mission unchosen'><h3>和陌生的你夜衝</h3></div></label>";
        missions = missions + "<div class='mission-show'><div class='yellow'></div><div class='small-mission-name'>" + launch_mission_list[i].name + "</div></div>";
        if (i == launch_mission_magnitude - 1) {
            $("#characteristics-L").append(missions)
        }

    }
}

function appendmissionsforsmallF() { //show missions in group create

    document.getElementById("Fcharacteristics-L").innerHTML = "<div id='FL-title'>發起任務</div>";
    let missions = []
    console.log(Flaunch_mission_magnitude)
    for (let i = 0; i < Flaunch_mission_magnitude; i++) {
        //let missions="<input type='radio' name='choose_mission' id='C_M"+i+"'><label for='C_M"+i+"'><div id='choosed-mission"+i+"'class='choosed-mission unchosen'><h3>和陌生的你夜衝</h3></div></label>";
        missions = missions + "<div class='Fmission-show'><div class='Fyellow'></div><div class='Fsmall-mission-name'>" + Flaunch_mission_list[i].name + "</div></div>";
        if (i == Flaunch_mission_magnitude - 1) {
            $("#Fcharacteristics-L").append(missions)
        }

    }
}

function newgroup() { //create a new group
    $.post('./newgroup', {
            output_mission: output_mission, //選擇的任務
            //output_friend:output_friend//選擇的好友
        },
        function(data) {
            data == "Success" //just return data==true,and create a new group
            for (let i = 0; i < output_friend.length; i++) {
                $.post('./assignmentadd', {
                        output_mission: output_mission,
                        friend_ID: output_friend[i] //選擇的好友
                    },
                    function(data) {


                    });
            }

            $.post('./chatrecord',
                function(chatrooms) {
                    console.log(chatrooms);
                    room_magnitude = chatrooms.length;
                    rooms_data = chatrooms;

                    appendrooms();
                });
        });
}

function findmission(name) { //search misiion in create group
    $("#missiontosearch").val("");
    console.log(name + "123");
    for (let i = 0; i < mission_magnitude; i++) {
        $("#choosed-mission" + i).addClass("gone");
    }
    for (let i = 0; i < mission_magnitude; i++) {
        if (mission_list[i].name == name) {
            $("#choosed-mission" + i).removeClass("gone");
            break;
        } else if (name == "") {
            $("#choosed-mission" + i).removeClass("gone");
        } else {

        }
    }
}

function findfriend(name) { //search friend in create group
    $("#friendtosearch").val("");
    console.log(name);
    for (let i = 0; i < friend_magnitude; i++) {
        $("#choosed-friend" + i).addClass("gone");
    }
    for (let i = 0; i < friend_magnitude; i++) {
        if (friend_list[i].name == name) {
            $("#choosed-friend" + i).removeClass("gone");
        } else if (name == "") {
            $("#choosed-friend" + i).removeClass("gone");
        } else {

        }
    }
}

function sendmessage_friend(your_message) {
    console.log(your_message + "12345");
    console.log(roomID + "jo6su6");
    $.post('./sendmessage_friend', {
            friend_ID: roomID, // 要傳跟誰說話
            your_message: your_message
        },
        function(data) {
            //data[1].name // 1可以換成2,3,4....
            //data[1].msg
            //data[1].time
            //data[1].image
            console.log(data.length);
            message = data;
            console.log(data);
            $('#chat-content').append("<div class='my-message'><div class='message-time'>" + data[data.length - 1].time + "</div><div class='what-i-say'>" + data[data.length - 1].talk + "</div></div>");
            $('#chat-content').scrollTop(9999999)
        });

}

function getmessage_friend(your_message) {
    $.post('./chatroom_friend', {
            friend_ID: roomID // 要傳跟誰說話
        },
        function(data) {
            //data[1].name // 1可以換成2,3,4....
            //data[1].msg
            //data[1].time
            //data[1].image
            if (!message || data.length > message.length) {
                let ourmessage = [];
                for (let i = message.length; i < data.length; i++) {
                    for (let j = 0; j < friend_list.length; j++) {
                        if (data[i].name == mydata.id) {
                            ourmessage = ourmessage + "<div class='my-message'><div class='message-time'>" + data[i].time + "</div><div class='what-i-say'>" + data[i].talk + "</div></div>";
                            break;
                        } else {
                            if (data[i].name == friend_list[j].id) {
                                ourmessage = ourmessage + "<div class='your-message'><div class='message-pic'><img class='your-header'src='" + friend_list[j].image + "'><div class='your-name'>" + friend_list[j].name + "</div></div><div class='what-you-say'>" + data[i].talk + "</div><div class='message-time'>" + data[i].time + "</div></div>";
                            }
                        }
                    }

                    if (i == data.length - 1) {
                        $('#chat-content').append(ourmessage);
                        $('#chat-content').scrollTop(9999999)
                    }
                }
            }
            message = data;
        });
}

function sendmessage_mission(your_message) {

    $.post('./sendmessage_mission', {
            chatroom_name: roomID, // 要傳聊天室的名字
            your_message: your_message
        },
        function(data) {
            //data[1].name // 1可以換成2,3,4....
            //data[1].msg
            //data[1].time
            //data[1].image
            message = data;
            let mymessage = "<div class='my-message'><div class='message-time'>" + message[data.length - 1].time + "</div><div class='what-i-say'>" + message[data.length - 1].talk + "</div></div>";
            $('#chat-content').append(mymessage);
            $('#chat-content').scrollTop(9999999)
        });

}

function getmessage_mission(your_message) {
    $.post('./chatroom_mission', {
            chatroom_name: roomID // 要傳跟誰說話
        },
        function(data) {
            //data[1].name // 1可以換成2,3,4....
            //data[1].msg
            //data[1].time
            //data[1].image
            if (!message || data.length > message.length) {
                let ourmessage = []
                for (let i = data.length - message.length - 1; i >= 0; i--) {
                    for (let j = 0; j < friend_list.length; j++) {
                        if (data[i].name == mydata.id) {
                            ourmessage = ourmessage + "<div class='my-message'><div class='message-time'>" + data[i].time + "</div><div class='what-i-say'>" + data[i].talk + "</div></div>";
                            break;
                        } else {
                            if (data[i].name == friend_list[j].id) {
                                ourmessage = ourmessage + "<div class='your-message'><div class='message-pic'><img class='your-header'src='" + friend_list[j].image + "'><div class='your-name'>" + friend_list[j].name + "</div></div><div class='what-you-say'>" + data[i].talk + "</div><div class='message-time'>" + data[i].time + "</div></div>";
                            }
                        }
                    }
                    if (i == data.length - 1) {
                        $('#chat-content').append(ourmessage);
                        $('#chat-content').scrollTop(9999999)
                    }


                }
            }
            message = data
        });
}
//var getbytime_F= setInterval(getmessage_friend,5000);
//var getbytime_M= setInterval(getmessage_mission,5000);
var settimecheck = setInterval(checkifroom, 1000);
var getbytime_F;
var getbytime_M;

function checkifroom() {
    if(("#chat-main").is(".show")){
        $.post('./chatrecord',
        function(chatrooms) {
            console.log(chatrooms);
            room_magnitude = chatrooms.length;
            rooms_data = chatrooms;
            appendrooms();
        });
    }
    if(("#friend-main").is(".show")){
        $.post('./friendrecord',
        function(friends) {
            if(friends.length>friend_magnitude){
                refreshfriend();
            }
        });
    }
    if ($("#room-main").is(".show")) {
        console.log("show");
        if (roomstyle == "friend") {
            getmessage_friend();
        } else {
            getmessage_mission();
        }


    } else if ($("#room-main").is(".hidden")) {
        console.log("hidden");

    }
}
//chat page

//get rooms
$(document).on("click", '#nav-chat', function() {

    appendrooms();
    $.post('./chatrecord',
        function(chatrooms) {
            console.log(chatrooms);
            room_magnitude = chatrooms.length;
            rooms_data = chatrooms;

        });
    setTimeout(() => {
        appendrooms();
    }, 200);
});
$("#create-chat-button").click(function() {
    mission_list = [];
    $.post('./mission/doing',
        function(data) {
            console.log(data.length);
            mission_magnitude = data.length;
            mission_list = data;
            appendmissions();
            $("#chat-choose-missions").removeClass("hidden").addClass("show");
            $(".chat-cover").removeClass("hidden").addClass("show");

        });
    console.log("create chat");

});
$(".button-sure").click(function() {

    appendfriends();
});

//friend page
function appendfriendsformenu() {
    document.getElementById("friend-record").innerHTML = "";

    console.log(friend_magnitude)
    let friend = [];
    for (let j = 0; j < friend_magnitude; j++) {
        friend = friend + "<div class='slideleft'><button class='deletebutton'id='delete-num" + j + "'>删除</button><div id='friend-num" + j + "'class='friend'><img id='friend-header'src='" + friend_list[j].image + "'/><div class='friend-text'><h3 id='friend-name'>" + friend_list[j].name + "</h3></div></div><s class='space'></s></div>";
        if (j == friend_magnitude - 1) {
            $("#friend-record").append(friend)
        }

    }
}

function refreshfriend() {
    console.log("haha");
    $.post('./friendrecord',
        function(friends) {

            friend_magnitude = friends.friend.length;
            friend_list_ID = friends.friend;

            //if(friends){
            friend_list = [];
            for (let i = 0; i < friend_list_ID.length; i++) {
                $.post('./findperson', {
                        person_ID: friend_list_ID[i]
                    },
                    function(data) {
                        //data.name, data.title, data.id, data.intro, data.image, data.social, data.travel, data.food, data.activity, data.sport, data.self;

                        friend_list.push(data);
                        setTimeout(function() {}, 100);
                        if (i == friend_list_ID.length - 1) {
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
$("#nav-friend").click(function() {
    $.post('./friendrecord',
        function(friends) {

            friend_magnitude = friends.friend.length;
            friend_list_ID = friends.friend;
            appendfriendsformenu();
        });

    $.post('./chatrecord',
        function(chatrooms) {
            console.log(chatrooms);
            room_magnitude = chatrooms.length;
            rooms_data = chatrooms;

        });
});
/*$(".friend").on('swiperight', function(event) {
     event.preventDefault();
     $(".deletebutton").removeClass("gone");
});*/
function findperson() { //find a unknown person with ID
    console.log(ID);
    document.getElementById("addfriend_pic").src = "";
    document.getElementById("addfriend_name").innerHTML = "";
    document.getElementById("button_add").innerHTML = "加入";
    $.post('./findperson', {
            person_ID: ID
        },
        function(data) {
            //data.name, data.title, data.id, data.intro, data.image, data.social, data.travel, data.food, data.activity, data.sport, data.self;
            if (data) {
                document.getElementById("addfriend_pic").src = data.image;
                document.getElementById("addfriend_name").innerHTML = data.name;
                $("#button_cantfind").removeClass("show").addClass("hidden");
                $("#button_add").removeClass("hidden").addClass("show");
            } else {
                $("#button_add").removeClass("show").addClass("hidden");
                $("#button_cantfind").removeClass("hidden").addClass("show");
            }
        });
    $("#addfriend").removeClass("hidden").addClass("show");
    $(".friend-cover").removeClass("hidden").addClass("show");
    // document.getElementById("addfriend_pic").src="../resources/nav/create_chat.png";
    // document.getElementById("addfriend_name").innerHTML="鄭青宇";
}

function addfriend() { //add friend
    console.log("1234" + ID);
    $.post('./addfriend', {
            person_ID: ID //他人ID
        },
        function(data) {
            console.log(data);
            //data == "Success" //return data==true
            //refresh friend-record
            refreshfriend();
        });

}

function deletefriend() { //delete friend
    $.post('./deletefriend', {
            person_ID: ID //他人ID
        },
        function(data) {
            console.log(ID);
            refreshfriend();
        });
}

//mypage page
$("#nav-mypage").click(function() {
    appendmissionsforsmall();
    $.post('./mypage-record',
        function(data) {
            value = data;
            document.getElementById("data-pic").src = value.image;
            document.getElementById("data-name").innerHTML = value.name;
            document.getElementById("data-nickname").innerHTML = value.title;
            document.getElementById("data-ID").innerHTML = value.id;
            document.getElementById("data-selfintro-text").innerHTML = value.intro;
            document.getElementById("value-social").innerHTML = "社交: " + value.social;
            document.getElementById("value-travel").innerHTML = "旅行: " + value.travel;
            document.getElementById("value-food").innerHTML = "美食: " + value.food;
            document.getElementById("value-activity").innerHTML = "冒險: " + value.activity;
            document.getElementById("value-sport").innerHTML = "運動: " + value.sport;
            document.getElementById("value-self").innerHTML = "課業: " + value.self;
            var radardata = {
                labels: [
                    '社交',
                    '旅行',
                    '美食',
                    '冒險',
                    '運動',
                    '課業',
                ],
                datasets: [{
                    label: '你的任務',
                    data: [value.social, value.travel, value.food, value.activity, value.sport, value.self],
                    fill: true,
                    backgroundColor: 'rgb(233, 149, 53,0.3)',
                    borderColor: '#EB931D',
                    pointBackgroundColor: '#EB931D',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)'
                }]
            };
            var radaroptions = {
                scale: {

                    fontSize: 100,
                    beginAtZero: true,
                    maxTicksLimit: 7,
                    min: 0,
                    // max: 100,
                    ticks: {},
                    pointLabels: {

                        font: {
                            size: 36, //大小
                            weight: 700 //粗細
                        },
                    },
                    gridLines: {
                        color: '#009FCC'
                    }
                },
                plugins: {
                    legend: {
                        display: false
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
function handle_message(type, room_id) {
    console.log("print");
    document.getElementById("chat-content").innerHTML = "";
    let ourmessage = []
    if (type == "mission") {
        $.post('./chatroom_mission', {
                chatroom_name: room_id
            },
            function(data) {
                message = data;
                for (let i = 1; i < data.length; i++) {
                    for (let j = 0; j < friend_magnitude; j++) {
                        if (data[i].name == mydata.id) {
                            ourmessage = ourmessage + "<div class='my-message'><div class='message-time'>" + data[i].time + "</div><div class='what-i-say'>" + data[i].talk + "</div></div>";
                            break;
                        } else {
                            if (message[i].name == friend_list[j].id) {
                                ourmessage = ourmessage + "<div class='your-message'><div class='message-pic'><img class='your-header'src='" + friend_list[j].image + "'><div class='your-name'>" + friend_list[j].name + "</div></div><div class='what-you-say'>" + data[i].talk + "</div><div class='message-time'>" + data[i].time + "</div></div>";
                            }
                        }
                    }
                    if (i == data.length - 1) {
                        console.log(ourmessage)
                        $('#chat-content').append(ourmessage);
                        $('#chat-content').scrollTop(9999999)
                    }
                }
            });
    } else {
        $.post('./chatroom_friend', {
                friend_ID: room_id
            },
            function(data) {
                message = data;
                for (let i = 1; i < data.length; i++) {
                    for (let j = 0; j < friend_magnitude; j++) {
                        if (data[i].name == mydata.id) {
                            ourmessage = ourmessage + "<div class='my-message'><div class='message-time'>" + data[i].time + "</div><div class='what-i-say'>" + data[i].talk + "</div></div>";
                            break;
                        } else {
                            if (message[i].name == friend_list[j].id) {
                                ourmessage = ourmessage + "<div class='your-message'><div class='message-pic'><img class='your-header'src='" + friend_list[j].image + "'><div class='your-name'>" + friend_list[j].name + "</div></div><div class='what-you-say'>" + data[i].talk + "</div><div class='message-time'>" + data[i].time + "</div></div>";
                            }
                        }
                    }
                    if (i == data.length - 1) {
                        console.log(ourmessage)
                        $('#chat-content').append(ourmessage);
                        $('#chat-content').scrollTop(9999999)
                    }
                }

            });
    }

}

$('.friend').click(function() {
    console.log("what");
});
//functions which is click
$(document).ready(function() {
    $.post('./chatrecord',
        function(chatrooms) {
            room_magnitude = chatrooms.length;
            rooms_data = chatrooms;

        });

    refreshfriend();

    $.post('./mypage-record',
        function(data) {
            mydata = data;
        });
    $(".chat-cover").click(function() {
        $("#chat-choose-missions").removeClass("show").addClass("hidden");
        $("#chat-choose-friends").removeClass("show").addClass("hidden");
        $(".button-sure").removeClass("show").addClass("hidden");
        $(".button-creategroup").removeClass("show").addClass("hidden");
        $(".chat-cover").removeClass("show").addClass("hidden");
    });
    $.post('./mission/done',
        function(data) {
            console.log(data);
            launch_mission_magnitude = data.length;
            launch_mission_list = data;

        });
});

$(document).on("click", '.chat-room', function() {

    let i = $(".chat-room").index(this);
    $("#room-main").removeClass("hidden").addClass("show");
    if (rooms_data[i].type == "mission") {
        document.getElementById("chat-room-name").innerHTML = rooms_data[i].name;
        roomstyle = "mission";
    } else {
        $.post('./findperson', {
                person_ID: rooms_data[i].name
            },
            function(data) {
                document.getElementById("chat-room-name").innerHTML = data.name;
                roomstyle = "friend";
            });


    }
    roomID = rooms_data[i].name;
    if (rooms_data[i].type == "mission") {
        handle_message("mission", rooms_data[i].name);
    } else {
        handle_message("friend", rooms_data[i].name);
    }

    $("#chat-main").removeClass("show").addClass("hidden");
    $("#room-main").removeClass("hidden").addClass("show");
});



// for(let i=0;i<mission_magnitude;i++){//to be green
$(document).on("click", '.choosed-mission', function() {
    let i = $(".choosed-mission").index(this);

    $(".button-sure").removeClass("hidden").addClass("show");
    console.log("mission" + i);
    for (let j = 0; j < mission_magnitude; j++) {
        $("#choosed-mission" + j).removeClass("chosen").addClass("unchosen");

    }
    $("#choosed-mission" + i).removeClass("unchosen").addClass("chosen");
    choose_mission();
});
// }    
$(".button-sure").click(function() {
    $("#chat-choose-missions").removeClass("show").addClass("hidden");
    $("#chat-choose-friends").removeClass("hidden").addClass("show");
    $(".button-sure").removeClass("show").addClass("hidden");
    for (let i = friend_magnitude - 1; i >= 0; i--) { //歸零
        check_friend[i] = 0;
    }
});
console.log("nani");
//for(let i=0;i<friend_magnitude;i++){//to be green
$(document).on("click", '.choosed-friend', function() {
    let i = $(".choosed-friend").index(this);
    console.log("what");
    if (check_friend[i] == 1) {
        $("#choosed-friend" + i).removeClass("chosen").addClass("unchosen");
        check_friend[i] = 0;
    } else {
        $("#choosed-friend" + i).removeClass("unchosen").addClass("chosen");
        check_friend[i] = 1;
    }
    console.log("friend" + i);
    let c = 0;
    for (let j = 0; j < friend_magnitude; j++) {
        if (check_friend[j] == 1) {
            c = 1;
            break;
        }
    }
    if (c == 1) {
        $(".button-creategroup").removeClass("hidden").addClass("show");
    } else {
        $(".button-creategroup").removeClass("show").addClass("hidden");
    }
    choose_friend();
});
// }

$(".button-creategroup").click(function() {
    $("#chat-choose-friends").removeClass("show").addClass("hidden");
    $(".button-creategroup").removeClass("show").addClass("hidden");
    $(".chat-cover").removeClass("show").addClass("hidden");
    newgroup();

});
$(document).on("click", "#group-choose-mission button[type='submit']", function(event) {
    event.preventDefault();
    let name = $('#group-choose-mission input[id=missiontosearch]').val();
    console.log("234324");

    findmission(name);
});
$(document).on("click", "#group-choose-friend button[type='submit']", function(event) {
    event.preventDefault();
    let name = $('#group-choose-friend input[id=friendtosearch]').val();

    findfriend(name);
});


//friend page
//for(let i=0;i<friend_magnitude;i++){
$(document).on("click", '.friend', function() {

    friend_index = $(".friend").index(this);
    $("#click-friend").removeClass("hidden").addClass("show");
    $(".friend-cover").removeClass("hidden").addClass("show");
    document.getElementById("click-friend-header").src = friend_list[friend_index].image;
    document.getElementById("click-friend-name").innerHTML = friend_list[friend_index].name;
    $.post('./Fmission/done', {
            friend_ID: friend_list_ID[friend_index]
        },
        function(data) {
            console.log(data);
            Flaunch_mission_magnitude = data.length;
            Flaunch_mission_list = data;

        });
});
$(document).on("click", '#click-friend-chat', function() {
    $("#room-main").removeClass("hidden").addClass("show");
    $.post('./singlefriend', { //****************************************************************
            friend_ID: friend_list_ID[friend_index]
        },
        function(data) { //get the chatroom_ID of you and the friend
            //chatroom_ID=ID
            data == "Success"
            document.getElementById("chat-room-name").innerHTML = friend_list[friend_index].name; //??
            roomstyle = "friend";
            roomID = friend_list[friend_index].id;
            $.post('./chatroom_friend', { //as same as the above one//****************************************************************
                    friend_ID: friend_list_ID[friend_index]
                },
                function(data) {
                    message = data;
                    handle_message("friend", friend_list_ID[friend_index]);
                });
        });
});
$(document).on("click", '#click-friend-data', function() {

});

//}
$('#ID-choose-friend button[type="submit"]').click((event) => {

    event.preventDefault();
    console.log("addfriend");
    ID = $('#ID-choose-friend input[id=persontosearch]').val();
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
$(document).on("click", '.deletebutton', function() {

    let i = $(".deletebutton").index(this);
    console.log("delete " + i);
    ID = friend_list_ID[i];
    deletefriend();
});

//}
$('.friend-cover').click((event) => {
    $(".friend-cover").removeClass("show").addClass("hidden");
    $(".addfriend").removeClass("show").addClass("hidden");
    $("#button_cantfind").removeClass("show").addClass("hidden");
    $("#button_add").removeClass("show").addClass("hidden");
    $("#click-friend").removeClass("show").addClass("hidden");
});
$('.navbar').click((event) => {
    $(".friend-cover").removeClass("show").addClass("hidden");
    $(".addfriend").removeClass("show").addClass("hidden");
    $("#button_cantfind").removeClass("show").addClass("hidden");
    $("#button_add").removeClass("show").addClass("hidden");
});

//room page
$("#input-message input[name=messagetosend]").keyup((event) => {
    event.preventDefault();
    if (event.keyCode == 13) {

        let talk = $('#input-message input[name=messagetosend]').val();
        $("#messagetosend").val("");
        console.log(roomstyle);
        if (roomstyle == "friend") {
            sendmessage_friend(talk);
        } else if (roomstyle == "mission") {
            sendmessage_mission(talk);
        }
        return false;
    }
});
$("#input-message").submit((event) => {
    event.preventDefault();
});


$(document).on("click", '#logout', function() {
    $.post('./logout', {

    }, (data) => {
        if (data == 'jump')
            window.location.href = '../html/login.html';
    });
});
$(document).on("click", '#characteristics-L', function() {
    console.log("success")

    appendmissionsforlaunch();
    $("#mission-launched").removeClass("hidden").addClass("show");
});
$(document).on("click", '.characteristics-RT', function() {
    console.log("successs")
    $("#characteristic-analyze").removeClass("hidden").addClass("show");
});

$(document).on("click", '.back-button', function() {
    $("#mission-launched").removeClass("show").addClass("hidden");
    $("#characteristic-history").removeClass("show").addClass("hidden");
    $("#characteristic-analyze").removeClass("show").addClass("hidden");
});
$(document).on("click", '#click-friend-data', function() {
    $("#myfriend-main").removeClass("hidden").addClass("show");
    $("#friend-main").removeClass("show").addClass("hidden");
    $("#click-friend").removeClass("show").addClass("hidden");
    $(".friend-cover").removeClass("show").addClass("hidden");

    appendmissionsforsmallF();
    $.post('./friendpage-record', {
            friend_ID: friend_list_ID[friend_index]
        },
        function(data) {
            console.log(data);
            value = data;
            document.getElementById("Fdata-pic").src = value.image;
            document.getElementById("Fdata-name").innerHTML = value.name;
            document.getElementById("Fdata-nickname").innerHTML = value.title;
            document.getElementById("Fdata-ID").innerHTML = value.id;
            document.getElementById("Fdata-selfintro-text").innerHTML = value.intro;
            document.getElementById("Fvalue-social").innerHTML = "社交: " + value.social;
            document.getElementById("Fvalue-travel").innerHTML = "旅行: " + value.travel;
            document.getElementById("Fvalue-food").innerHTML = "美食: " + value.food;
            document.getElementById("Fvalue-activity").innerHTML = "冒險: " + value.activity;
            document.getElementById("Fvalue-sport").innerHTML = "運動: " + value.sport;
            document.getElementById("Fvalue-self").innerHTML = "課業: " + value.self;


            let Fradardata = {
                labels: [
                    '社交',
                    '旅行',
                    '美食',
                    '冒險',
                    '運動',
                    '課業',
                ],
                datasets: [{
                    label: '你的任務',
                    data: [value.social, value.travel, value.food, value.activity, value.sport, value.self],
                    fill: true,
                    backgroundColor: 'rgb(233, 149, 53,0.3)',
                    borderColor: '#EB931D',
                    pointBackgroundColor: '#EB931D',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)'
                }]
            };
            let Fradaroptions = {
                scale: {

                    fontSize: 100,
                    beginAtZero: true,
                    maxTicksLimit: 7,
                    min: 0,

                    ticks: {},
                    pointLabels: {

                        font: {
                            size: 36, //大小
                            weight: 700 //粗細
                        },
                    },
                    gridLines: {
                        color: '#009FCC'
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }

            };

            let FchartRadarDOM = document.getElementById("friendChart");
            let FchartRadar = new Chart(FchartRadarDOM, {
                type: 'radar',
                data: Fradardata,
                options: Fradaroptions
            });

        });

});
$(document).on("click", '#Fcharacteristics-L', function() {
    console.log("success")

    appendmissionsforlaunchF();
    $("#Fmission-launched").removeClass("hidden").addClass("show");
});
$(document).on("click", '.Fcharacteristics-RT', function() {

    $("#Fcharacteristic-analyze").removeClass("hidden").addClass("show");
});
$(document).on("click", '.Fback-button', function() {
    $("#Fmission-launched").removeClass("show").addClass("hidden");
    $("#Fcharacteristic-history").removeClass("show").addClass("hidden");
    $("#Fcharacteristic-analyze").removeClass("show").addClass("hidden");
});

$(document).on("click", '.characteristics-RB', function() {
    console.log("RBsuccesss")
    $("#characteristic-history").removeClass("hidden").addClass("show");

    $.post('./getphotos', function(imgobj_arr) {
        $("#photobook-grid-wrapper").empty();
        imgobj_arr.forEach(obj => {
            let img = $("<img></img>").addClass("photobook-grid-item");
            let wrapper = $("<div></div>");

            img.attr("src", obj.picture); //文字說明: obj.pic_text, 任務ID: obj.ID
            wrapper.append(img);
            $("#photobook-grid-wrapper").append(wrapper);
        });
    });
});

$(document).on("click", '.Fcharacteristics-RB', function() {
    console.log("FRBsuccesss")
    $("#Fcharacteristic-history").removeClass("hidden").addClass("show");

    $.post('./getphotos_friend', {
        friend_ID: friend_list_ID[friend_index]
    }, function(imgobj_arr) {
        $("#Fphotobook-grid-wrapper").empty();
        imgobj_arr.forEach(obj => {
            let img = $("<img></img>").addClass("Fphotobook-grid-item");
            let wrapper = $("<div></div>");

            img.attr("src", obj.picture); //文字說明: obj.pic_text, 任務ID: obj.ID
            wrapper.append(img);
            $("#Fphotobook-grid-wrapper").append(wrapper);
        });
    });
});