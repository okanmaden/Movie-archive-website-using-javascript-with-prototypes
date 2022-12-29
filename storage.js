function Store(){

}


Store.prototype.addToStorage = function(movies){
    localStorage.setItem("movies", JSON.stringify(movies));
}

Store.prototype.GetMovies = function(){
    return JSON.parse(localStorage.getItem("movies"));
}
