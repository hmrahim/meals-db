const input = document.getElementById("search-input")
const btn = document.getElementById("submit-btn")
const row = document.getElementById("all-meals")




const initalData = async () => {

    const url = `https://www.themealdb.com/api/json/v1/1/categories.php`
    const res = await fetch(url)
    const data = await res.json()
    const categorys = data.categories
    row.innerHTML = `<h1 class="text-center">Category</h1>`
    for (const category of categorys) {

        const collam = document.createElement("div")
        collam.classList.add("col-lg-4")
        collam.classList.add("col-md-4")
        collam.classList.add("col-sm-6")
        collam.classList.add("col-10")


        collam.innerHTML = `
                <div onclick="mealsByCategory('${category.strCategory}')" style="cursor:pointer" class="card">
                <img width="200px" height="250px" src="${category.strCategoryThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title text-center">${category.strCategory}</h5>
                
                </div>
            </div>
            `

        row.appendChild(collam)



    }



}
initalData()


const mealsByCategory = async (category) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`
    const res = await fetch(url)
    const data = await res.json()
    row.innerHTML = ""
    row.innerHTML = `<h1 class="text-center">Menu Item</h1>`
    if (data) {
        for (const food of data.meals) {
            const collam = document.createElement("div")
            collam.classList.add("col-lg-4")
            collam.classList.add("col-md-4")
            collam.classList.add("col-sm-6")
            collam.classList.add("col-12")
    
    
            collam.innerHTML = `
                    <div class="card">
                    <img width="200px" height="250px" src="${food.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${food.strMeal}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
                `
    
            row.appendChild(collam)
    }
        
    } else {
        row.innerHTML = `<h1 class="text-center">data not avalable</h1>`
        
    }
    
    


}


















































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
    row.innerHTML = `<h1 class="text-center">Menu Item</h1>`
    for (data of data) {
        const collam = document.createElement("div")
        collam.classList.add("col-lg-4")
        collam.classList.add("col-md-4")
        collam.classList.add("col-sm-6")
        collam.classList.add("col-12")


        collam.innerHTML = `
                <div class="card">
                <img width="200px" height="250px" src="${data.strMealThumb}" class="card-img-top" alt="...">
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