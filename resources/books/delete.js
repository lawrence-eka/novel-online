var fs = require('fs-extra');
var f = 'public/thumbs/' + this.thumb;

if(this.fileId) {
    dpd.bookfiles.del(this.fileId, function(result, err){
        if(err) console.log(err);
    });
}
if(this.thumbFileId) {
    dpd.thumbfiles.del(this.thumbFileId, function(result){
        deleteFolder(f);
    });
}
else deleteFolder(f);

dpd.chapters.get({bookId:this.id}, function(chapters){
    chapters.forEach(function(c){
        dpd.chapters.del(c.id);
    })
})

function deleteFolder(f){
    fs.remove(f, function(err){
        if(err) {
            console.log('Delete Book:', err);
        }
        else {
            console.log('Delete Book: success.');
        }
    })
}
