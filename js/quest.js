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
    // Accept in list
    $(document).on("click", ".qblock-state", function() {
        console.log($(this).children(":first").text());
        if ($(this).children(":first").text() == "挑戰") {
            const qid = $(this).siblings(".qblock-qid").attr("id").match(/\d+/g);
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
        } else {
            console.log("Nope");
        }
    });

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
        const img64 = compress(document.getElementById('preview'), 500, 500, 0.85);
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

    const myFile = document.querySelector('#quest-submit-img')
    myFile.addEventListener('change', function(e) {
        const file = e.target.files[0]
        const reader = new FileReader()
        const img = document.querySelector('#preview') // 需要開一個img的tag來存預覽的圖片，id="preview"
        reader.readAsDataURL(file)
        reader.onload = function() {
            img.src = reader.result;
            // $("#preview").css({ "width": "30vw", "height": "30vw", "background-size": "cover" }) // 預覽圖片的css屬性
            console.log("loaded preview.");
        }
    })

    // Redirect click event on uploading image
    $(document).on("click", "#preview", function() {
        $("#quest-submit-img").trigger("click");
    });

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

    // Question option menu
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
});