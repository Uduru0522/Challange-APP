// Temp function for testing
// function fetch_quest_brief_info(str = "option", id) {
//     let jsonobj = {
//         "quest": [{
//                 "type": "種類一",
//                 "title": "內容內容好多內容",
//                 "id": 0
//             },
//             {
//                 "type": "種類二",
//                 "title": "內容內容好多內容",
//                 "id": 1
//             },
//             {
//                 "type": "種類三",
//                 "title": "內容內容好多內容",
//                 "id": 2
//             },
//             {
//                 "type": "種類4",
//                 "title": "內容內容好多內容",
//                 "id": 3
//             },
//             {
//                 "type": "種類5",
//                 "title": "內容內容好多內容",
//                 "id": 4
//             }
//         ]
//     }

//     return jsonobj;
// }

function fetch_quest_brief_info(option = "option") {
    let jsonstr, url = "./mission";
    if (option == "el") {
        url += "popular"
    } else if (option == "yml") {
        url += "maylike"
    } else if (option == "af") {
        url += "done"
    } else {
        console.log("Error in fetch_quest_brief_info(): invalid option");
    }

    /************************************************** */
    /***POST Request here****************************** */
    $.post(
        url,
        (data) => {
            jsonstr = data;
        }
    ).done(() => {
        console.log("option: ${option} data fetch successfully")
    }).fail(() => {
        console.log("option: ${option} data fetch failed")
    });
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^* */
    /************************************************** */
    return JSON.parse(jsonstr);
}


function fetch_quest_main_page(id) {
    let parents = [
        document.getElementById("everyone-like"),
        document.getElementById("you-might-like"),
        document.getElementById("already-finished")
    ];
    let option = ["el", "yml", "af"];
    for (let i = 0; i < 3; ++i) {
        // Create flex container
        let container = document.createElement("div")
        container.classList.add("horizontal-scroll-container");

        // Fetch adn build list
        let jsonobj = fetch_quest_brief_info(option[i], id);
        jsonobj.quest.forEach(qinfo => {
            // Create nodes
            let qblock = document.createElement("div");
            qblock.classList.add("quest-block");
            let type = document.createElement("div");
            type.classList.add("type");
            let title = document.createElement("div");
            title.classList.add("title");
            let button = document.createElement("div");
            button.classList.add("accept-button");

            // Emit text
            let type_span = document.createElement("span");
            let title_span = document.createElement("span");
            let button_span = document.createElement("span");

            type_span.textContent = qinfo.type;
            title_span.textContent = qinfo.title;
            button_span.textContent = "挑戰";
            button_span.setAttribute("id", "quest-${qinfo.id}");

            // Append nodes
            type.appendChild(type_span)
            qblock.appendChild(type);
            title.appendChild(title_span);
            qblock.appendChild(title);
            button.appendChild(button_span);
            qblock.appendChild(button);
            container.appendChild(qblock);
        });

        parents[i].appendChild(container);
    }

}