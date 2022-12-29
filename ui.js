class UI{
    static RenderUI(movie){
        list.innerHTML = "";
        nameinput.value = "";
        directorinput.value = "";
        yearinput.value = "";
        posterinput.value = "";
        const movies = movie;
        movies.forEach(function(movie){
            list.innerHTML += `<div class="col-12 col-lg-4">
            <div class="card d-flex border border-5 border-secondary card bg-dark mb-3" id="movie_${movie.id}">
              <img src="${movie.poster}" class="card-img-top img-fluid postersize" alt="...">
              <div class="card-body">
                <table class="table">
                  <tbody class="text-white">
                    <tr>
                      <th scope="row">Film İsmi</th>
                      <td>${movie.name}</td>
                    </tr>
                    <tr>
                      <th scope="row">Yönetmeni</th>
                      <td>${movie.director}</td>
                    </tr>
                    <tr>
                      <th scope="row">Vizyon Tarihi</th>
                      <td>${movie.year}</td>
                    </tr>
                      <button data-id = "${movie.id}" id = "deletepart" class = "bi bi-trash3-fill btn btn-secondary text-white border-0 rounded w-25 py-2"></button>
                    </tr>
                    <tr>
                      <button data-id = "${movie.id}" id = "editpart" class = "bi bi-pencil-square btn btn-secondary text-white border-0 rounded mx-1 w-25 py-2"></button>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>`
        });
    }
    static ShowAlert(alert_type,alert_message){
        const flexdiv = document.createElement("div");
        flexdiv.className = "d-flex justify-content-center";
        const alertItem = document.createElement("div");
        alertItem.className = `mt-2 text-center text-dark w-25 alert alert-${alert_type}`;
        alertItem.textContent = alert_message;
        flexdiv.appendChild(alertItem);
        firstpart.appendChild(flexdiv);
        setTimeout(function(){
            alertItem.remove();
        }, 1500);
    }
}