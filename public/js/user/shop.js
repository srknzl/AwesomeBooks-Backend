const cardElements = document.querySelectorAll(".card");
cardElements.forEach((element)=>{
  const productIdInput = element.querySelector("#productId");
  element.addEventListener("click",()=>{
    window.location = "/user/view-product/"+ productIdInput.value;
  });
});
  
