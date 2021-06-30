function getInfo(uid, db) {
    return new Promise((resolve, reject) => {
        var data;
        db.get("SELECT name, title, id, intro, image, social, travel, food, activity, sport, self FROM users WHERE id = ?", [uid], function(err, row) {
            resolve(row);
        })
    })
}

function editInfo(uid, db, name, title, intro, image) {
    return new Promise((resolve, reject) => {
        db.run("UPDATE users SET name = ?, title = ?, intro = ?, image = ? WHERE id = ?", [name, title, intro, image, uid])
        resolve('Update successfully')
    })
}

module.exports = {
    getInfo,
    editInfo,
}