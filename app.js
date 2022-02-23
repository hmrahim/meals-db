const input = document.getElementById("search-input")
const btn = document.getElementById("submit-btn")
const row = document.getElementById("all-meals")


btn.addEventListener("click", (e) => {
    e.preventDefault()
    const inputValue = input.value;
    if (inputValue == "") {
        alert("This field cannot be empty")
    } else {
        const loadMeal = async () => {
            const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`
            const res = await fetch(url)
            const data = await res.json()
            displayData(data.meals)
           

        }
        loadMeal()
    }

})


const displayData = data => {
    row.innerHTML = ""
    for (data of data) {
        const collam = document.createElement("div")
        collam.classList.add("col-lg-4")
        collam.classList.add("col-md-4")
        collam.classList.add("col-sm-6")
        collam.classList.add("col-10")
        collam.classList.add("mx-auto")
        
        collam.innerHTML = ` 
                <div class="card">
                <img width="200px" height="300px" src="${data.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${data.strMeal}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
            `

        row.appendChild(collam)

    }

}