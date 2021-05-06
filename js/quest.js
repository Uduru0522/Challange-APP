$(document).ready(() => {
    // Accept in list
    $(document).on("click", ".qblock-state", function() {
        console.log($(this).children(":first").text());
        if ($(this).children(":first").text() == "挑戰") {
            const qid = $(this).siblings(".qblock-more").children(":first").attr("id").match(/\d/g);
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
        } else {
            console.log("Nope");
        }
    });

    // Submit quests
    $(document).on("click", "#quest-submit-button", function() {
        // Send post request to submit quest
        const form = new FormData();
        // TODO: Process image here to upload
        // Image Field: <input id="#quest-submit-text" type="file" name="image/*"><input>

        form.append("img", );
        form.append("text", $("#quest-submit-text").val());
        $.post(
            "./mission/report-single",
            form,
            function(data) {
                console.log("Update success");
            }
        );
    });
});