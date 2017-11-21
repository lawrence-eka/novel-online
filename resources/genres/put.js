var old = ctx.body.oldGenre;
var rep = ctx.body.mergeWith? ctx.body.mergeWith:ctx.body.genre;
if(old != rep) {
    dpd.books.get({subjects:old}, function(result){
        if(result && result.length) {
            result.forEach(function(r){
                r.subjects = r.subjects.map(function(s){return (s==old?rep:s);});
                dpd.books.put(r.id, {subjects:r.subjects});
            })
        }
    }) 
} 

dpd.genres.get({genre:rep, isApproved:true, id: {$ne:this.id}}, function(genres){
    if(genres && genres.length){
        dpd.genres.del(this.id, function(result){
            cancel(200,200);
        })
    }
})
