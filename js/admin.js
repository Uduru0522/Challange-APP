$(document).ready(function() {
    $('#ajax-form button[class="open"]').click((event) => {
        event.preventDefault()
        $.post('./usermission', (data) => {
            var temp = "<table><tr><th>Mission ID</th><th>Content</th><th>State</th></tr>"
            for (var i = 0; i < data.length; i++) {
                temp += `<tr><td>${data[i].qid}</td><td>${data[i].content}</td><td>${data[i].state}</td></tr>`
            }
            temp += "</table>"
            $('#ajax-output').html(`<br><font size="4"><b>${temp}</b></font>`)
        })
    })

    $('#ajax-form button[class="close"]').click((event) => {
        event.preventDefault()
        $('#ajax-output').html('')
    })

    $('#check-form button[class="submit"]').click((event) => {
        event.preventDefault()
        $.post('./updatemission', {
            qid: $('#check-form input[name="qid"]').val(),
            state: $('#check-form input[name="state"]').val(),
        }, (data) => {
            $('#ajax-output2').html(`<font size="4"><b>${data}</b></font>`)
        })
    })

    $('#logout').click((event) => {
        event.preventDefault()
        $.post('./logout', (data) => {
            if (data == 'jump')
                window.location.href = '../html/login.html';
        });
    })
});