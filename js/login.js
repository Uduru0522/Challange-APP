$(document).ready(function() {
    $('#login button[type="submit"]').click((event) => {
        event.preventDefault()
        $.post('./login', {
            account: $('#login input[name="username"]').val(),
            password: $('#login input[name="pwd"]').val()
        }, (data) => {
            if (data == 'jump')
                window.location.href = '../html/index.html';
            else {
                let warning = $("#signin-output");
                let warning_text = $("#signin-output span");
                warning_text.text(data);
                warning.removeClass("fade-in").addClass("fade-in");
            }
        })
    })

    $("#login button#sign-up").on("click", function(event) {
        event.preventDefault();
        let login_page = $("form#login");
        let signup_page = $("form#register");
        login_page.css("display", "none");
        signup_page.css("display", "flex");
    });

    $("#register #su-submit").on("click", function(event) {
        event.preventDefault();
        $.post("./register", {
            account: $("fieldset#su-username input").val(),
            password: $("fieldset#su-password input").val(),
            email: $("fieldset#su-email input").val(),
            lastname: $("fieldset#su-lastname input").val(),
            firstname: $("fieldset#su-firstname input").val()
        }, (data) => {
            console.log(data);
            let login_page = $("form#login");
            let signup_page = $("form#register");
            login_page.css("display", "flex");
            signup_page.css("display", "none");
        });
    });

    let reg_pwd_input = [$("#register #su-password input"), $("#register #su-password-confirm input")];
    reg_pwd_input.forEach(function(e) {
        e.on("input", function(event) {
            if (reg_pwd_input[0].val() == reg_pwd_input[1].val()) {
                console.log("same");
                reg_pwd_input[1].css("border", "none");
            } else {
                console.log("not same");
                reg_pwd_input[1].css("border", "red 5px solid");
            }
        });
    });
});