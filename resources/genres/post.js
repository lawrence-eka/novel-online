console.log(this);

if(!me) cancel();
if(this.id) {
    dpd.genres.get(this.id, function(g){
        if(g && g.length) {
            dpd.genres.put(this.id, this, function(result, err){
                cancel(200, 200);
            });
        }
        else {
            dpd.genres.get({genre:this.genre}, function(genres){
                if(genres && genres.length){
                    dpd.genres.put(genres[0].id, this, function(result){
                        cancel(200, 200);
                    });
                }
                else {
                    this.isApproved=me.isAdmin;
                }
            });
        }
        
    })
}