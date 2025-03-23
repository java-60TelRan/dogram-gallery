const detailedImage = document.querySelector(".detailedContainer--image");
const detailedTitle = document.querySelector(".detailedContainer--title");
let galleryImages;
const galleryElem = document.getElementById("cats_gallery");
async function drawGalleryItems() {
  const response = await fetch("https://api.thecatapi.com/v1/breeds");
  const data = await response.json();
  const itemsData = getItemsData(data); //input data from API, output - array of objects
  //  {itemImage, detailedImage, title, detailedTitle}
  const items = getItems(itemsData);
  galleryElem.innerHTML = items;
  galleryImages = document.querySelectorAll(".gallery--item_image");
  addLIsteners();

}
drawGalleryItems();
function getItemsData(data) {
   const itemsData = data.map(record =>
     ({itemImage: getImage(record.reference_image_id),
       detailedImage: getImage(record.reference_image_id),
      title:record.name,
      detailedTitle: record.description}));
      return itemsData
}
function getItems(itemsData) {
  const items = itemsData.map(getItem);
  return items.join();
}
function getItem({itemImage, detailedImage, title, detailedTitle}) {
  return `<li class="gallery--item">
          <img
            src="${itemImage}"
            alt="${title + ' image'}"
            class="gallery--item_image"
            data-detailed-image="${detailedImage}"
            data-detailed-title="${detailedTitle}"
          />
          <span class="gallery--item_title">${title} </span>
        </li>`
}
function getImage(image_id) {
  return `https://cdn2.thecatapi.com/images/${image_id}.jpg`
}
function addLIsteners() {
  for (let i = 0; i < galleryImages.length; i++) {
    galleryImages[i].addEventListener("click", function () {
      setDetails(galleryImages[i]);
    });
  }
}

function setDetails(galleryImage) {
  let image = galleryImage.getAttribute("data-detailed-image");
  detailedImage.src = "";
  detailedImage.src = image;
  detailedTitle.innerHTML =
    galleryImage.getAttribute("data-detailed-title") +
    '<span class="for_ellipsis">...</span>';
  animate();
}
function animate() {
  detailedImage.classList.remove("animation-up");
  detailedTitle.classList.remove("animation-down");
  setTimeout(function () {
    detailedImage.classList.add("animation-up");
    detailedTitle.classList.add("animation-down");
  }, 0);
}
