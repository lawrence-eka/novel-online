if(ctx.method=='GET') {
    if(query.search && query.search.sort){
        query.$sort = query.search.sort;
    }
    query.$sort = query.$sort || {};
    query.$sort.titleSortBy = 1;
    
    if(query.manage=='all' && me.isAdmin) {
        /* do nothing. all books will be supplied */
    } 
    else if(query.manage == 'editable'){
        query.uploaderId = me.id;
        query.isEditable = true;
    }
    else if(query.manage){
        query.uploaderId = me.id;
    }
    else { //filtered search
        if(query.search){
            if(query.search.contains){
                query.$or = [
                    {title:{$regex:query.search.contains, $options:'i'}}, 
                    {description:{$regex:query.search.contains, $options:'i'}}, 
                    {creator:{$regex:query.search.contains, $options:'i'}},
                    {subjects:{$regex:query.search.contains, $options:'i'}},
                ];
            }
            if(query.search.genres) {
                query.subjects = {$in:query.search.genres.split(',')};
            }
        }
        query.isPublished = true;
        //query.isEditable = false;
        dpd.genres.get({minAge:{$gt:(new Date()).getFullYear() - me.birthYear}, isApproved:true, $fields:{genre:1}}, function(gs){
            var nin = {$nin:gs.map(function(g){return g.genre})};
            if(!query.subjects) {
                query.subjects = nin;
            }
            else {
                nin = [{subjects:query.subjects}, {subjects:nin}];
                delete query.subjects;
                query.$and = nin;
            }
        });
    }
}