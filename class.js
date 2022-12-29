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

class MovieClass{
    constructor(){
        this.id = '';
        this.name ='';
        this.director = '';
        this.year = '';
        this.poster = '';
        this.movies = Store.GetMovies() ? Store.GetMovies(): [] ;
        UI.RenderUI(this.movies);
    }

    addMovie(){
        if(this.name === "" || this.director === "" || this.year === "" || this.poster === ""){
            UI.ShowAlert("dark","Lütfen Tüm Bilgileri Eksiksiz Doldurun");
        }else{
            this.movies.push( {
                "director": this.director,
                "name": this.name,
                "year": this.year,
                "poster": this.poster,
                "id" : Math.floor(Math.random() * 1000000),
              });
            Store.addToStorage(this.movies);
            UI.RenderUI(this.movies);
            UI.ShowAlert("dark","Ekleme İşlemi Başarıyla Gerçekleşti.");
        }
    }

    deleteAll(){
        list.innerHTML = "";
        this.movies = [];
        Store.addToStorage(this.movies);
        UI.ShowAlert("dark","Silme İşlemi Başarıyla Gerçekleşti.");
    }

    delete(){
        this.movies = this.movies.filter((movie) =>  {
            return movie.id != this.id;  
    
        });
        UI.RenderUI(this.movies);
        Store.addToStorage(this.movies);
        UI.ShowAlert("dark","Silme İşlemi Başarıyla Gerçekleşti.");
    }
    Edit(){
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
    EditandSave(){
        this.movies = this.movies.map((movie) => {
            if(movie.id === this.id){
                movie.name = nameinput.value;
                movie.director = directorinput.value;
                movie.year = yearinput.value;
                movie.poster = posterinput.value;
            }
        return movie;
        });
        UI.RenderUI(this.movies);
        Store.addToStorage(this.movies);
    }
}


const movie = new MovieClass();

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
        // window.scrollTo(750,750);
        const movieposition = document.getElementById(`movie_${movie.id}`);
        movieposition.scrollIntoView({behavior: "smooth"});
    }
})

