dpd.books.get({subjects:this.genre}, function(result){
    //console.log(result);
    if(result.length) cancel("'" + this.genre + "' is still used in one or more books. Please merge it to other genre before delete it.", 200);
})