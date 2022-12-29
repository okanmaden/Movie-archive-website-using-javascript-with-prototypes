class Store{
    static addToStorage(movies){
        localStorage.setItem("movies", JSON.stringify(movies));
    }
    static GetMovies(){
        return JSON.parse(localStorage.getItem("movies"));
    }
}
