// Generate random base64 image
function b64ImgRandGen(width, height) {
    const imageData = new ImageData(width, height);
    const canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;

    imageData.data.set(imageData.data.map(() => Math.floor(Math.random() * 256)));
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

// Insert node after
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

/*********************************************** */
/*  Actual building functions                    */
/*********************************************** */

function build_quest_list(container, division) {
    // Clear out container
    container.innerHTML = "";

    // // Add mask
    // let mask = document.getElementsByClassName("container-fadeout-top")[0];
    // container.appendChild(mask.cloneNode(true));

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

            switch (parseInt(new_item.dataset.field)) {
                case 1:
                    new_item.querySelector(".qli-pt").style.backgroundColor = "#EC7320";
                    break;
                case 2:
                    new_item.querySelector(".qli-pt").style.backgroundColor = "#41B08C";
                    break;
                case 3:
                    new_item.querySelector(".qli-pt").style.backgroundColor = "#FFC301";
                    break;
                case 4:
                    new_item.querySelector(".qli-pt").style.backgroundColor = "#3964AB";
                    break;
                case 5:
                    new_item.querySelector(".qli-pt").style.backgroundColor = "#E64259";
                    break;
                case 6:
                    new_item.querySelector(".qli-pt").style.backgroundColor = "#08BBCE";
                    break;
                default:
                    console.log("No this color");
                    break;
            }

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
    // container.appendChild(document.getElementsByClassName("container-fadeout-top")[0].cloneNode(true));
    let item_base = document.getElementById("qoli-toclone");

    $.post("mission/doing", function(qdata) {
        console.log(qdata);

        qdata.forEach(function(q) {
            console.log(q);
            let new_item = item_base.cloneNode(true);
            new_item.removeAttribute("id");
            assignData(new_item, q.ID, q.category, q.multiple, q.points);

            // Assign content for each field
            new_item.querySelector(":scope .qli-field p").innerText = q.category;
            new_item.querySelector(".qli-title").innerText = q.name;

            // Set Progress Bar Look
            let progress_width = ((q.now_stage - 1) * 100 / q.stage).toString() + "%";
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
    document.getElementById("quest-submit").dataset.qid = qid;
    let retval = false;

    // POST request for quest info
    $.post("mission/detail", {
        qid: qid
    }, function(data) {
        console.log(data);
        let qdata = data[0];
        document.getElementById("quest-detail").dataset.qid = qid;

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

        switch (qdata.multiple) {
            case "single":
                document.getElementById("qd-plim-s").style.removeProperty("display");
                document.getElementById("qd-plim-m").style.display = "none";
                break;
            case "multi":
                document.getElementById("qd-plim-s").style.display = "none";
                document.getElementById("qd-plim-m").style.removeProperty("display");
                break;
            case "any":
                document.getElementById("qd-plim-s").style.removeProperty("display");
                document.getElementById("qd-plim-m").style.removeProperty("display");
                break;
            default:
                console.log("Error: build_detail()");
        }

        document.getElementById("quest-submit").dataset.stagecount = qdata.stage;
        document.getElementById("quest-submit").dataset.current = qdata.now_stage; // Need add in request

        $(".qd-submit-past").not("#qdsp-toclone").remove();
        if (qdata.stage > 1) {
            let submit_past_base = document.getElementById("qdsp-toclone");
            let container = document.getElementById("qd-submit-container");
            let count = qdata.stage;
            if (qdata.hasOwnProperty("Pic_stage")) {
                for (let i = 0; i < qdata.Pic_stage.length; ++i) {
                    console.log("looping pic detail, i=" + i);
                    let new_block = submit_past_base.cloneNode(true);
                    new_block.removeAttribute("id");

                    // Retreve past submit data
                    new_block.style.backgroundImage = "url(" + qdata.Pic_stage[i].picture + ")";


                    container.insertBefore(new_block, container.getElementsByClassName("dummy")[0]);
                }
            }
        }

        if (qdata.progress == "1") {
            document.getElementById("quest-stranger").dataset.progress = "1";
            document.getElementById("qd-submit").style.removeProperty("display");
        } else {
            document.getElementById("quest-stranger").dataset.progress = "0";
            document.getElementById("qd-submit").style.display = "none";
        }

        $("#qd-history-flex div").not(".placeholder").remove();
        for (let i = 0; i < qdata.Pic_detail.length; ++i) {
            let newgrid = document.createElement("div");
            newgrid.style.backgroundImage = "url(" + qdata.Pic_detail[i].picture + ")";
            document.getElementById("qd-history-flex").insertBefore(newgrid, document.getElementById("qd-history-flex-anchor"));
        }
    });
}

function build_quest_submit(qid, stage_count, current) {
    console.log("stage_count=" + stage_count);
    console.log("current=" + current);
    let container_base = document.getElementById("ssc-toclone").cloneNode(true);
    container_base.removeAttribute("id");
    let anchor = document.querySelector("#quest-submit");
    let temp = stage_count;

    $(".submit-step-container:not(#ssc-toclone)").remove();
    $("#submit-submit").data("qid", qid);

    while (temp) {
        let new_step = container_base.cloneNode(true);
        if (current + temp - 1 > stage_count) {
            console.log("past");
            new_step.classList.add("past");
        } else if (current + temp - 1 == stage_count) {
            console.log("current");
            new_step.classList.add("current");
        } else {
            console.log("future");
            new_step.classList.add("future");
        }
        anchor.appendChild(new_step);
        --temp;
    }
}