this.lastUpdatedDate = (new Date()).getTime();
dpd.chapters.get({bookId:this.bookId, seqNo:{$eq:this.seqNo}, id: {$ne: this.id}, $fields:{seqNo:1}, $sort: {lastUpdatedDate:1}}, function(cs){
    var newSeqNo = this.seqNo + 1;
    if(cs) {
        cs.forEach(function(c){
            dpd.chapters.put(c.id, {seqNo:newSeqNo});
            newSeqNo++;
        })
    }
});
