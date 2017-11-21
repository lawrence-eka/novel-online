dpd.reviews.get({bookId:this.bookId}, function(books){
    var totalStars = 0;
    books.forEach(function(book){
        totalStars += book.stars;
    });
    var stars = Math.round((totalStars / books.length)*10)/10;
    dpd.books.put({id:this.bookId, stars:stars});
})