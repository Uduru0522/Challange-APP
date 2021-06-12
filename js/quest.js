// Utils
function compress(img, width, height, ratio) {
    var canvas, ctx, img64;
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);
    img64 = canvas.toDataURL("image/jpeg", ratio);
    return img64;
}

// Detect mouse drag / touchscreen swipe
function swipedetect(el, callback) {
    let target = el;
    let swipedir, startX, startY, distX, distY; // Record and calculate drag/swipe vector
    let threshold = 150; // Required min distance traveled to be considered swipe
    let restraint = 100; // Maximum distance allowed at the same time in perpendicular direction
    let window = 300; // Maximum time allowed to travel that distance
    let elapsedTime, startTime; // Handle drag/swipe time vector
    let handleswipe = callback || function(swipedir) {};

    let dragging = false,
        swiping = false; // Allow only one of the event

    target.addEventListener("mousedown", function(e) {
        if (!swiping) {
            dragging = true;
            swipedir = "none";
            dist = 0;
            startX = e.pageX;
            startY = e.pageY;
            startTime = new Date().getTime(); // Record contact time (milisecond)
        } else {
            console.log("Already swiping");
        }
    }, false);

    target.addEventListener('touchstart', function(e) {
        let touchobj = e.changedTouches[0]; // Accept 1 and the first touch event at the same time
        if (!dragging) {
            swiping = true;
            swipedir = "none";
            dist = 0;
            startX = touchobj.pageX;
            startY = touchobj.pageY;
            startTime = new Date().getTime(); // Record contact time (milisecond)
        } else {
            console.log("Already dragging");
        }
    }, false);

    // Prevent page scrolling when swiping
    target.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, false);

    target.addEventListener("mousemove", function(e) {
        e.preventDefault();
    }, false);

    target.addEventListener('touchend', function(e) {
        if (swiping) {
            let touchobj = e.changedTouches[0];
            distX = touchobj.pageX - startX;
            distY = touchobj.pageY - startY;
            elapsedTime = new Date().getTime() - startTime;
            if (elapsedTime <= window) {
                // Swipe/Drag Vector check
                if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                    swipedir = (distX < 0) ? "left" : "right";
                } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
                    swipedir = (distY < 0) ? "up" : "down";
                }
            } else {
                console.log("Swipe faster! Elapsed time =" + elapsedTime + ", Window = " + window);
            }
        }
        swiping = false;
        handleswipe(swipedir);
        e.preventDefault();
    }, false);

    target.addEventListener("mouseup", function(e) {
        if (dragging) {
            distX = e.pageX - startX;
            distY = e.pageY - startY;
            elapsedTime = new Date().getTime() - startTime;
            if (elapsedTime <= window) {
                // Swipe/Drag Vector check
                if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                    swipedir = (distX < 0) ? "left" : "right";
                } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
                    swipedir = (distY < 0) ? "up" : "down";
                }
            } else {
                console.log("Drag faster! Elapsed time =" + elapsedTime + ", Window = " + window);
            }
            dragging = false;
            handleswipe(swipedir);
            e.preventDefault();
        }
    }, false);
}

