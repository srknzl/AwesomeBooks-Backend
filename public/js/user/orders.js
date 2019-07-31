const items = document.querySelectorAll(".item__container");

items.forEach((element)=>{
  const productIdInput = element.querySelector("#productId");
  element.addEventListener("click",()=>{
    window.location = "/user/view-product/" + productIdInput.value;
  });
});
  
