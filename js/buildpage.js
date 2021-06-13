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

        // Loop through array
        while (qlist.length) {
            // Clone new list item
            let new_item = base_item.cloneNode(true);
            new_item.removeAttribute("id");
            let q = qlist[0];

            // Assign dataset to item
            new_item.dataset.qid = q.ID;
            ["美食", "人際", "旅行", "學業", "課外", "冒險"].forEach(function(e, index) {
                if (q.category == e) {
                    new_item.dataset.field = index + 1;
                }
            });
            ["single", "multiple", "both"].forEach(function(e, index) {
                if (q.multiple == e) {
                    new_item.dataset.plim = index + 1;
                }
            });
            new_item.dataset.pts = q.points;

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
        document.querySelector("#qd-guide > span").textContent = qdata.description; // Not existence in current database
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