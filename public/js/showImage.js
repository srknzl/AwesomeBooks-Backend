function showImage() {
  var imageSelector = document.getElementById("image");
  var image = document.getElementById("image").files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    const prevImage = document.querySelector("#previewImage");
    if (prevImage) prevImage.parentNode.removeChild(prevImage);

    const prevImageLabel = document.querySelector("#previewImageLabel");
    if (prevImage) prevImageLabel.parentNode.removeChild(prevImageLabel);

    var newImage = document.createElement("img");
    newImage.style.maxHeight = "300px";
    newImage.style.maxWidth = "300px";
    newImage.id = "previewImage";
    newImage.src = e.target.result;
    
    var imageLabel = document.createElement("p");
    imageLabel.innerHTML = "Preview image:";
    imageLabel.id = "previewImageLabel";

    imageSelector.parentNode.insertBefore(
      imageLabel,
      imageSelector.nextSibling
    );
    imageSelector.parentNode.insertBefore(
      newImage,
      imageSelector.nextSibling.nextSibling
    );
  };
  if (image) reader.readAsDataURL(image);
  else {
    const prevImage = document.querySelector("#previewImage");
    if (prevImage) prevImage.parentNode.removeChild(prevImage);
    const prevImageLabel = document.querySelector("#previewImageLabel");
    if (prevImage) prevImageLabel.parentNode.removeChild(prevImageLabel);
  }
}
