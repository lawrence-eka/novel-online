if(this.isEditable && this.isPublished) {
    var epubCreator = require('../codes/epubCreator.js')
    dpd.chapters.get({bookId: this.id, $sort:{seqNo:1}}, function(chapters){
        epubCreator.create(this, chapters);
    })
}