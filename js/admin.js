$(document).ready(function() {
    $('#ajax-form button[class="open"]').click((event) => {
        event.preventDefault()
        $.post('./waiting', (data) => {
            var temp = "<table><tr><th>Name</th><th>Multiple</th><th>Category</th><th>Description</th><th>Guide</th><th>Difficulty</th></tr>"
            for (var i = 0; i < data.length; i++) {
                temp += `<tr><td>${data[i].name}</td><td>${data[i].multiple}</td><td>${data[i].category}</td><td>${data[i].description}</td><td>${data[i].guide}</td><td>${data[i].difficulty}</td></tr>`
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
        $.post('./update', {
            name: $('#check-form input[name="name"]').val(),
            status: $('#check-form input[name="status"]').val(),
            qid: $('#check-form input[name="qid"]').val(),
            point: $('#check-form input[name="point"]').val()
        }, (data) => {
            $('#ajax-output2').html(`<font size="4"><b>${data}</b></font>`)
            $('#ajax-form button[class="open"]').click()
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