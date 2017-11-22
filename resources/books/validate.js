this.titleSortBy = this.title.toLowerCase().split(' ').filter(function(w){return w && w != 'the'}).join(' ');
this.lastUpdatedDate = (new Date()).getTime();
this.uploaderId = this.uploaderId || me.id;
if(this.isEditable && this.isPublished && this.filename) {
    var epubCreator = require('../codes/epubCreator.js')
    dpd.chapters.get({bookId: this.id, $sort:{seqNo:1}}, function(chapters){
        epubCreator.create(this, chapters).then(function(result){
            console.log(this.filesize);
            this.filesize = result.size;
            console.log(this.filesize);
        });
    })
}