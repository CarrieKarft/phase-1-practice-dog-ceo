console.log('%c HI', 'color: firebrick')
// loads DOM before running JS
window.addEventListener('DOMContentLoaded', () => {
    // fetches img data from url and sends data to "creatingImgElements" function
    fetchinTheImages()
    fetchinTheDogBreeds()

    function fetchinTheImages() {
        fetch("https://dog.ceo/api/breeds/image/random/4")
        .then(res => res.json())
        .then(images => {
            creatingImgElements(images)
        })
    }
    // parses throug the returned data object grabbing message key, then parses through array of image urls the are the value of the message key, and assigns each one to an img element, and appends that element to the div container in the HTML
    function creatingImgElements(images) {
        const imgs = images.message
        imgs.map((element) => {
            const img = document.createElement('img');
            img.setAttribute('src', element);
            const divForImg = document.getElementById("dog-image-container");
            divForImg.appendChild(img);
        })
    }

    function fetchinTheDogBreeds() {
        fetch('https://dog.ceo/api/breeds/list/all')
        .then(res => res.json())
        .then(breedNames => {
            iteratingThroughBreedNames(breedNames)
        })
    }

    function iteratingThroughBreedNames(breedNames) {
        for (const property in breedNames.message) {
                creatingLiElements(property)
            }
    }

    function creatingLiElements(property){
        const breedNameArray = property.split('')
        const firstLetterOfBreedName = breedNameArray[0]
        pickingWhichLetter(firstLetterOfBreedName)
        const li = document.createElement('li');
        const propertyArray = property.split('')
        const className = propertyArray[0]
        li.setAttribute('class', `${className}`)
        li.innerHTML = `${property}`;
        const ul = document.getElementById("dog-breeds");
        ul.appendChild(li);
        li.style.cursor = 'pointer'
        li.addEventListener("click",turningNamesPink)
    }
    
    
    function turningNamesPink(event) {
        event.target.style.color = 'pink';
    }
    

    function pickingWhichLetter(firstLetterOfBreedName) {
        const dropDown = document.querySelector("#breed-dropdown")
        document.addEventListener("change", e => {
            const output = dropDown.value
            let breedToDelete = document.querySelectorAll(`.${firstLetterOfBreedName}`);
            for (let element of breedToDelete){
                if (output === firstLetterOfBreedName) {
                    element.style.display = '';
                } else {
                    element.style.display = "none";
                }
            }
        })
    }
})
