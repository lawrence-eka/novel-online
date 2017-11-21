if(!internal && query.includeNames) {
    dpd.users.get(this.personId, function(user){
        this.firstName = user.firstName;
        this.lastName = user.lastName;
    })
}