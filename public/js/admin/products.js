const cardImageElements = document.querySelectorAll(".card__image");
cardImageElements.forEach(element => {
  const productIdInput = element.parentElement.querySelector("#productId");
  element.addEventListener("click", () => {
    window.location = "/admin/view-product/" + productIdInput.value;
  });
});
const deleteProduct = btn => {
  const csrf = btn.parentElement.querySelector("input[name='_csrf']").value;
  const id = btn.parentElement.querySelector("input[name='id']").value;
  
  fetch("product/delete/" + id, {
    method: "DELETE",
    headers: {
      "csrf-token": csrf
    }
  })
    .then(res => {
      console.log(res);
      if(res.status === 200){
        const article = btn.closest("article");
        article.parentElement.removeChild(article);
      }else{
        alert("Could not delete the product please try again!");
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
};
