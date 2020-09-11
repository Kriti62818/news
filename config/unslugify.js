const unslugify=function(slug){
    var data=slug.replace('-',' ');
    return data;
}

module.exports=unslugify