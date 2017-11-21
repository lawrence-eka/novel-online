this.titleSortBy = this.title.toLowerCase().split(' ').filter(function(w){return w && w != 'the'}).join(' ');
this.lastUpdatedDate = (new Date()).getTime();
this.uploaderId = this.uploaderId || me.id;