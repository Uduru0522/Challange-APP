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
var ID, deletegroupname;
var roomstyle, roomID;
var friend_index;
var FchartRadar;
var value = { name: "鄭青宇", nickname: "?????", id: "E24076344", intro: "自介", social: 50, travel: 45, food: 23, activity: 20, sport: 15, self: 10 };
var output_mission_ID
var socialx,socialy,travelx,travely,foodx,foody,activityx,activityy,sportx,sporty,selfx,selfy;
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
            put_mission = mission_list[i].name //mission_list[i]);
            output_mission_ID = mission_list[i].ID
            output_mission = mission_list[i].name
        } else { }
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
        } else { }
    }
}


function appendrooms() { //show rooms in chatroom page
    document.getElementById("chat-record").innerHTML = "";
    let chatroom = [];
    $.post('./mission/all_mission', function (data) {
        let group_pic;
        for (let i = 0; i < room_magnitude; i++) {
            for (let j = 0; j < data.length; j++) {
                if (rooms_data[i].name == data[j].name) {
                    if (data[j].category == "工作") {
                        group_pic = "../resources/update/work-rank.png"
                    } else if (data[j].category == "旅遊") {
                        group_pic = "../resources/update/travel-rank.png"
                    }
                    else if (data[j].category == "美食") {
                        group_pic = "../resources/update/food-rank.png"
                    }
                    else if (data[j].category == "活動") {
                        group_pic = "../resources/update/activity-rank.png"
                    }
                    else if (data[j].category == "朋友") {
                        group_pic = "../resources/update/friend-rank.png"
                    }
                    else if (data[j].category == "感情") {
                        group_pic = "../resources/update/love-rank.png"
                    }
                }
            }

            console.log(rooms_data[i].type + " " + i)
            if (rooms_data[i].type == "friend") {
                console.log("hihi");
                for (let j = 0; j < friend_magnitude; j++) {
                    if (rooms_data[i].name == friend_list[j].id) {
                        chatroom = chatroom + "<div class='useless_slideleft'><button class='group_deletebutton'>退群</button><div id='chat-room-num" + i + "'class='chat-room'><img class='chat-header'src='" + friend_list[j].image + "'/><div class='chat-room-text'><div class='chat-group-name'>" + friend_list[j].name + "</div><div class='chat-firstline'>" + rooms_data[i].talk + "</div></div></div><s class='space'></s></div>"
                    }
                }
                if (i == room_magnitude - 1) {
                    $("#chat-record").append(chatroom)
                }

                //let chatroom="<div id='chat-room-num"+i+"'class='chat-room'><img id='chat-header'src='"+friend_list[i].image+"'/><div class='chat-room-text'><h3 id='chat-group-name'>"+rooms_data[i].name+"</h3><h4 id='chat-firstline'>"+rooms_data[i].talk+"</h4></div></div>";

            } else {
                chatroom = chatroom + "<div class='group_slideleft'><div class='group_deletebutton' id='group_delete-num" + i + "'>退群</div><div id='chat-room-num" + i + "'class='chat-room'><img class='chat-header'src='" + group_pic + "'/><div class='chat-room-text'><div class='chat-group-name'>" + rooms_data[i].name + "</div><div class='chat-firstline'>" + rooms_data[i].talk + "</div></div></div><s class='space'></s></div>";
                if (i == room_magnitude - 1) {
                    $("#chat-record").append(chatroom)
                }

            }

        }
    })
}

function appendmissions() { //show missions in group create

    //document.getElementById("chat-choose-missions").innerHTML = "<div id='choose-mission-text'>選擇任務</div><form name='group-choose-mission' id='group-choose-mission'><img class='search-mission'src='../resources/nav/search.png'><input type='text' placeholder='        輸入任務名稱'name='missiontosearch' id='missiontosearch'></form>";
    let missions = []
    document.getElementById("put-mission-here").innerHTML = "";
    for (let i = 0; i <= mission_magnitude; i++) {
        //let missions="<input type='radio' name='choose_mission' id='C_M"+i+"'><label for='C_M"+i+"'><div id='choosed-mission"+i+"'class='choosed-mission unchosen'><h3>和陌生的你夜衝</h3></div></label>";
        if (i != mission_magnitude) {
            missions = missions + "<input type='radio' name='choose_mission' id='C_M" + i + "'><label for='C_M" + i + "'><div id='choosed-mission" + i + "'class='choosed-mission unchosen'><div id='mission-name-text'>" + mission_list[i].name + "</div></div></label>";
        } else {
            $("#put-mission-here").append(missions)
        }

    }
}

function appendfriends() { //show friends in group create
    //document.getElementById("chat-choose-friends").innerHTML = "<div id='choose-friend-text'>選擇好友</div><form name='group-choose-friend' id='group-choose-friend'><img class='search-friend'src='../resources/nav/search.png'><input type='text' placeholder='        輸入好友名稱'name='friendtosearch' id='friendtosearch'></form>";
    let friends = [];
    document.getElementById("put-friend-here").innerHTML = "";
    $.post('./find_M_friend', {
        qid: output_mission_ID
    }, function (data) {
        console.log(data[0].M_friend.length)
        if (data[0].M_friend != "") {
            for (let i = 0; i < data[0].M_friend.length; i++) {
                $.post('./findperson', {
                    person_ID: data[0].M_friend[i]
                }, function (fri) {
                    friends = friends + "<input type='checkbox' name='choose_friend' id='C_F" + i + "'><label for='C_F" + i + "'><div id='choosed-friend" + i + "'class='choosed-friend unchosen'><img src='" + fri.image + "'/><div id='friend-name-text'>" + fri.name + "</div></div>";
                    if (i == data[0].M_friend.length - 1) {
                        $("#put-friend-here").append(friends)
                    }
                })
                //let friends="<input type='checkbox' name='choose_friend' id='C_F"+i+"'><label for='C_F"+i+"'><div id='choosed-friend"+i+"'class='choosed-friend unchosen'><img src='../resources/nav/create_chat.png'/><h3>鄭青宇</h3></div>";


            }
        }
    })


}

