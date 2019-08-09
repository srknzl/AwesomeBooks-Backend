function showImage() {
  var imageSelector = document.getElementById("image");
  var image = document.getElementById("image").files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var newImage = document.createElement("img");
    var imageLabel = document.createElement("p");
    imageLabel.innerHTML = "Preview image:";
    imageLabel.id = "previewImageLabel";
    newImage.id = "previewImage";
    newImage.src = e.target.result;
    const prevImage = document.querySelector("#previewImage");
    if (prevImage) prevImage.parentNode.removeChild(prevImage);
    const prevImageLabel = document.querySelector("#previewImageLabel");
    if (prevImage) prevImageLabel.parentNode.removeChild(prevImageLabel);
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
