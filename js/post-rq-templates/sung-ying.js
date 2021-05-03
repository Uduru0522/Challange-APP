// 要求 大家喜歡(popular) / 你可能喜歡(maylike) / 進行中(doing) / 已完成(done) 的任務簡單資料
$.post(
    "./mission/popular" || "./mission/maylike" || "./mission/done" || "./mission/doing",
    (data) => {
        /* Return data structire here */
        data[0].name, data[0].category,... // 0可以換成其他數字,有哪些屬性可以去看mission.db的column name
    }
)

// 透過任務 ID 取得任務的詳細資料
$.post(
    "./mission/detail", {
        qid: id
    },
    (data) => {
        /* Return data structire here */
    }
)

// 取得從 [A, B] 的得分範圍間的任務簡單資料
$.post(
    "./mission/point_range", {
        low_point_bound: A,
        high_point_bound: B
    },
    (data) => {
        /* Return data structure here */
    }
)

// 承接/放棄 任務
$.post(
    "./mission/accept" || "./mission/giveup", {
        qid: id
    },
    (data) => {
        /* Let me know if it succeed */
        data == "Success" // 代表成功，基本上我也只會回傳成功
    }
)

// 根據任務 ID 取得詳細資料, 包含已完成的進度的照片
$.post(
    "./mission/detail", {
        qid: id
    },
    (data) => {
        /* Return data structure here */
    }
)

// 取得有接任務編號 qid 的 K 個他人的頭像/暱稱
$.post(
    "./mission/samequest", {
        qid: id,
        ppl_count: K
    },
    (data) => {
        /* Return data structure here */
        identity = /*任何辨別用的資料（ID, hash, 編號, 帳號等等）*/
    }
)

// 跟上一個 function 配合，用於拿非用戶本人的資料
// 透過上一個 function 回傳的任何辨別用的資料（ID, hash, 編號, 帳號等等）取得他的個人詳細資料
$.post(
    "./mission/get_user_information", {
        identity: identity
    },
    (data) => {
        /* Return data structure here */
    }
)

// 跟上上個 function 配合，透過該 identity 傳送好友邀請
$.post(
    "./mission/send_friend_request", {
        identity: identity
    },
    (data) => {
        /* Let me know if it succeed */
    }
)

// 回報任務 （包含上傳），非連續任務
$.post(
    "./mission/report_single", {
        qid: number,
        imagedata: imagedata
    },
    (data) => {
        /* Let me know if it succeed */
    }
)


//回報任務 （包含上傳），連續任務 
$.post(
    "./mission/report_continous", {
        qid: number,
        imagedata: imagedata,
        step: number
    },
    (data) => {
        /* Let me know if it succeed */
    }
)