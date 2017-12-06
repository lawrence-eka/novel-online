var fs = require('fs-extra');
//var f = 'public/thumbs/' + this.thumb;

if(this.fileId) {
    dpd.bookfiles.del(this.fileId, function(result, err){
        if(err) console.log('bookfiles.del.fileid', err);
    });
}
if(this.thumbFileId) {
    dpd.thumbfiles.del(this.thumbFileId, function(result, err){
        if(err) console.log('bookfiles.del.thumbfileid', err);
    });
}

if(this.filename) fs.remove('public/upload/bookfiles/' + this.filename);
if(this.thumb) fs.remove('public/upload/thumbs/' + this.thumb);

dpd.chapters.get({bookId:this.id}, function(chapters){
    chapters.forEach(function(c){
        dpd.chapters.del(c.id);
    })
})
