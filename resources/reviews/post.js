if(!internal){
    dpd.reviews.get({bookId:this.bookId, personId:this.personId}, function(reviews){
        if(reviews && reviews.length){
            dpd.reviews.put(reviews[0].id, this, function(result){
                cancel(200, 200)
            });
        }
        else this.date = (new Date()).getTime();
    });
}
else this.date = (new Date()).getTime();