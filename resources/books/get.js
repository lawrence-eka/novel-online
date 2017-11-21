dpd.bookshelf.get({bookId:this.id, userId:me.id}, function(s){
    if(s && s.length) this.progress = s[0].progress;
})
