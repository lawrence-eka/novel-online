this.lastUpdatedDate = (new Date()).getTime();
this.content = replaceAll(this.content, '<br>', '<br/>');
dpd.chapters.get({bookId:this.bookId, seqNo:{$eq:this.seqNo}, id: {$ne: this.id}, $fields:{seqNo:1}, $sort: {lastUpdatedDate:1}}, function(cs){
    var newSeqNo = this.seqNo + 1;
    if(cs) {
        cs.forEach(function(c){
            dpd.chapters.put(c.id, {seqNo:newSeqNo});
            newSeqNo++;
        })
    }
});

function replaceAll(t, o, n) {return t.split(o).join(n);}