function appendmissionsforlaunch() { //show missions in group create

    document.getElementById("mission-container").innerHTML = "<div id='mission-launched-title'>發起經歷</div>"
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

    document.getElementById("Fmission-container").innerHTML = "<div id='mission-launched-title'>發起經歷</div>"
    let missions = []
    console.log(Flaunch_mission_magnitude)
    for (let i = 0; i < Flaunch_mission_magnitude; i++) {
        //let missions="<input type='radio' name='choose_mission' id='C_M"+i+"'><label for='C_M"+i+"'><div id='choosed-mission"+i+"'class='choosed-mission unchosen'><h3>和陌生的你夜衝</h3></div></label>";
        missions = missions + "<div class='Flaunch-missions'><div class='Fmission-area'>" + Flaunch_mission_list[i].category + "</div><div class='Flaunch-mission-name'>" + Flaunch_mission_list[i].name + "</div><img class='Fbarchart'src='../resources/nav/barchart.png'/></div>";

        if (i == Flaunch_mission_magnitude - 1) {
            $("#Fmission-container").append(missions)
        }

    }
}
/*
function appendmissionsforsmall() { //show missions in group create

    document.getElementById("characteristics-L").innerHTML = "<div id='L-title'>發起經歷</div>";
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

    document.getElementById("Fcharacteristics-L").innerHTML = "<div id='FL-title'>發起經歷</div>";
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
*/
function newgroup() { //create a new group
    $.post('./newgroup', {
        output_mission: output_mission, //選擇的任務
        //output_friend:output_friend//選擇的好友
    },
        function (data) {
            data == "Success" //just return data==true,and create a new group
            for (let i = 0; i < output_friend.length; i++) {
                $.post('./assignmentadd', {
                    output_mission: output_mission,
                    friend_ID: output_friend[i] //選擇的好友
                },
                    function (data) {


                    });
            }

            $.post('./chatrecord', {},
                function (chatrooms) {
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
        function (data) {
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
        function (data) {
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
        function (data) {
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
        function (data) {
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
    if ($("#chat-main").is(".show")) {
        $.post('./chatrecord',
            function (chatrooms) {
                if (chatrooms.length > room_magnitude) {
                    room_magnitude = chatrooms.length;
                    rooms_data = chatrooms;
                    appendrooms();
                }


            });
    }
    if ($("#friend-main").is(".show")) {
        $.post('./friendrecord',
            function (friends) {
                if (friends.length > friend_magnitude) {
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
        //console.log("hidden");

    }
}
//chat page

//get rooms
$(document).on("click", '#city-button-chatroom', function () {
    $.post('./chatrecord', {},
        function (chatrooms) {
            console.log(chatrooms);
            room_magnitude = chatrooms.length;
            rooms_data = chatrooms;
            appendrooms();
        });

});
$(document).on("click", '#nav-chat', function () {
    $.post('./chatrecord', {},
        function (chatrooms) {
            console.log(chatrooms);
            room_magnitude = chatrooms.length;
            rooms_data = chatrooms;
            appendrooms();
        });

});
$("#create-chat-button").click(function () {
    mission_list = [];
    $.post('./mission/doing',
        function (data) {
            console.log(data.length);
            mission_magnitude = data.length;
            mission_list = data;
            console.log(data)
            appendmissions();
            $("#chat-choose-missions").removeClass("hidden").addClass("show");
            $(".chat-cover").removeClass("hidden").addClass("show");

        });
    console.log("create chat");

});
$(".button-sure").click(function () {

    appendfriends();
});

//friend page
function appendfriendsformenu() {
    document.getElementById("friend-record").innerHTML = "";

    console.log(friend_magnitude)
    let friend = [];
    for (let j = 0; j < friend_magnitude; j++) {
        friend = friend + "<div class='slideleft'id='slideleft" + j + "'><div class='deletebutton'id='delete-num" + j + "'>移除</div><div id='friend-num" + j + "'class='friend'><div class='friend-lefttwo'><div id='scroll-cover" + j + " hidden'></div><img class='friend-header'src='" + friend_list[j].image + "'/><div class='friend-text'><div class='friend-name'>" + friend_list[j].name + "</div></div></div><div class='friend-nickname'># " + friend_list[j].title + "</div></div><div class='space'></div></div><div class='compensate'></div>";
        if (j == friend_magnitude - 1) {
            $("#friend-record").append(friend)
        }

    }
}

function refreshfriend() {
    console.log("haha");
    $.post('./friendrecord',
        function (friends) {

            friend_magnitude = friends.friend.length;
            friend_list_ID = friends.friend;

            //if(friends){
            friend_list = [];
            for (let i = 0; i < friend_list_ID.length; i++) {
                $.post('./findperson', {
                    person_ID: friend_list_ID[i]
                },
                    function (data) {
                        //data.name, data.title, data.id, data.intro, data.image, data.social, data.travel, data.food, data.activity, data.sport, data.self;

                        friend_list.push(data);
                        setTimeout(function () { }, 100);
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
$("#nav-friend").click(function () {
    $.post('./friendrecord',
        function (friends) {
            console.log()
            friend_magnitude = friends.friend.length;
            friend_list_ID = friends.friend;
            appendfriendsformenu();
        });

    $.post('./chatrecord',
        function (chatrooms) {
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
        function (data) {
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
        function (data) {
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
        function (data) {
            console.log(ID);
            refreshfriend();
        });
}


//mypage page
$("#nav-mypage").click(function () {
    // appendmissionsforsmall();
    $.post('./mypage-record',
        function (data) {
            value=data
            document.getElementById("data-pic").src = value.image;
            document.getElementById("data-name").innerHTML = value.name;
            document.getElementById("data-nickname").innerHTML = "# " + value.title;
            document.getElementById("data-ID").innerHTML = "ID: " + value.id;
            document.getElementById("data-selfintro-text").innerHTML = value.intro;
            document.getElementById("value-social").innerHTML = "朋友: " + value.social;
            document.getElementById("value-travel").innerHTML = "旅遊: " + value.travel;
            document.getElementById("value-food").innerHTML = "美食: " + value.food;
            document.getElementById("value-activity").innerHTML = "活動: " + value.activity;
            document.getElementById("value-sport").innerHTML = "工作: " + value.sport;
            document.getElementById("value-self").innerHTML = "感情: " + value.self;
            
            let maxvalue = Math.max(value.social, value.travel, value.food, value.activity, value.sport, value.self)
            if(value.social==0){
                value.social=2
            }
            if(value.travel==0){
                value.travel=2
            }
            if(value.food==0){
                value.food=2
            }
            if(value.activity==0){
                value.activity=2
            }
            if(value.sport==0){
                value.sport=2
            }
            if(value.self==0){
                value.self=2
            }
            if (maxvalue != 0) {
                socialx = 50 + 50 * 1 / 2 * value.social / maxvalue;
                socialy = 50 - 50 * value.social / maxvalue;
                travelx = 50 + 50 * value.travel / maxvalue;
                travely = 50;
                foodx = 50 + 50 * 1 / 2 * value.food / maxvalue;
                foody = 50 + 50 * value.food / maxvalue;
                activityx = 50 - 50 * 1 / 2 * value.activity / maxvalue;
                activityy = 50 + 50 * value.activity / maxvalue;
                sportx = 50 - 50 * value.sport / maxvalue;
                sporty = 50;
                selfx = 50 - 50 * 1 / 2 * value.self / maxvalue;
                selfy = 50 - 50 * value.self / maxvalue;
            } else {
                socialx = 0;
                socialy = 0;
                travelx = 0;
                travely = 0;
                foodx = 0;
                foody = 0;
                activityx = 0;
                activityy = 0;
                sportx = 0;
                sporty = 0;
                selfx = 0;
                selfy = 0;
            }
            document.getElementById('rador-advanced').style = "clip-path:polygon(" + socialx + "% " + socialy + "%," + travelx + "% " + travely + "%," + foodx + "% " + foody + "%," + activityx + "% " + activityy + "%," + sportx + "% " + sporty + "%," + selfx + "% " + selfy + "%);";
            document.querySelector('#rador-advanced').style.left = (0.9 * $(window).width() - 0.22 * $(window).height()) / 2 + "px"
            document.querySelector('#rador .rador-hexagon').style.left = (0.9 * $(window).width() - 0.22 * $(window).height()) / 2 + "px"



        });

});
$("#city-button-personal").click(function () {
    // appendmissionsforsmall();
    $.post('./mypage-record',
        function (data) {
            value = data;
            document.getElementById("data-pic").src = value.image;
            document.getElementById("data-name").innerHTML = value.name;
            document.getElementById("data-nickname").innerHTML = "# " + value.title;
            document.getElementById("data-ID").innerHTML = "ID: " + value.id;
            document.getElementById("data-selfintro-text").innerHTML = value.intro;
            document.getElementById("value-social").innerHTML = "朋友: " + value.social;
            document.getElementById("value-travel").innerHTML = "旅遊: " + value.travel;
            document.getElementById("value-food").innerHTML = "美食: " + value.food;
            document.getElementById("value-activity").innerHTML = "活動: " + value.activity;
            document.getElementById("value-sport").innerHTML = "工作: " + value.sport;
            document.getElementById("value-self").innerHTML = "感情: " + value.self;
            
            let maxvalue = Math.max(value.social, value.travel, value.food, value.activity, value.sport, value.self)
            if(value.social==0){
                value.social=2
            }
            if(value.travel==0){
                value.travel=2
            }
            if(value.food==0){
                value.food=2
            }
            if(value.activity==0){
                value.activity=2
            }
            if(value.sport==0){
                value.sport=2
            }
            if(value.self==0){
                value.self=2
            }
            if (maxvalue != 0) {
                socialx = 50 + 50 * 1 / 2 * value.social / maxvalue;
                socialy = 50 - 50 * value.social / maxvalue;
                travelx = 50 + 50 * value.travel / maxvalue;
                travely = 50;
                foodx = 50 + 50 * 1 / 2 * value.food / maxvalue;
                foody = 50 + 50 * value.food / maxvalue;
                activityx = 50 - 50 * 1 / 2 * value.activity / maxvalue;
                activityy = 50 + 50 * value.activity / maxvalue;
                sportx = 50 - 50 * value.sport / maxvalue;
                sporty = 50;
                selfx = 50 - 50 * 1 / 2 * value.self / maxvalue;
                selfy = 50 - 50 * value.self / maxvalue;
            } else {
                socialx = 0;
                socialy = 0;
                travelx = 0;
                travely = 0;
                foodx = 0;
                foody = 0;
                activityx = 0;
                activityy = 0;
                sportx = 0;
                sporty = 0;
                selfx = 0;
                selfy = 0;
            }
            document.getElementById('rador-advanced').style = "clip-path:polygon(" + socialx + "% " + socialy + "%," + travelx + "% " + travely + "%," + foodx + "% " + foody + "%," + activityx + "% " + activityy + "%," + sportx + "% " + sporty + "%," + selfx + "% " + selfy + "%);";
            document.querySelector('#rador-advanced').style.left = (0.9 * $(window).width() - 0.22 * $(window).height()) / 2 + "px"
            document.querySelector('#rador .rador-hexagon').style.left = (0.9 * $(window).width() - 0.22 * $(window).height()) / 2 + "px"



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
            function (data) {
                message = data;
                let date = data[0].date
                $('#chat-content').append("<div class='room-date'><div class='room-date-data'>" + date + "</div></div>");

                for (let i = 1; i < data.length; i++) {
                    //let readed="已讀"
                    if (data[i].date != date) {
                        date = data[i].date
                        $('#chat-content').append("<div class='room-date'><div class='room-date-data'>" + date + "</div></div>");
                    }
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
            function (data) {
                message = data;
                let date = data[0].date
                $('#chat-content').append("<div class='room-date'><div class='room-date-data'>" + date + "</div></div>");
                for (let i = 1; i < data.length; i++) {
                    if (data[i].date != date) {
                        date = data[i].date
                        $('#chat-content').append("<div class='room-date'><div class='room-date-data'>" + date + "</div></div>");
                    }
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

$('.friend').click(function () {
    console.log("what");
});
//functions which is click
$(document).ready(function () {
    $.post('./chatrecord',
        function (chatrooms) {
            room_magnitude = chatrooms.length;
            rooms_data = chatrooms;

        });

    refreshfriend();

    $.post('./mypage-record',
        function (data) {
            mydata = data;
        });
    $(".chat-cover").click(function () {
        $("#chat-choose-missions").removeClass("show").addClass("hidden");
        $("#chat-choose-friends").removeClass("show").addClass("hidden");
        $(".button-sure").removeClass("show").addClass("hidden");
        $(".button-creategroup").removeClass("show").addClass("hidden");
        $(".chat-cover").removeClass("show").addClass("hidden");
        $("#makesure-deletegroup").removeClass("show").addClass("hidden")
    });
    $.post('./allstatus',
        function (data) {
            console.log(data);
            launch_mission_magnitude = data.length;
            launch_mission_list = data;

        });
});

$(document).on("click", '.chat-room', function () {

    let i = $(".chat-room").index(this);
    $("#chat-main").css('opacity', 1).animate({ opacity: 0 }, 300)
    setTimeout(function () {
        $("#chat-main").removeClass("show").addClass("hidden");
        $("#room-main").removeClass("hidden").addClass("show");
        $("#room-main").css('opacity', 0).animate({ opacity: 1 }, 600)
    }, 300)
    if (rooms_data[i].type == "mission") {
        document.getElementById("chat-room-name").innerHTML = rooms_data[i].name;
        roomstyle = "mission";
    } else {
        $.post('./findperson', {
            person_ID: rooms_data[i].name
        },
            function (data) {
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


    /*$("#room-main").removeClass("hidden").addClass("show");
    setTimeout(function () {
        $("#room-main").css('opacity', 0).animate({ opacity: 1 }, 600)
        },300)*/
});



// for(let i=0;i<mission_magnitude;i++){//to be green
$(document).on("click", '.choosed-mission', function () {
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
$(".button-sure").click(function () {
    $("#chat-choose-missions").removeClass("show").addClass("hidden");
    $("#chat-choose-friends").removeClass("hidden").addClass("show");
    $(".button-sure").removeClass("show").addClass("hidden");
    for (let i = friend_magnitude - 1; i >= 0; i--) { //歸零
        check_friend[i] = 0;
    }
});
console.log("nani");
//for(let i=0;i<friend_magnitude;i++){//to be green
$(document).on("click", '.choosed-friend', function () {
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

$(".button-creategroup").click(function () {
    $("#chat-choose-friends").removeClass("show").addClass("hidden");
    $(".button-creategroup").removeClass("show").addClass("hidden");
    $(".chat-cover").removeClass("show").addClass("hidden");
    newgroup();

});
$('#group-choose-mission').submit((event) => {
    event.preventDefault();
    let name = $('#group-choose-mission input[id=missiontosearch]').val();
    findmission(name);
});
$('#group-choose-friend').submit((event) => {
    event.preventDefault();
    let name = $('#group-choose-friend input[id=friendtosearch]').val();

    findfriend(name);
});


//friend page
//for(let i=0;i<friend_magnitude;i++){
$(document).on("click", '.friend', function () {

    friend_index = $(".friend").index(this);
    $("#click-friend").removeClass("hidden").addClass("show");
    $(".friend-cover").removeClass("hidden").addClass("show");
    document.getElementById("click-friend-header").src = friend_list[friend_index].image;
    document.getElementById("click-friend-name").innerHTML = friend_list[friend_index].name;
    $.post('./allstatus_others', {
        friend_ID: friend_list_ID[friend_index]
    },
        function (data) {
            console.log(data);
            Flaunch_mission_magnitude = data.length;
            Flaunch_mission_list = data;

        });
});
$(document).on("click", '#click-friend-chat', function () {
    $("#friend-main").css('opacity', 1).animate({ opacity: 0 }, 300)

    setTimeout(function () {
        $("#friend-main").removeClass("show").addClass("hidden");
        $("#click-friend").removeClass("show").addClass("hidden");
        $(".friend-cover").removeClass("show").addClass("hidden");
        $("#room-main").removeClass("hidden").addClass("show");
        $("#room-main").css('opacity', 0).animate({ opacity: 1 }, 600)
    }, 300)


    $.post('./singlefriend', { //****************************************************************
        friend_ID: friend_list_ID[friend_index]
    },
        function (data) { //get the chatroom_ID of you and the friend
            //chatroom_ID=ID
            data == "Success"
            document.getElementById("chat-room-name").innerHTML = friend_list[friend_index].name; //??
            roomstyle = "friend";
            roomID = friend_list[friend_index].id;
            $.post('./chatroom_friend', { //as same as the above one//****************************************************************
                friend_ID: friend_list_ID[friend_index]
            },
                function (data) {
                    message = data;
                    handle_message("friend", friend_list_ID[friend_index]);
                });
        });
});
$(document).on("click", '#click-friend-data', function () {

});

//}
$('#ID-choose-friend').submit((event) => {

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
$(document).on("click", '.deletebutton', function () {
    let i = $(".deletebutton").index(this);
    console.log("delete " + i);
    ID = friend_list_ID[i];
    $.post('./findperson', {
        person_ID: friend_list_ID[i]
    },
        function (data) {
            console.log(data)
            document.querySelector("#makesure-deletefriend .makesure-pic").src = data.image
            document.querySelector("#makesure-deletefriend .makesure-name").innerHTML = data.name
            $("#makesure-deletefriend").removeClass("hidden").addClass("show")
            $(".friend-cover").removeClass("hidden").addClass("show")
        })
    //deletefriend();
});
$(document).on("click", '#makesure-deletefriend .makesure-sure', function () {

    deletefriend();
    $("#makesure-deletefriend").removeClass("show").addClass("hidden")
    $(".friend-cover").removeClass("show").addClass("hidden")
})
//}
$('#makesure-deletefriend .makesure-cancel').click((event) => {
    $("#makesure-deletefriend").removeClass("show").addClass("hidden")
    $(".friend-cover").removeClass("show").addClass("hidden");
})
$('.friend-cover').click((event) => {
    $(".friend-cover").removeClass("show").addClass("hidden");
    $(".addfriend").removeClass("show").addClass("hidden");
    $("#button_cantfind").removeClass("show").addClass("hidden");
    $("#button_add").removeClass("show").addClass("hidden");
    $("#click-friend").removeClass("show").addClass("hidden");
    $("#makesure-deletefriend").removeClass("show").addClass("hidden")
});
$('.navbar').click((event) => {
    $(".friend-cover").removeClass("show").addClass("hidden");
    $(".addfriend").removeClass("show").addClass("hidden");
    $("#button_cantfind").removeClass("show").addClass("hidden");
    $("#button_add").removeClass("show").addClass("hidden");
});

//room page
$("#input-message").submit((event) => {
    event.preventDefault();
    let talk = $('#input-message input[name=messagetosend]').val();
    $("#messagetosend").val("");
    console.log(roomstyle);
    if (talk) {
        if (roomstyle == "friend") {
            sendmessage_friend(talk);
        } else if (roomstyle == "mission") {
            sendmessage_mission(talk);
        }
        return false;
    }
});
$("#input-message input[name=messagetosend]").keyup((event) => {
    event.preventDefault();
    if (event.keyCode == 13) {

        let talk = $('#input-message input[name=messagetosend]').val();
        $("#messagetosend").val("");
        console.log(roomstyle);
        if (talk) {
            if (roomstyle == "friend") {
                sendmessage_friend(talk);
            } else if (roomstyle == "mission") {
                sendmessage_mission(talk);
            }
            return false;
        }
    }
});
$("#input-message").submit((event) => {
    event.preventDefault();
});


$(document).on("click", '#logout', function () {
    $.post('./logout', {

    }, (data) => {
        if (data == 'jump')
            window.location.href = '../html/login.html';
    });
});
$(document).on("click", '#characteristics-L', function () {
    console.log("success")

    appendmissionsforlaunch();
    $("#mission-launched").removeClass("hidden").addClass("show");
    document.querySelector("#mission-container").style.top = 92 + "vh"
    $("#mission-container").animate({
        top: '17vh',
    });
});
$(document).on("click", '.characteristics-RT', function () {
    console.log("successs")

    $("#characteristic-analyze").removeClass("hidden").addClass("show");
    document.querySelector("#self-rador").style.top = 92 + "vh"
    $("#self-rador").animate({
        top: '17vh',
    });
});

$(document).on("click", '.back-button', function () {
    $("#mission-launched").removeClass("show").addClass("hidden");
    $("#characteristic-history").removeClass("show").addClass("hidden");
    $("#characteristic-analyze").removeClass("show").addClass("hidden");
});
$(document).on("click", '#click-friend-data', function () {

    $("#friend-main").css('opacity', 1).animate({ opacity: 0 }, 300)
    setTimeout(function () {
        $("#myfriend-main").removeClass("hidden").addClass("show");
        $("#friend-main").removeClass("show").addClass("hidden");
        $("#click-friend").removeClass("show").addClass("hidden");
        $(".friend-cover").removeClass("show").addClass("hidden");
        $("#myfriend-main").css('opacity', 0).animate({ opacity: 1 }, 600)
    }, 300)
    if (FchartRadar) {
        FchartRadar.destroy();
    }

    // appendmissionsforsmallF();
    $.post('./friendpage-record', {
        friend_ID: friend_list_ID[friend_index]
    },
        function (data) {
            value = data;
            document.getElementById("Fdata-pic").src = value.image;
            document.getElementById("Fdata-name").innerHTML = value.name;
            document.getElementById("Fdata-nickname").innerHTML = "# " + value.title;
            document.getElementById("Fdata-ID").innerHTML = "ID: " + value.id;
            document.getElementById("Fdata-selfintro-text").innerHTML = value.intro;
            document.getElementById("Fvalue-social").innerHTML = "朋友: " + value.social;
            document.getElementById("Fvalue-travel").innerHTML = "旅遊: " + value.travel;
            document.getElementById("Fvalue-food").innerHTML = "美食: " + value.food;
            document.getElementById("Fvalue-activity").innerHTML = "活動: " + value.activity;
            document.getElementById("Fvalue-sport").innerHTML = "工作: " + value.sport;
            document.getElementById("Fvalue-self").innerHTML = "感情: " + value.self;

            let maxvalue = Math.max(value.social, value.travel, value.food, value.activity, value.sport, value.self)
            if(value.social==0){
                value.social=2
            }
            if(value.travel==0){
                value.travel=2
            }
            if(value.food==0){
                value.food=2
            }
            if(value.activity==0){
                value.activity=2
            }
            if(value.sport==0){
                value.sport=2
            }
            if(value.self==0){
                value.self=2
            }
            if (maxvalue != 0) {
                socialx = 50 + 50 * 1 / 2 * value.social / maxvalue;
                socialy = 50 - 50 * value.social / maxvalue;
                travelx = 50 + 50 * value.travel / maxvalue;
                travely = 50;
                foodx = 50 + 50 * 1 / 2 * value.food / maxvalue;
                foody = 50 + 50 * value.food / maxvalue;
                activityx = 50 - 50 * 1 / 2 * value.activity / maxvalue;
                activityy = 50 + 50 * value.activity / maxvalue;
                sportx = 50 - 50 * value.sport / maxvalue;
                sporty = 50;
                selfx = 50 - 50 * 1 / 2 * value.self / maxvalue;
                selfy = 50 - 50 * value.self / maxvalue;
            } else {
                socialx = 0;
                socialy = 0;
                travelx = 0;
                travely = 0;
                foodx = 0;
                foody = 0;
                activityx = 0;
                activityy = 0;
                sportx = 0;
                sporty = 0;
                selfx = 0;
                selfy = 0;
            }
            document.getElementById('Frador-advanced').style = "clip-path:polygon(" + socialx + "% " + socialy + "%," + travelx + "% " + travely + "%," + foodx + "% " + foody + "%," + activityx + "% " + activityy + "%," + sportx + "% " + sporty + "%," + selfx + "% " + selfy + "%);";
            document.querySelector('#Frador-advanced').style.left = (0.9 * $(window).width() - 0.22 * $(window).height()) / 2 + "px"
            document.querySelector('#Frador .rador-hexagon').style.left = (0.9 * $(window).width() - 0.22 * $(window).height()) / 2 + "px"

        })
});
$(document).on("click", '#Fcharacteristics-L', function () {
    console.log("success")

    appendmissionsforlaunchF();
    $("#Fmission-launched").removeClass("hidden").addClass("show");
    document.querySelector("#Fmission-container").style.top = 92 + "vh"
    $("#Fmission-container").animate({
        top: '17vh',
    });
});
$(document).on("click", '.Fcharacteristics-RT', function () {

    $("#Fcharacteristic-analyze").removeClass("hidden").addClass("show");
    document.querySelector("#Fself-rador").style.top = 92 + "vh"
    $("#Fself-rador").animate({
        top: '17vh',
    });
});
$(document).on("click", '.Fback-button', function () {
    $("#Fmission-launched").removeClass("show").addClass("hidden");
    $("#Fcharacteristic-history").removeClass("show").addClass("hidden");
    $("#Fcharacteristic-analyze").removeClass("show").addClass("hidden");
});

$(document).on("click", '.characteristics-RB', function () {
    console.log("RBsuccesss")


    $.post('./getphotos', function (imgobj_arr) {
        $("#photobook-grid-wrapper").empty();
        imgobj_arr.forEach(obj => {
            let img = $("<img></img>").addClass("photobook-grid-item");
            let wrapper = $("<div></div>");

            img.attr("src", obj.picture); //文字說明: obj.pic_text, 任務ID: obj.ID
            wrapper.append(img);
            $("#photobook-grid-wrapper").append(wrapper);

        }); $("#characteristic-history").removeClass("hidden").addClass("show");
        document.querySelector("#self-history").style.top = 92 + "vh"
        $("#self-history").animate({
            top: '17vh',
        });
    });
});

$(document).on("click", '.Fcharacteristics-RB', function () {
    console.log("FRBsuccesss")


    $.post('./getphotos_friend', {
        friend_ID: friend_list_ID[friend_index]
    }, function (imgobj_arr) {
        $("#Fphotobook-grid-wrapper").empty();
        imgobj_arr.forEach(obj => {
            let img = $("<img></img>").addClass("Fphotobook-grid-item");
            let wrapper = $("<div></div>");

            img.attr("src", obj.picture); //文字說明: obj.pic_text, 任務ID: obj.ID
            wrapper.append(img);
            $("#Fphotobook-grid-wrapper").append(wrapper);

        }); $("#Fcharacteristic-history").removeClass("hidden").addClass("show");
        document.querySelector("#Fself-history").style.top = 92 + "vh"
        $("#Fself-history").animate({
            top: '17vh',
        });
    });
});
$(document).on("click", '#edit-link', function () {
    $("#edit-mydata").removeClass("hidden").addClass("show")
    $("#mypage-main").removeClass("show").addClass("hidden")
    $.post('./alltitle', function (d) {
        console.log(mydata)
        let sel = document.getElementById("edit-nickname-input"); //得到select的ID
        let opts = sel.getElementsByTagName("option"); //得到陣列option
        d.forEach(function (value, index) {
            if (value.name == mydata.title) {
                opts[index] = true
            } else {
                opts[index] = false
            }
            $("#edit-nickname-input").append("<option>" + value.name + "</option>")
        })
        $.post('./mypage-record', function (data) {
            $("#edit-header-pic").attr("src", data.image)
            $("#edit-name-input").attr("value", data.name)
            //$("##edit-nickname-input option[text='jQuery']").attr(data.title, true); 
            // $("#edit-nickname-input").attr("value", data.title)
            document.getElementById("edit-intro-input").innerHTML = data.intro
            //$("#edit-intro-input").append(data.intro)
        })
    })

})

function compress1(img, width, height, ratio) {
    var canvas, ctx, img64;
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);
    img64 = canvas.toDataURL("image/jpeg", ratio);
    return img64;
}
$(document).on("click", '#edit-submit', function (event) {
    event.preventDefault();
    console.log(document.getElementById("edit-name-input").value)
    let edit_name = document.getElementById("edit-name-input").value;
    let edit_title = document.getElementById("edit-nickname-input").value;
    let edit_intro = document.getElementById("edit-intro-input").value;
    let img64 = compress1(document.getElementById('edit-header-pic'), 500, 500, 0.85);
    $.post('./edit', {
        name: edit_name,
        title: edit_title,
        intro: edit_intro,
        image: img64
    }, function () {
        $.post('./mypage-record',
            function (data) {
                console.log("bug")
                mydata = data;
                document.getElementById("data-pic").src = value.image;
                document.getElementById("data-name").innerHTML = value.name;
                document.getElementById("data-nickname").innerHTML = value.title;
                document.getElementById("data-ID").innerHTML = value.id;
                $("#edit-mydata").removeClass("show").addClass("hidden")
                $("#mypage-main").removeClass("hidden").addClass("show")
                $.post('./mypage-record',
                    function (data) {
                        value = data;
                        document.getElementById("data-pic").src = value.image;
                        document.getElementById("data-name").innerHTML = value.name;
                        document.getElementById("data-nickname").innerHTML = "# " + value.title;
                        document.getElementById("data-ID").innerHTML = "ID: " + value.id;
                        document.getElementById("data-selfintro-text").innerHTML = value.intro;
                        document.getElementById("value-social").innerHTML = "朋友: " + value.social;
                        document.getElementById("value-travel").innerHTML = "旅遊: " + value.travel;
                        document.getElementById("value-food").innerHTML = "美食: " + value.food;
                        document.getElementById("value-activity").innerHTML = "活動: " + value.activity;
                        document.getElementById("value-sport").innerHTML = "工作: " + value.sport;
                        document.getElementById("value-self").innerHTML = "感情: " + value.self;
                        
                        let maxvalue = Math.max(value.social, value.travel, value.food, value.activity, value.sport, value.self)
                        if (maxvalue != 0) {
                            socialx = 50 + 50 * 1 / 2 * value.social / maxvalue;
                            socialy = 50 - 50 * value.social / maxvalue;
                            travelx = 50 + 50 * value.travel / maxvalue;
                            travely = 50;
                            foodx = 50 + 50 * 1 / 2 * value.food / maxvalue;
                            foody = 50 + 50 * value.food / maxvalue;
                            activityx = 50 - 50 * 1 / 2 * value.activity / maxvalue;
                            activityy = 50 + 50 * value.activity / maxvalue;
                            sportx = 50 - 50 * value.sport / maxvalue;
                            sporty = 50;
                            selfx = 50 - 50 * 1 / 2 * value.self / maxvalue;
                            selfy = 50 - 50 * value.self / maxvalue;
                        } else {
                            socialx = 0;
                            socialy = 0;
                            travelx = 0;
                            travely = 0;
                            foodx = 0;
                            foody = 0;
                            activityx = 0;
                            activityy = 0;
                            sportx = 0;
                            sporty = 0;
                            selfx = 0;
                            selfy = 0;
                        }

                        document.getElementById('rador-advanced').style = "clip-path:polygon(" + socialx + "% " + socialy + "%," + travelx + "% " + travely + "%," + foodx + "% " + foody + "%," + activityx + "% " + activityy + "%," + sportx + "% " + sporty + "%," + selfx + "% " + selfy + "%);";
                        document.querySelector('#rador-advanced').style.left = (0.9 * $(window).width() - 0.22 * $(window).height()) / 2 + "px"
                        document.querySelector('#rador .rador-hexagon').style.left = (0.9 * $(window).width() - 0.22 * $(window).height()) / 2 + "px"



                    });
            });



    })

})
$(document).ready(() => {
    const myFile = document.querySelector('#edit-submit-header')
    myFile.addEventListener('change', function (e) {
        const file = e.target.files[0]
        const reader = new FileReader()
        var header = document.querySelector('#edit-header-pic') // 需要開一個img的tag來存預覽的圖片
        reader.readAsDataURL(file)
        reader.onload = function () {
            header.src = reader.result;
            // $("#preview").css({ "width": "30vw", "height": "30vw", "background-size": "cover" }) // 預覽圖片的css屬性
            console.log("loaded preview.");
        }
    })

    $(document).on("click", '#edit-header-pic, #edit-header-text', function () {
        $("#edit-submit-header").trigger("click");

    })

});


function deletegroup() { //delete group
    console.log(deletegroupname)
    $.post('./assignmentdel', {
        chatroom_name: deletegroupname //他人ID
    },
        function (data) {
            $.post('./chatrecord', {},
                function (chatrooms) {
                    console.log(chatrooms);
                    room_magnitude = chatrooms.length;
                    rooms_data = chatrooms;

                    appendrooms();
                });
        });
}
$(document).on("click", '.group_deletebutton', function () {
    $("#makesure-deletegroup").removeClass("hidden").addClass("show")
    $(".chat-cover").removeClass("hidden").addClass("show")
    let i = $(".group_deletebutton").index(this);
    console.log("delete " + i);

    $.post('./mission/all_mission', function (data) {
        let group_pic
        for (let j = 0; j < data.length; j++) {
            if (rooms_data[i].name == data[j].name) {
                if (data[j].category == "工作") {
                    group_pic = "../resources/update/work-rank.png"
                } else if (data[j].category == "旅遊") {
                    group_pic = "../resources/update/travel-rank.png"
                }
                else if (data[j].category == "美食") {
                    group_pic = "../resources/update/food-rank.png"
                }
                else if (data[j].category == "活動") {
                    group_pic = "../resources/update/activity-rank.png"
                }
                else if (data[j].category == "朋友") {
                    group_pic = "../resources/update/friend-rank.png"
                }
                else if (data[j].category == "感情") {
                    group_pic = "../resources/update/self-rank.png"
                }
            }
            deletegroupname = rooms_data[i].name;
            document.querySelector("#makesure-deletegroup .makesure-pic").src = group_pic
            document.querySelector("#makesure-deletegroup .makesure-name").innerHTML = rooms_data[i].name
        }

    })

    //deletefriend();
});
$(document).on("click", '#makesure-deletegroup .makesure-sure', function () {

    deletegroup();
    $("#makesure-deletegroup").removeClass("show").addClass("hidden")
    $(".chat-cover").removeClass("show").addClass("hidden")
})
$('#makesure-deletegroup .makesure-cancel').click((event) => {
    $("#makesure-deletegroup").removeClass("show").addClass("hidden")
    $(".chat-cover").removeClass("show").addClass("hidden");
})


setTimeout(function () {

    // 定时器，用来检测滚动是否结束
    var eleListX
    var timerScrollEndDetect
    // 滚动事件开始
    for (let i = 0; i < friend_magnitude; i++) {
        timerScrollEndDetect = null;
        console.log("friend" + i)
        eleListX = document.querySelector("#slideleft" + i);
        eleListX.addEventListener('scroll', function () {
            console.log("sdfdsaaa")
            clearTimeout(timerScrollEndDetect);
            timerScrollEndDetect = setTimeout(function () {
                // 100毫秒内滚动事件没触发，认为停止滚动了
                // 对列表元素进行位置检测
                [].slice.call(eleListX.children).forEach(function (eleList, index) {
                    if (index == 1) {

                        if (eleList.getBoundingClientRect().left > 0) {
                            console.log(eleList.getBoundingClientRect().left)
                            $("#srcoll-cover" + i + "").removeClass("show").addClass("hidden")
                        } else {
                            $(".srcoll-cover" + i + "").removeClass("hidden").addClass("show")
                        }
                    }

                    /*if (Math.abs(eleList.getBoundingClientRect().left - eleListX.getBoundingClientRect().left) < 10) {
                       // 添加标志类名
                       eleList.classList.add('active');
                       // 提示
                       //result.innerHTML = '滚动结束，当前显示的是第'+ (index + 1) +'个列表。';
                       //console.log(index)
                   } else {
                       eleList.classList.remove('active');
                   }*/
                });
            }, 100);

            // 提示
            //result.innerHTML = '滚动中...';
        });
    }

}, 5000)
