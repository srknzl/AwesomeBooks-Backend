const orderElements = document.querySelectorAll(".order__container");

orderElements.forEach((element)=>{
  const productIdInput = element.querySelector("#productId");
  element.addEventListener("click",()=>{
    window.location = "/user/view-product/" + productIdInput.value;
  });
});
  
