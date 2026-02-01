console.log("Hello, world!");

let projectsList = [];
let filteredList = [];

async function getData() {
	const url = "http://localhost:5678/api/works";
	try {
		const response = await fetch(url);
		if (!response.ok) {
		    throw new Error(`Response status: ${response.status}`);
		}

		const result = await response.json();
        projectsList = result;
		filteredList = projectsList;
		console.log(result);
		displayGallery();
		displayCategories();
	} catch (error) {
		console.error(error.message);
	}
}

function displayGallery() {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    // for (const project of projectsList) {

    // }

    filteredList.forEach((project) => {
        		// <figure>
				// 	<img src="assets/images/abajour-tahina.png" alt="Abajour Tahina">
				// 	<figcaption>Abajour Tahina</figcaption>
				// </figure>
		const figure = document.createElement("figure");
		const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
		
		img.src = project.imageUrl;
		figcaption.innerText = project.title;
		figure.appendChild(img);
		figure.appendChild(figcaption);
        gallery.appendChild(figure);
    })
}

function displayCategories() {
    const categories = [...new Set(projectsList.map(project => project.category.name))];
    const filters = document.querySelector(".filters");
    console.log(categories);

	const allButton = document.createElement("button");
	allButton.innerText = "All";
    filters.appendChild(allButton);

    categories.forEach((category) => {
        const button = document.createElement("button");
        button.innerText = category;
        filters.appendChild(button);
		allButton.addEventListener("click", () => {
			filteredList = projectsList;
			console.log(filteredList);
			displayGallery();
		})

		button.addEventListener("click", () => {
			console.log("BUTTON CLICK");
            filteredList = projectsList.filter((project) => project.category.name == category);
			console.log(filteredList)
			displayGallery();
        })
    })
}

function displayEditMode() {
	token = localStorage.getItem("token");
	if (token) {
		document.querySelector(".edit-bar").classList.remove("hidden");
		document.querySelector(".edit-button").classList.remove("hidden");

		// make the buttons display the modals
	}
}

getData()
displayEditMode();
// async function myFunc() {

// }

// Promise -> still executing
// -> rejected
// -> resolved