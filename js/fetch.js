// Local temp fetch
function fetch_quest_brief_info(option, callback) {
    // POST request: get pre-filtered quest brief
    let url = "./mission/";
    if (option == "el") {
        url += "popular";
    } else if (option == "yml") {
        url += "maylike";
    } else if (option == "af") {
        url += "done";
    } else if (option == "all") {
        url += "all_mission";
    } else {
        console.log("Error in fetch_quest_brief_info(): invalid option");
    }
    $.post(
        url,
        callback
    )
}

function fetch_quest_info(id_str, callback) {
    console.log(`Quest if string = \"${id_str}\"`)
    let qid = parseInt(id_str.replace(/quest-/, ""));
    console.log(qid);
    console.log("Fetching quest info of qid=" + qid);

    // POST request: Get quest full info
    $.post("mission/detail", {
            qid: qid
        },
        callback
    );
}

function fetch_quest_main_page(id) {
    let parents = [
        document.getElementById("everyone-like"),
        document.getElementById("you-might-like"),
        document.getElementById("already-finished")
    ];
    let option = ["el", "yml", "af"];
    for (let i = 0; i < 3; ++i) {
        // Fetch adn build list
        fetch_quest_brief_info(option[i], function(jsonobj) {
            console.log(jsonobj);

            // Create flex container
            let container = document.createElement("div")
            container.classList.add("horizontal-scroll-container");

            // Deal with each quest's info
            if (jsonobj) {
                jsonobj.forEach(qinfo => {

                    // Create nodes
                    let qblock = document.createElement("div");
                    qblock.classList.add("quest-block");
                    let type = document.createElement("div");
                    type.classList.add("type");
                    let title = document.createElement("div");
                    title.classList.add("title");
                    let button = document.createElement("div");
                    button.classList.add("accept-button");
                    button.classList.add("goto-quest-detail");

                    // Emit text
                    let type_span = document.createElement("span");
                    let title_span = document.createElement("span");
                    let button_span = document.createElement("span");

                    type_span.textContent = qinfo.category;
                    title_span.textContent = qinfo.name;
                    button_span.textContent = "挑戰";
                    button_span.setAttribute("id", "quest-" + qinfo.ID);

                    // Append nodes
                    type.appendChild(type_span)
                    qblock.appendChild(type);
                    title.appendChild(title_span);
                    qblock.appendChild(title);
                    button.appendChild(button_span);
                    qblock.appendChild(button);
                    container.appendChild(qblock);
                });
            }

            parents[i].appendChild(container);
        });
    }
}

function fetch_quest_list_page(q_list) {
    let list = document.getElementById("quest-list");
    while (list.firstChild) {
        list.removeChild(list.lastElementChild);
    }

    q_list.forEach(qinfo => {
        console.log(qinfo);
        let qblock = document.createElement("div");
        qblock.classList.add("qblock");

        let type = document.createElement("div");
        type.classList.add("qblock-type");

        let wrapper = document.createElement("div");
        wrapper.classList.add("qblock-wrapper");

        let title = document.createElement("div");
        title.classList.add("qblock-title");

        let more = document.createElement("div");
        more.classList.add("qblock-more");
        more.classList.add("goto-quest-detail");

        let points = document.createElement("div");
        points.classList.add("qblock-points");

        let state = document.createElement("div");
        state.classList.add("qblock-state");

        // Text spans
        let type_span = document.createElement("span");
        type_span.textContent = qinfo.category;
        type.appendChild(type_span);

        let title_span = document.createElement("span");
        title_span.textContent = qinfo.name;
        title.appendChild(title_span);

        let more_span = document.createElement("span");
        more_span.setAttribute("id", "quest-" + qinfo.ID);
        more_span.textContent = "更多內容"
        more.appendChild(more_span);

        let points_span = document.createElement("span");
        points_span.textContent = qinfo.points
        points.appendChild(points_span);

        let state_span = document.createElement("span");
        if (qinfo.progress == 0) {
            state.classList.add("can-accept");
            state_span.textContent = "挑戰";
        } else if (qinfo.progress == 1) {
            state.classList.add("already-accept");
            state_span.textContent = "已接取";
        } else {
            console.log("Error: Quest progress not 1 or 0");
        }
        state.appendChild(state_span);

        wrapper.appendChild(title);
        wrapper.appendChild(more);
        wrapper.appendChild(points);
        wrapper.appendChild(state);

        qblock.appendChild(type);
        qblock.appendChild(wrapper);

        list.appendChild(qblock);
    });
}