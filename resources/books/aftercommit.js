//console.log('aftercommit:', this, previous, query)
minus(this.subjects, previous.subjects).forEach(function(n){
    dpd.genres.post({genre:n, isApproved:false, minAge:0});
});

minus(previous.subjects, this.subjects).forEach(function(o){
    dpd.genres.get({genre:o}, function(genres){
        dpd.genres.del(genres[0].id);
    })
});

function minus(a, b){
    if(!a) return [];
    else if(!b) return a;
    return a.filter(function(e){return b.indexOf(e) < 0;});
}