const nameinput = document.getElementById("moviename");
const directorinput = document.getElementById("moviedirector");
const yearinput = document.getElementById("movieyear");
const posterinput = document.getElementById("movieposter");
const list = document.querySelector(".rowsecond");
const general = document.querySelector(".container");
const button = document.getElementById("add");
const savebutton = document.getElementById("savebutton");
const alldeletebutton = document.getElementById("delete");
const partdeletebutton = document.getElementById("deletepart");
const firstpart = document.querySelector(".rowfirst");


function Movie(){
    this.id = '';
    this.name ='';
    this.director = '';
    this.year = '';
    this.poster = '';
    this.store = new Store();
    this.movies = this.store.GetMovies() ? this.store.GetMovies(): [] ;
    this.ui = new UI();
    this.ui.RenderUI(this.movies);
}


Movie.prototype.addMovie = function(){
    if(this.name === "" || this.director === "" || this.year === "" || this.poster === ""){
        this.ui.ShowAlert("dark","Lütfen Tüm Bilgileri Eksiksiz Doldurun");
    }else{
        this.movies.push( {
            "director": this.director,
            "name": this.name,
            "year": this.year,
            "poster": this.poster,
            "id" : Math.floor(Math.random() * 1000000),
          });
        this.store.addToStorage(this.movies);
        this.ui.RenderUI(this.movies);
        this.ui.ShowAlert("dark","Ekleme İşlemi Başarıyla Gerçekleşti.");
    }
}


Movie.prototype.deleteAll = function(){
    list.innerHTML = "";
    this.movies = [];
    this.store.addToStorage(this.movies);
    this.ui.ShowAlert("dark","Silme İşlemi Başarıyla Gerçekleşti.");
}

Movie.prototype.delete = function(){
    this.movies = this.movies.filter((movie) =>  {
        return movie.id != this.id;  

    });
    this.ui.RenderUI(this.movies);
    this.store.addToStorage(this.movies);
    this.ui.ShowAlert("dark","Silme İşlemi Başarıyla Gerçekleşti.");
}

Movie.prototype.Edit = function(){
    this.movies = this.movies.map((movie) => {
        if(movie.id === this.id){
            nameinput.value = movie.name;
            directorinput.value = movie.director;
            yearinput.value = movie.year;
            posterinput.value = movie.poster;
        }
    return movie;
    });
}

Movie.prototype.EditandSave = function(){
    this.movies = this.movies.map((movie) => {
        if(movie.id === this.id){
            movie.name = nameinput.value;
            movie.director = directorinput.value;
            movie.year = yearinput.value;
            movie.poster = posterinput.value;
        }
    return movie;
    });
    this.ui.RenderUI(this.movies);
    this.store.addToStorage(this.movies);
}

const movie = new Movie();

alldeletebutton.addEventListener("click", function(){
    movie.deleteAll();
});

button.addEventListener("click",function(){
    movie.name= nameinput.value.trim();
    movie.director = directorinput.value.trim();
    movie.year = yearinput.value.trim();
    movie.poster = posterinput.value.trim();
    movie.addMovie();

});

list.addEventListener("click", function(e){
    if(e.target.className === "bi bi-trash3-fill btn btn-secondary text-white border-0 rounded w-25 py-2"){
        const movieiddelete = Number(e.target.getAttribute("data-id"));
        movie.id = movieiddelete;
        movie.delete();
    }
});

general.addEventListener("click",function(e){
    if(e.target.className === "bi bi-pencil-square btn btn-secondary text-white border-0 rounded mx-1 w-25 py-2"){
        const movieidedit = Number(e.target.getAttribute("data-id"));
        movie.id = movieidedit;
        movie.Edit();
        savebutton.classList.remove("hide");
        button.classList.add("hide");
        const startposition = document.getElementById("startposition");
        startposition.scrollIntoView({behavior:"smooth"});
        console.log(movie.id);
    }
    if (e.target.className === "btn btn-danger mx-2"){
        movie.EditandSave();
        button.classList.remove("hide");
        savebutton.classList.add("hide");
        const movieposition = document.getElementById(`movie_${movie.id}`);
        console.log(movieposition);
        movieposition.scrollIntoView({behavior: "smooth"});
    }
})




