$(document).ready(() => {
    // Accept in list
    $(document).on("click", ".qblock-state", function() {
        console.log($(this).children(":first").text());
        if ($(this).children(":first").text() == "挑戰") {
            const qid = $(this).siblings(".qblock-more").children(":first").attr("id").match(/\d+/g);
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
    });

    const myFile = document.querySelector('#quest-submit-img')

    myFile.addEventListener('change', function(e) {
        const file = e.target.files[0]
        const reader = new FileReader()
        const img = document.querySelector('#preview') // 需要開一個img的tag來存預覽的圖片，id="preview"
        reader.readAsDataURL(file)
        reader.onload = function() {
            img.src = reader.result;
            $("#preview").css({ "width": "30vw", "height": "30vw", "background-size": "cover" }) // 預覽圖片的css屬性
            console.log("loaded preview.");
        }
    })

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
});