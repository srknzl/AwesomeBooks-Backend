const cardImageElements = document.querySelectorAll(".card__image");
cardImageElements.forEach((element)=>{
  const productIdInput = element.closest('article').querySelector("#productId");
  element.addEventListener("click",()=>{
    window.location = "/user/view-product/"+ productIdInput.value;
  });
});
  
