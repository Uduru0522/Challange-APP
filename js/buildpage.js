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

            // Short-hand for info under use
            let q = qlist[0];

            // Remove unneeded attr. from base
            new_item.removeAttribute("id");

            // Assign dataset to item
            new_item.dataset.qid = q.ID;
            ["美食", "人際", "旅行", "學業", "課外", "冒險"].forEach(function(e, index) {
                if (q.category == e) {
                    new_item.dataset.field = index + 1;
                }
                console.log(q.category);
            });
            ["單人", "多人", "both"].forEach(function(e, index) {
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
    });
}