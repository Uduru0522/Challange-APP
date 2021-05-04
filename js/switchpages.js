// Constants
const pages_selector = [
    "#mainpage",
    "#quest-main",
    "#chat-main",
    "#friend-main",
    "#mypage-main",
    "#quest-filtered",
    "#quest-book",
    "#quest-detail",
    "#quest-whosin",
    "#chat-create-room"
];

const nav_icons = [
    "#nav-mainpage",
    "#nav-quest",
    "#nav-chat",
    "#nav-friend",
    "#nav-mypage"
];

// Murmur: can I use bit manipulations please?
const quest_filter_options = {
    FOPT_ALL: 0, // All (no filter, should not be chose with others)
    FOPT_SINGLE: 1, // Single Person
    FOPT_MULTI: 2, // Multi Person
    FOPT_FOOD: 3, // Food
    FOPT_TRAVEL: 4, // Travel
    FOPT_ACAD: 5, // Academic
    FOPT_IR: 6, // Interpersonal Relations
};

function hide_all_page() {
    pages_selector.forEach(element => {
        for (let i = 0; i < pages_selector.length; ++i) {
            $(pages_selector[i]).removeClass("show").addClass("hidden");
        }
    });
    return;
}

function fetch_quest_info(id_str) {
    console.log(`Quest if string = \"${id_str}\"`)
    let qid = parseInt(id_str.match(/\d/g));
    console.log("Fetching quest info of qid=" + qid);

    // Insert POST request here
    let qinfo_text = "這象徵著生命是一條康莊大道，它是老天爺設計好的直線，即便中間可能遇到不少阻礙，但，生命始終為你敞開，不只是生活的過程，而是通往夢想的道路！同時，在你經過康莊大道的路途上，你也許會看到它逐漸彎曲，但，它始終會再拐回正道！";
    let qinfo_req = "這廢話充斥的年代(？)，總是要上網發發廢文，上台講講廢話，這個世界才會更美好(？？)。一本通通都是廢話並搭配精美圖片的書籍非常具有療癒能力，像是：「路，就是一條直直的，但也可以是彎彎的。";
    /* *********************** */

    return {
        text: qinfo_text,
        req: qinfo_req
    };
}

// Event Listener
$(document).ready(() => {
    // Navbar icon actions
    for (let i = 0; i < 5; ++i) {
        $(nav_icons[i]).on("click", () => {
            console.log("Clicked icon: " + nav_icons[i]);
            hide_all_page();
            $(pages_selector[i]).removeClass("hidden").addClass("show");
        });
    }

    // Jumping to/Return from quest details
    let origin_page = "#mainpage" // Back to mainpage if unset
    $(document).on("click", ".goto-quest-detail", function(e) {
        // POST REQUEST: Fetch quest information
        let qinfo = fetch_quest_info($(this).children(":first").attr("id"));
        $("#quest-intro-body").html(qinfo.text);
        $("#quest-require-body").html(qinfo.req);

        // Build page
        console.log("Clicked quest detail");
        hide_all_page();
        origin_page = "#" + $(this).closest(".container").attr("id");
        console.log("Jumping from: " + origin_page);
        $("#quest-detail").removeClass("hidden").addClass("show");
    });

    $(document).on("click", ".return-arrow", () => {
        // Jump back to stored page
        $("#quest-detail").removeClass("show").addClass("hidden");
        $(origin_page).removeClass("hidden").addClass("show");
    });
});