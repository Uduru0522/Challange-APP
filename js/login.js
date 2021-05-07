$(document).ready(function() {
    $('#login button[type="submit"]').click((event) => {
        event.preventDefault()
        $.post('./login', {
            account: $('#login input[name="username"]').val(),
            password: $('#login input[name="pwd"]').val()
        }, (data) => {
            if(data == 'jump')
                window.location.href = '../html/index.html';
            else 
                $('#ajax-output').html(`<br><br><font size="6"><b>${data}</b></font>`); // 顯示錯誤訊息的地方，帳密不正確之類的
        })
    })
});