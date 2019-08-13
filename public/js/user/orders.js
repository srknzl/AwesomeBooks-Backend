const items = document.querySelectorAll(".product_img");

items.forEach((element)=>{
  const productIdInput = element.querySelector("#productId");
  element.addEventListener("click",()=>{
    window.location = "/user/view-product/" + productIdInput.value;
  });
});
  
