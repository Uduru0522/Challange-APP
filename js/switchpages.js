// All page, expect loading cover
let pages_selector = [
    "#mainpage",
    "#quest-main",
    "#chat-main",
    "#friend-main",
    "#mypage-main",
    "#quest-filtered",
    "#quest-book",
    "#quest-detail",
    "#quest-whosin",
    "#room-main"
];

let nav_icons = [
    "#nav-mainpage",
    "#nav-quest",
    "#nav-chat",
    "#nav-friend",
    "#nav-mypage"
];

$(document).ready(() => {
    // Navbar icon actions
    for (let i = 0; i < 5; ++i) {
        $(nav_icons[i]).on("click", () => {
            console.log("Clicked icon: " + nav_icons[i]);
            for (let j = 0; j < pages_selector.length; ++j) {
                $(pages_selector[j]).removeClass("show").addClass("hidden");
            }
            $(pages_selector[i]).removeClass("hidden").addClass("show");
        });
    }
});
