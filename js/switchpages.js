// Constants
const pages_selector = [
    "#mainpage",
    "#quest-main",
    "#chat-main",
    "#friend-main",
    "#mypage-main",
    "#room-main",
    "#myfriend-main",
    "#quest-filtered",
    "#quest-book",
    "#quest-whosin",
    "#quest-info",
    "#chat-create-room",
    "#quest-submit-field",
    "#click-friend",
    "#characteristic-analyze",
    "#characteristic-history",
    "#mission-launched",
    "#Fcharacteristic-analyze",
    "#Fcharacteristic-history",
    "#Fmission-launched",
    "#quest-filtered #quest-filtered-bg",
    ".quest-more-open",
    ".quest-more-closed",
    "#quest-create-new",
    "#edit-mydata",
    "#rank-main",
    "#makesure-deletefriend",
    "#makesure-deletegroup"
];

const nav_icons = [
    "#nav-mainpage",
    "#nav-quest",
    "#nav-chat",
    "#nav-friend",
    "#nav-mypage"
];

function hide_all_page(index) {
    pages_selector.forEach(element => {
        for (let i = 0; i < pages_selector.length; ++i) {
            $(pages_selector[i]).removeClass("show").addClass("hidden");

        }
        let stranger = document.getElementById("show-stranger");
        let stranger_pre = document.getElementById("pre-stranger");
        let stranger_full = document.getElementById("full-stranger");
        // stranger.classList.remove("stranger-full");
        // stranger.classList.add("stranger-hidden");
        // stranger_pre.classList.add("animate-fade-in");
        // stranger_pre.classList.remove("animate-fade-out");
        // stranger_full.classList.add("animate-fade-out");
        // stranger_full.classList.remove("animate-fade-in");
        [
            "quest-listing", "quest-titled-listing", "quest-ongoing-listing",
            "quest-detail", "quest-submit", "quest-stranger"
        ].forEach(selector => {
            document.getElementById(selector).style.display = "none";
        });

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
    $("#mainpage").addClass("show").removeClass("hidden");

    // Navbar icon actions
    for (let i = 0; i < 7; ++i) {
        $(nav_icons[i]).on("click", () => {
            console.log("Clicked icon: " + nav_icons[i]);
            for (let j = 0; j < 5; j++) {
                if ($(pages_selector[j]).hasClass("show")) {
                    console.log("show icon: " + nav_icons[j])
                    $(pages_selector[j]).css('opacity', 1).animate({ opacity: 0 }, 300)
                }
                if (j == 4) {
                    setTimeout(function() {
                        hide_all_page();
                        $(pages_selector[i]).removeClass("hidden").addClass("show")
                        $(pages_selector[i]).css('opacity', 0).animate({ opacity: 1 }, 600)
                        document.getElementById("chat-content").innerHTML = "";
                        // Switch to function pointers plz
                        if (nav_icons[i] == "#nav-quest") {
                            $(".quest-more-closed").removeClass("hidden").addClass("show");
                            $(".quest-more-open").removeClass("show").addClass("hidden");
                            $(".quest-more-expand").addClass("quest-more-shrink").removeClass("quest-more-expand");
                        }
                    }, 300)

                }
            }

        });
    }

    // Jumping to/Return from quest details
    // let origin_page = "#mainpage" // Back to mainpage if unset
    // $(document).on("click", ".goto-quest-detail", function(e) {
    //     if (e.target !== this) {
    //         return;
    //     }

    //     // Fetch quest information
    //     fetch_quest_info($(this).children(".qblock-qid").attr("id"), function(qinfo) {
    //         console.log(qinfo);
    //         $("#quest-intro-body").html(qinfo[0].description);
    //         $("#quest-require-body").html(qinfo[0].req);
    //         $("#quest-tag span").html(qinfo[0].category);
    //         $("#quest-title-text span").html(qinfo[0].name);
    //         $("#quest-points span").html(qinfo[0].points);
    //         // console.log($(e.target).children(".qblock-qid").attr("id"));
    //         // $("#quest-detail-button span").attr("id", $(e.target).children(".qblock-qid").attr("id"));
    //         $("#quest-detail-button span").attr("id", `quest-${qinfo[0].ID}`);
    //         $("#people-indicate span").text(qinfo[0].multiple);
    //         $("#img-grid-wrapper").empty();

    //         /* Process received images here ********* */
    //         if (qinfo[0].Pic_detail) {
    //             qinfo[0].Pic_detail.forEach(img => {
    //                 let element = $("<img></img>").addClass("img-grid-item");
    //                 let container = $("<div></div>");
    //                 element.attr("src", img.picture); //文字說明: img.pic_text
    //                 container.append(element);
    //                 $("#img-grid-wrapper").append(container);
    //             });
    //         }

    //         // Reset submit form
    //         $("#preview").attr("src", "../resources/click-to-upload.png");
    //         $("#quest-submit-text").val("");

    //         // Determine acceptation 
    //         if (qinfo[0].progress == 0) {
    //             $("#quest-detail-button").addClass("can-accept").removeClass("already-accept");
    //             $("#quest-detail-button span").text("挑戰");
    //             $("#quest-submit-field").addClass("hidden").removeClass("show");
    //             $("#quest-submit-field").css("display", "none");
    //         } else if (qinfo[0].progress == 1) {
    //             $("#quest-detail-button").addClass("already-accept").removeClass("can-accept");
    //             $("#quest-detail-button span").text("已接取");
    //             $("#quest-submit-field").addClass("show").removeClass("hidden");
    //             $("#quest-submit-field").css("display", "block");
    //         } else {
    //             console.log("Error: Quest progress not 1 or 0");
    //         }

    //         // Stranger form
    //         $("#pre-stranger").removeClass("animate-fade-out").addClass("animate-fade-in");
    //         $("#full-stranger").removeClass("animate-fade-in").addClass("animate-fade-out");
    //         $("#show-stranger").addClass("stranger-hidden");
    //         $("#show-stranger").removeClass("stranger-full");
    //     });

    //     // Build page
    //     console.log("Clicked quest detail");
    //     hide_all_page();
    //     origin_page = "#" + $(this).closest(".container").attr("id");
    //     console.log("Jumping from: " + origin_page);
    //     $("#quest-info").addClass("show").removeClass("hidden");
    //     $("#quest-detail").removeClass("hidden").addClass("show");
    // });

    // Show more (Land into titled listing)
    $(".showmore").on("click", function() {
        hide_all_page();
        document.getElementById("quest-titled-listing").style.removeProperty("display");
        let div = $(this).data("div");
        let title = document.querySelector("#quest-titled-listing .quest-list-title");
        if (div == "el") {
            title.innerHTML = "大家都喜歡";
        } else if (div == "yml") {
            title.innerHTML = "你可能還會喜歡"
        } else if (div == "af") {
            title.innerHTML = "最新任務"
        } else {
            title.innerHTML = "不該是這樣的";
        }
        build_quest_list(document.querySelector("#quest-titled-listing .quest-list-container"), div);
    });
});
setTimeout(function() {
    $(document).ready(function() {
        document.getElementById("loading-icon").style.display = "none";
        document.getElementById("loading-text").style.display = "none";
        document.getElementById("bodybody").style.display = "block";
    });
}, 2000);