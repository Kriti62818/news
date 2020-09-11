const slugify=function(data){
    var slug=data.replace(',','-').replace(/ /g,'-').toLowerCase();
    return slug;
}

module.exports=slugify