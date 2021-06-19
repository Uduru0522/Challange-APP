// Generate random base64 image
function b64ImgRandGen(width, height) {
    const imageData = new ImageData(width, height);
    const canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;

    imageData.data.set(imageData.data.map(() => _.random(0, 255)))
    canvas.getContext('2d').putImageData(imageData, 0, 0);

    return canvas.toDataURL();
}

// Assign dataset to item according to list
function assignData(item, qid, qcat, qplim, qpts) {
    item.dataset.qid = qid;
    ["美食", "旅遊", "活動", "工作", "感情", "朋友"].forEach(function(e, index) {
        if (qcat == e) {
            item.dataset.field = index + 1;
        }
    });
    ["single", "multi", "any"].forEach(function(e, index) {
        if (qplim == e) {
            item.dataset.plim = index + 1;
        }
    });
    item.dataset.pts = qpts;
}


/*********************************************** */
/*  Actual building functions                    */
/*********************************************** */

function build_quest_list(container, division) {
    // Clear out container
    container.innerHTML = "";

    // Add mask
    let mask = document.getElementsByClassName("container-fadeout-top")[0];
    container.appendChild(mask.cloneNode(true));

    // Fetch data according to division
    console.log(division);
    fetch_quest_brief_info(division, function(qlist) {
        // Retrieve base <div> to clone
        let base_item = document.getElementById("qli-toclone");

        console.log(qlist);
        // qlist = [
        //     { ID: 999, category: "美食", multiple: "single", points: 12, name: "事室用断大山" },
        //     { ID: 999, category: "美食", multiple: "multi", points: 15, name: "事室用断大山" },
        //     { ID: 999, category: "人際", multiple: "single", points: 20, name: "事室用断大山" },
        //     { ID: 999, category: "人際", multiple: "any", points: 25, name: "事室用断大山" },
        //     { ID: 999, category: "美食", multiple: "multi", points: 30, name: "事室用断大山" }
        // ];

        // Loop through array
        while (qlist.length) {
            // Clone new list item
            let new_item = base_item.cloneNode(true);
            new_item.removeAttribute("id");
            let q = qlist[0];
            assignData(new_item, q.ID, q.category, q.multiple, q.points);

            // Assign content for each field
            new_item.querySelector(":scope .qli-field p").innerText = q.category;
            new_item.querySelector(".qli-title").innerText = q.name;
            new_item.querySelector(".qli-pt").innerText = q.points;

            // Determine accept state
            new_item.querySelector(".qli-accept").dataset.qid = q.ID;
            if (q.progress == 0) {
                new_item.querySelector(".qli-accept").classList.add("owbtn-select");
                new_item.querySelector(".qli-accept").classList.add("can-accept");
            } else {
                new_item.querySelector(".qli-accept").classList.add("owbtn-deselect");
                new_item.querySelector(".qli-accept").classList.add("did-accept");
            }

            // Append item to container
            new_item.classList.add("item-show-90px");
            container.appendChild(new_item);

            // Remove from array
            qlist.shift();
        }
    });
}

function build_ongoing_list() {
    let container = document.querySelector("#quest-ongoing-listing .quest-list-container");
    container.innerHTML = "";
    container.appendChild(document.getElementsByClassName("container-fadeout-top")[0].cloneNode(true));
    let item_base = document.getElementById("qoli-toclone");

    $.post("mission/doing", function(qdata) {
        console.log(qdata);

        // Temp input for testing
        // qdata = [
        //     { qid: 999, category: "美食", name: "放事室用断大山定", plim: "single", pts: 20, goal: 3, current: 2 },
        //     { qid: 999, category: "美食", name: "手宏対写", plim: "both", pts: 25, goal: 1, current: 0 },
        //     { qid: 999, category: "人際", name: "週言無任社", plim: "multiple", pts: 30, goal: 4, current: 1 },
        //     { qid: 999, category: "人際", name: "百人業骨治般広", plim: "single", pts: 35, goal: 1, current: 0 },
        //     { qid: 999, category: "旅行", name: "毎読戸問回題", plim: "both", pts: 40, goal: 5, current: 3 },
        //     { qid: 999, category: "美食", name: "携喫川米商局粉送", plim: "multiple", pts: 10, goal: 9, current: 8 },
        //     { qid: 999, category: "美食", name: "大山定能温埼自載", plim: "single", pts: 15, goal: 2, current: 1 },
        //     { qid: 999, category: "學業", name: "穂宮服件富", plim: "both", pts: 20, goal: 5, current: 4 },
        //     { qid: 999, category: "人際", name: "際口百", plim: "both", pts: 20, goal: 3, current: 0 }
        // ];

        qdata.forEach(function(q) {
            console.log(q);
            let new_item = item_base.cloneNode(true);
            new_item.removeAttribute("id");
            assignData(new_item, q.ID, q.category, q.multiple, q.points);

            // Assign content for each field
            new_item.querySelector(":scope .qli-field p").innerText = q.category;
            new_item.querySelector(".qli-title").innerText = q.name;

            // Set Progress Bar Look
            let progress_width = (q.now_stage * 100 / q.stage).toString() + "%";
            console.log(progress_width);
            new_item.querySelector(".qli-progress").style.setProperty("--progress-width", progress_width);
            new_item.querySelector(".qli-progress").dataset.stage = q.stage;

            // Append item
            new_item.classList.add("item-show-70px");
            container.appendChild(new_item);
        });

    });
}

function build_quest_detail(qid) {
    console.log("qid=" + qid);

    // POST request for quest info
    $.post("mission/detail", {
        qid: qid
    }, function(data) {
        console.log(data);
        let qdata = data[0];

        // Header contents
        document.querySelectorAll(".qdh-field").forEach(e => {
            e.textContent = qdata.category;
        });
        document.querySelectorAll(".qdh-qname").forEach(e => {
            e.textContent = qdata.name;
        });
        document.querySelectorAll(".qdh-pts").forEach(e => {
            e.textContent = qdata.points;
        });

        // Body contents
        document.querySelector("#qd-intro > span").textContent = qdata.description;
        document.querySelector("#qd-guide > span").textContent = qdata.guide;
        let accept_button = document.getElementById("qd-accept");
        accept_button.dataset.qid = qid;
        if (qdata.progress == "0") {
            accept_button.classList.remove("did-accept");
            accept_button.classList.remove("owbtn-deselect");
            accept_button.classList.add("can-accept");
            accept_button.classList.add("owbtn-select");
        } else {
            accept_button.classList.remove("can-accept");
            accept_button.classList.remove("owbtn-select");
            accept_button.classList.add("did-accept");
            accept_button.classList.add("owbtn-deselect");
        }
        if (qdata.stage > 1) {
            let submit_past_base = document.getElementById("qdsp-toclone");
            let container = document.getElementById("qd-submit-container");
            let count = qdata.stage;
            while (count > 1) {
                let new_block = submit_past_base.cloneNode(true);
                new_block.removeAttribute("id");

                // Retreve past submit data
                new_block.style.backgroundImage = "url(" + b64ImgRandGen(50, 50) + ")";


                container.insertBefore(new_block, container.getElementsByClassName("dummy")[0]);
                count--;
            }
        }

    });
}