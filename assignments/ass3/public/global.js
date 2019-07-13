let userCount = 1;
function count(){
  const htmlElement = document.getElementById("counter");
  htmlElement.innerHTML = (Number(htmlElement.innerHTML) + 1).toString();
}
function addUser(){
  const unorderedListElement = document.getElementById("list");
  const liElement = document.createElement("li");
  liElement.innerHTML = "User " + userCount.toString();
  unorderedListElement.appendChild(liElement);
  userCount = userCount + 1;
} 