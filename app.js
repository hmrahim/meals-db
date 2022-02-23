const input = document.getElementById("search-input")
const btn = document.getElementById("submit-btn")
const row = document.getElementById("all-meals")


// inital category 

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
// meals find by category wais 

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
                    <a onclick="details('${food.idMeal}')" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
                `

            row.appendChild(collam)
        }

    } else {
        row.innerHTML = `<h1 class="text-center">data not avalable</h1>`

    }




}



// click event 
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
            input.value = ""


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
                <p class="card-text">${data.strInstructions.slice(0, 100)}</p>
                <a onclick="details('${data.idMeal}')" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
            `

        row.appendChild(collam)

    }

}



// see menu details


const details = async (id) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    const res = await fetch(url)
    const data = await res.json()
    showDetails(data.meals)


}


const showDetails = data => {
    const singleItem = document.getElementById("single-meal")
    const row = document.createElement("div")
    row.classList.add("row")

    singleItem.innerHTML = ""

    console.log(data[0].strMealThumb);
    for (const meal of data) {
       // console.log(meal.strMealThumb);
        row.style.border= "1px solid black"
        row.style.borderRadius= "20px"
        row.style.padding= "5px"
        row.style.margn = "0"
        
        row.innerHTML = `
                <div class="col-lg-6 col-md-6 col-sm-10 col-10 mx-auto d-flex justify-content-center align-items-center">
                <img width="500px" height="400px" class="img-fluid rounded-3" src="${meal.strMealThumb}" alt="">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-10 col-10 mx-auto">
                    <div class="p-3 d-flex justify-content-center align-items-start flex-column ">
                        <h3><strong>Name: </strong> ${meal.strMeal}</h3>
                        <p><strong>Category:</strong> ${meal.strCategory}</p>
                        <p><strong>Area:</strong> ${meal.strArea}</p>
                        <p><strong>Tags:</strong> ${meal.strTags}</p>
                        <p><strong>Youtube:</strong> <a target="blank" href="${meal.strYoutube}">See video review</a> </p>
                        <p><strong>Ingredients:</strong> ${meal.strIngredient1}, ${meal.strIngredient2}, ${meal.strIngredient3}, ${meal.strIngredient4}, ${meal.strIngredient5}, ${meal.strIngredient6}, ${meal.strIngredient7}, ${meal.strIngredient8}, </p>
                        <p><strong>Description: </strong> ${meal.strInstructions.slice(0,500)}</p>
                       
                    </div>
                
                </div>
        
        `
        singleItem.style.display = "block"
        singleItem.appendChild(row)
    }
}
