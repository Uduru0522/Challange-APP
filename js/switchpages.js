// Constants
const pages_selector = [
    "#mainpage",
    "#quest-main",
    "#chat-main",
    "#friend-main",
    "#mypage-main",
    "#filter",
    "#quest-filtered",
    "#quest-book",
    "#quest-detail",
    "#quest-whosin",
<<<<<<< HEAD
    "#quest-info",
    "#quest-submit",
    "#chat-create-room"
=======
    "#room-main"
>>>>>>> 68ecd5ba83b0fb480778d576458846777172396c
];

const nav_icons = [
    "#nav-mainpage",
    "#nav-quest",
    "#nav-chat",
    "#nav-friend",
    "#nav-mypage"
];

function hide_all_page() {
    pages_selector.forEach(element => {
        for (let i = 0; i < pages_selector.length; ++i) {
            $(pages_selector[i]).removeClass("show").addClass("hidden");
        }
    });
    return;
}

function hide_all_but_current_page(id) {
    console.log(id);

    if (id == "ID unset") {
        console.log("Error in hide_all_but_current_page: id unset")
        return
    }

    pages_selector.forEach(pages => {
        if ($(pages).attr("id") == id) {
            return;
        }
        $(pages).removeClass("show").addClass("hidden");
    });
    return;
}

// Event Listener
$(document).ready(() => {
    // Show Quest Page as Default
    hide_all_page();
    $("#quest-main").addClass("show").removeClass("hidden");

    // Navbar icon actions
    for (let i = 0; i < 5; ++i) {
        $(nav_icons[i]).on("click", () => {
            console.log("Clicked icon: " + nav_icons[i]);
            hide_all_page();
            $(pages_selector[i]).removeClass("hidden").addClass("show");
        });
    }
<<<<<<< HEAD

    // Jumping to/Return from quest details
    let origin_page = "#mainpage" // Back to mainpage if unset
    $(document).on("click", ".goto-quest-detail", function(e) {
        // Fetch quest information
        let qinfo = fetch_quest_info($(this).children(":first").attr("id"));
        $("#quest-intro-body").html(qinfo.text);
        $("#quest-require-body").html(qinfo.req);

        // Build page
        console.log("Clicked quest detail");
        hide_all_page();
        origin_page = "#" + $(this).closest(".container").attr("id");
        console.log("Jumping from: " + origin_page);
        $("#quest-info").addClass("show").removeClass("hidden");
        $("#quest-detail").removeClass("hidden").addClass("show");
    });

    $(document).on("click", ".return-arrow", () => {
        // Jump back to stored page
        $("#quest-detail").removeClass("show").addClass("hidden");
        $(origin_page).removeClass("hidden").addClass("show");
    });

    // Show Filter
    $(document).on("click", ".filter-button", function(e) {
        hide_all_but_current_page($(this).closest(".container").attr("id"));
        // reset_filter_options();
        $("#filter").removeClass("hidden").addClass("show");
    });

    // Hide filter
    $(document).on("click", "#filter-return-area", function(e) {
        // Reset filter option?
        $("#filter").removeClass("show").addClass("hidden");
    });

    // Apply filter
    const quest_filter_options = [
        "", "學業", "美食", "旅遊", "某些", "分門", "別類", "單人", "多人"
    ];
    let filter_selected = [0];
    $(document).on("click", "#filter-confirm", function(e) {
        // Fetch all quest
        let q_list = fetch_quest_brief_info("all");
        let selected = new Set();
        let filtered_list = [];

        if (filter_selected.length > 1) {
            for (let i = 0; i < q_list.quest.length; ++i) {
                for (let opt = 1; opt < quest_filter_options.length; opt++) {
                    if (filter_selected.indexOf(opt) != -1) {
                        console.log(q_list.quest[i].type + " | " + quest_filter_options[opt]);
                        if (q_list.quest[i].type == quest_filter_options[opt] ||
                            q_list.quest[i].pcount == quest_filter_options[opt]) {
                            selected.add(i);
                        }
                    }
                }
            }
        }

        console.log(selected);
        for (const index of selected) {
            filtered_list.push(q_list.quest[index]);
        }
        console.log(filtered_list);
        fetch_quest_list_page(filtered_list);

        hide_all_page();
        $("#quest-filtered").removeClass("hidden").addClass("show");
    });

    $(document).on("click", ".filter-type", function(e) {
        $(this).toggleClass("selected");
        let num = parseInt($(this).attr("id").match(/\d/g)[0]);
        console.log(num);
        if (num > 8 || num < 1) {
            console.log("option fetching failed");
            return;
        }

        if ($(this).hasClass("selected")) {
            filter_selected.push(num);
            console.log(filter_selected);
            return;
        }

        let index = filter_selected.indexOf(num);
        if (index == -1) {
            console.log("Error: no such element to remove");
            return;
        }
        filter_selected.splice(index, 1);
        console.log(filter_selected);
        return;
    });

    // Quest submit
    $(document).on("click", "#quest-detail-button", function() {
        $("#quest-info").toggleClass("show").toggleClass("hidden");
        $("#quest-submit").toggleClass("show").toggleClass("hidden");
    });

    // Show more 
    $(document).on("click", ".showmore", function() {
        fetch_quest_list_page(fetch_quest_brief_info($(this).attr("id"), 0).quest);
        hide_all_page();
        $("#quest-filtered").removeClass("hidden").addClass("show");
    })

});
=======
});
>>>>>>> 68ecd5ba83b0fb480778d576458846777172396c