// Event Listeners on page load
$(document).ready(() => {

    /***************************************************************************** */
    /* Filter events                                                               */
    /***************************************************************************** */

    // Show filter panel
    let to_filter;
    let fop_ppl = new Set(),
        fop_field = new Set();
    $(document).on("click", ".filter-button", function(e) {
        // Show filter
        document.getElementById("filter").style.removeProperty("display");
        document.querySelector(".navbar").style.display = "none";

        // Reset options
        fop_ppl.clear(), fop_field.clear();
        $(".filter-option").removeClass("owbtn-select").addClass("owbtn-deselect");

        // Set target to filter
        if ($(this).closest(".container").attr("id") == "quest-main") {
            // Generate and filter all-quest listing
            to_filter = $("#quest-listing .quest-list-container");
            build_quest_list(to_filter[0], "all");
        } else {
            // Or filter current page
            to_filter = $(this).closest(".container").find(".quest-list-container");
        }
    });

    // Close filter panel
    $(document).on("click", "#filter-return", function(e) {
        document.getElementById("filter").style.display = "none";
        document.querySelector(".navbar").style.removeProperty("display");
    });

    // Reset filter options
    $("#filter-footer .reset").on("click", function(e) {
        fop_ppl.clear(), fop_field.clear();
        $(".filter-option.owbtn-select").removeClass("owbtn-select").addClass("owbtn-deselect");
    });

    // Apply filter
    $("#filter-footer .confirm").on("click", function(e) {
        console.log(to_filter.children(".quest-list-item"));
        // Close filter panel
        $("#filter-return")[0].click();

        // Switch to all-quest listing if on quest-main
        if ($("#quest-main").hasClass("show")) {
            $("#quest-main").removeClass("show").addClass("hidden");
            console.log(to_filter[0]);
            document.getElementById("quest-listing").style.removeProperty("display");
        }

        // Filter in order
        let disappear_interval = 5;
        let promise = Promise.resolve();
        console.log(to_filter);
        console.log(to_filter.children());
        to_filter.children(".quest-list-item").each(function(index, element) {
            let matched = false;
            console.log($(this));

            // Apply filters
            fop_field.forEach(opt => {
                if (parseInt($(this).data("field")) == parseInt(opt)) {
                    matched = true;
                }
            });
            fop_ppl.forEach(opt => {
                if (matched && (parseInt($(this).data("plim")) != parseInt(opt))) {
                    matched = false;
                }
            });
            let lower_bound, upper_bound;
            let linput = $("#pts-filter input[name=lb]"),
                uinput = $("#pts-filter input[name=ub]"),
                elem_pts = parseInt($(this).data("pts"));
            if (linput.val() == null || linput.val() == "") {
                lower_bound = 0;
            } else {
                lower_bound = parseInt(linput.val());
            }
            if (uinput.val() == null || uinput.val() == "") {
                upper_bound = 99999;
            } else {
                upper_bound = parseInt(uinput.val());
            }
            console.log(lower_bound + ", " + upper_bound);

            if (matched && (elem_pts < lower_bound || elem_pts > upper_bound)) {
                matched = false
            }

            // Toggle quest show / hidden with time delay between
            promise = promise.then(() => {
                if (!matched && $(this).hasClass("item-show-90px")) {
                    if ($(this).hasClass("item-show-90px")) {
                        $(this).removeClass("item-show-90px").delay(5).queue(function(next) {
                            $(this).addClass("item-hide-90px");
                            next();
                        });
                    }
                } else if (matched && $(this).hasClass("item-hide-90px")) {
                    $(this).delay(200).queue(function(next) {
                        $(this).addClass("item-show-90px");
                        $(this).removeClass("item-hide-90px")
                        next();
                    });
                } else {
                    // No animation, no delay
                    return new Promise(function(resolve) {
                        setTimeout(resolve, 0);
                    });
                }
                return new Promise(function(resolve) {
                    setTimeout(resolve, disappear_interval);
                });
            })
        });
    });

    // Select field options
    $("#field-filter .filter-option").on("click", function(e) {
        if ($(this).hasClass("owbtn-deselect")) {
            $(this).removeClass("owbtn-deselect").addClass("owbtn-select");
            fop_field.add($(this).data("option"));
        } else {
            $(this).removeClass("owbtn-select").addClass("owbtn-deselect");
            fop_field.delete($(this).data("option"));
        }
        console.log(fop_field);
    });

    // Select people limit options
    $("#ppllimit-filter .filter-option").on("click", function(e) {
        if ($(this).hasClass("owbtn-deselect")) {
            $(this).removeClass("owbtn-deselect").addClass("owbtn-select");
            fop_ppl.add($(this).data("option"));
        } else {
            $(this).removeClass("owbtn-select").addClass("owbtn-deselect");
            fop_ppl.delete($(this).data("option"));
        }
        console.log(fop_ppl);
    });

    /***************************************************************************** */
    /* Quest List Events                                                           */
    /***************************************************************************** */

    // Accept quest in list
    $(document).on("click", ".qli-accept.can-accept", function() {
        // Get qid
        let qid = $(this).closest(".quest-list-item").data("qid");
        console.log(qid);

        // Send POST req
        $.post(
            "mission/accept", {
                qid: qid
            },
            function(response) {
                console.log("Quest accepted successfully");
            }
        )

        $(this).removeClass("can-accept").addClass("did-accept");
        $(this).removeClass("owbtn-select").addClass("owbtn-deselect");
    });

    // Goto quest-detail from quest list
    $(document).on("click", ".quest-list-item", function(e) {
        // Dont trigger on accept quest button
        if ($(e.target).hasClass("qli-accept")) {
            return;
        }

        build_quest_detail($(this).data("qid"));
    });

    /***************************************************************************** */
    /* Quest List events                                                           */
    /***************************************************************************** */

    // Accept quest in detail page
    $(document).on("click", "#quest-detail-button", function() {
        if ($(this).children(":first").text() == "挑戰") {
            const qid = $(this).children(":first").attr("id").match(/\d+/g);
            $("#quest-submit-field").removeClass("hidden").addClass("show");
            console.log(qid);

            // Send POST request to accept quest
            $.post(
                "mission/accept", {
                    qid: qid
                },
                function() {
                    console.log("Quest accepted successfully");
                }
            )
            $(this).addClass("already-accept").removeClass("can-accept");
            $(this).children("span").text("已接取");
        }
    });

    // Submit quests
    $(document).on("click", "#quest-submit-button", function() {
        // Send post request to submit quest
        const img64 = compress(document.getElementById('preview'), 200, 200, 0.9);
        console.log($("#quest-detail-button span").attr("id"));
        const qid = $("#quest-detail-button span").attr("id").match(/\d+/g);
        console.log(qid);
        $.post(
            "./mission/report_single", {
                qid: qid,
                img: img64,
                text: $("#quest-submit-text").val()
            },
            function(data) {
                console.log("Update success");
            }
        );
        $("#quest-submit-field").removeClass("show").addClass("hidden");
        $(this).closest(".container").find(".return-arrow").trigger("click");
    });

    // Image preview on upload
    // const myFile = document.querySelector('#quest-submit-img')
    // myFile.addEventListener('change', function(e) {
    //     const file = e.target.files[0]
    //     const reader = new FileReader()
    //     const img = document.querySelector('#preview')
    //     reader.readAsDataURL(file)
    //     reader.onload = function() {
    //         img.src = reader.result;
    //         console.log("loaded preview.");
    //     }
    // })

    // Redirect click event on uploading image
    $(document).on("click", "#preview", function() {
        $("#quest-submit-img").trigger("click");
    });

    // Show stranger panel in quest detail
    let hidetimer = null;
    swipedetect(document.getElementById("show-stranger"), function(dir) {
        if (dir != "none") {
            clearTimeout(hidetimer);
            console.log("Swiped/Dragged" + dir);
            if (dir == "up") {
                // Transform to full information
                let target = document.getElementById("show-stranger");
                target.classList.add("stranger-full");
                target.classList.remove("stranger-hidden");

                let pre = document.getElementById("pre-stranger");
                let full = document.getElementById("full-stranger");

                pre.classList.add("animate-fade-out");
                pre.classList.remove("animate-fade-in");
                full.classList.add("animate-fade-in");
                full.classList.remove("animate-fade-out");
            }
        }
    });

    /***************************************************************************** */
    /* Quest more-action list related events                                       */
    /***************************************************************************** */

    // Quest option menu
    $(".quest-more-option").on("click", function(e) {
        $(".quest-more").removeClass("quest-more-shrink").addClass("quest-more-expand");
        $(".quest-more-closed").removeClass("show").addClass("hidden");
        $(".quest-more-open").removeClass("hidden").addClass("show");
    });
    $(".quest-more-x").on("click", function(e) {
        $(".quest-more").removeClass("quest-more-expand").addClass("quest-more-shrink");
        $(".quest-more-closed").removeClass("hidden").addClass("show");
        $(".quest-more-open").removeClass("show").addClass("hidden");
    });

    // Goto create new quest
    let quest_create_current_step = 1;
    $(".quest-more-new").on("click", function(e) {
        hide_all_page();
        $("#quest-create-new").removeClass("hidden").addClass("show");

        // Initialize all inputs
        $("#quest-create-new input, #quest-create-new textarea").val("");
        $(".owbtn-select").addClass("owbtn-deselect").removeClass("owbtn-select");
        qc_f = undefined, qc_d = undefined, qc_p.clear();

        // Set to first page
        $("#quest-create-inputs").removeClass("quest-create-tostep" + quest_create_current_step);
        quest_create_current_step = 1;

        let si = $("#quest-create-progress");
        si.children(".quest-create-progress-dot").each(function(e) {
            console.log("eh?")
            $(this).removeClass("pd-on").addClass("pd-off");
        });
        $("#quest-create-progress *:first-child").removeClass("pd-off").addClass("pd-on");

        // Continue / Finish button
        $("#quest-create-finish").css("display", "none");
        $("#quest-create-next").css("display", "block");

        // Disable step button by default
        $(".step-confirm").addClass("disabled-grayscale");

        // Hide success screen
        $("#quest-create-success").css("display", "none");
    });

    /***************************************************************************** */
    /* New-quest-create events                                                               */
    /***************************************************************************** */

    // Advance in create new
    let quest_create_step_clk = 0;
    $(".step-confirm").on("click", function() {
        // Prevent fast clicking causing skips
        let click_time = new Date().getTime();
        if (click_time - quest_create_step_clk < 500) {
            console.log("time=" + (click_time - quest_create_step_clk))
            return;
        } else if ($(this).hasClass("disabled-grayscale")) {
            console.log("Fill u fuck");
            return;
        }
        quest_create_step_clk = click_time;

        // Swipe to new input fields
        let target = $("#quest-create-inputs");
        if (quest_create_current_step < 6 && !target.is(":animated")) {
            target.removeClass("quest-create-tostep" + quest_create_current_step);
            target.addClass("quest-create-tostep" + (++quest_create_current_step));

            // Update step indicator
            let si = $("#quest-create-progress");
            si.children().eq(quest_create_current_step - 1).addClass("pd-on");
            si.children().eq(quest_create_current_step - 1).removeClass("pd-off");
            si.children().eq(quest_create_current_step - 2).addClass("pd-off");
            si.children().eq(quest_create_current_step - 2).removeClass("pd-on");
        } else {
            // Last step done, show success
            $("#quest-create-success").css("display", "block");
            return;
        }

        // Disable button after traveled to new step
        $(".step-confirm").addClass("disabled-grayscale");

        // Switch to finish icon when at last step
        if (quest_create_current_step == 6) {
            $("#quest-create-finish").css("display", "block");
            $("#quest-create-next").css("display", "none");
        }
    });

    // Select button in create new
    let qc_f, qc_d, qc_p = new Set();
    $(".quest-create-owbtn").on("click", function(e) {
        // Get index and group
        let trim = $(this).attr("id").replace(/quest-create-grid-item/, "");
        let index = trim[0];
        let group = trim[1];
        console.log(trim + group);

        if ($(this).hasClass("owbtn-deselect")) {
            switch (group) {
                case "f": // Step 2
                    $("#quest-create-part2 .quest-create-grid-wrapper .owbtn-select").each(function() {
                        console.log("reset 1");
                        $(this).addClass("owbtn-deselect").removeClass("owbtn-select");
                    });
                    qc_f = index;
                    break;
                case "p": // Step 3
                    qc_p.add(index);
                    break;
                case "d": // Step 6
                    $("#quest-create-part6 .quest-create-grid-wrapper .owbtn-select").each(function() {
                        $(this).addClass("owbtn-deselect").removeClass("owbtn-select");
                    });
                    qc_d = index;
                    break;
                default:
                    console.log("Nope, should not be here(group");
                    break;
            }
            // Apply select animation
            $(this).addClass("owbtn-select").removeClass("owbtn-deselect");

            // Enable step to next step
            $(".step-confirm").removeClass("disabled-grayscale");
        } else {
            switch (group) {
                case "f": // Step 2
                    qc_f = undefined;

                    // Disable step to next step
                    $(".step-confirm").addClass("disabled-grayscale");
                    break;
                case "p": // Step 3
                    qc_p.delete(index);
                    if (!qc_p.size) {
                        $(".step-confirm").addClass("disabled-grayscale");
                    }
                    break;
                case "d": // Step 6
                    qc_d = undefined;

                    // Disable step to next step
                    $(".step-confirm").addClass("disabled-grayscale");
                    break;
                default:
                    console.log("Nope, should not be here(group");
                    break;
            }
            // Apply deselect animation
            $(this).addClass("owbtn-deselect").removeClass("owbtn-select");

            // Disable step to next step
            $(".step-confirm").addClass("disabled-grayscale");
        }
        console.log(qc_f, qc_d, qc_p);
    });

    // Make sure info is filled in creating quest
    $("#quest-create-part1 > input[type=text], .quest-create-step textarea").on("input", function(e) {
        if (!$(this).val()) {
            $(".step-confirm").addClass("disabled-grayscale");
        } else {
            $(".step-confirm").removeClass("disabled-grayscale");
        }
    });

    // Jump back to quest main page after successfully create new quest
    $("#quest-create-success-confirm").on("click", function(e) {
        $("#nav-quest").trigger("click");
    });
});