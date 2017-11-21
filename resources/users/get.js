
if(!internal && (!me || (!me.isAdmin && me.id !== this.id)) && !query.checkAvailability && !query.checkIsLastAdmin) console.log('gak lolos');
cancelIf(!internal && (!me || (!me.isAdmin && me.id !== this.id)) && !query.checkAvailability && !query.checkIsLastAdmin, "Access get Unauthorized", 401);

if(query &&(query.checkAvailability || query.checkIsLastAdmin)) this.id = null;
