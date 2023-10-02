// References to UI elements
const breedSelector = document.getElementById('breedCheckboxes');
const imageGallery = document.getElementById('imageGallery');

// Get list of dog breeds from API
fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(data => {
        const breeds = data.message;

        // Populate div with breed checkboxes
        for (const breed in breeds) {
            if (breeds.hasOwnProperty(breed)) {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = 'breeds';
                checkbox.value = breed;

                const label = document.createElement('label');
                label.appendChild(checkbox);
                label.appendChild(document.createTextNode(breed));

                breedSelector.appendChild(label);
            }
        }
    })
    .catch(error => console.error('Issue fetching dog breeds: ', error));

// Get images
breedSelector.addEventListener('change', () => {
    // Clear current images
    imageGallery.innerHTML = '';

    // Get selected breed/breeds
    const selectedBreeds = Array.from(breedSelector.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);

    // Get images for each breed
    selectedBreeds.forEach(breed => {
        fetch(`https://dog.ceo/api/breed/${breed}/images/random/3`)
            .then(response => response.json())
            .then(data => {
                const images = data.message;

                // Display images in gallery
                images.forEach(imageUrl => {
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    img.alt = breed;
                    imageGallery.appendChild(img);
                });
            })
            .catch(error => console.error('Issue fetching dog images: ', error));
    });
});