const selectDomain = function(development){
    if(development)return "http://localhost:3000/";
    else return "https://www.awesomebook.store/";
}

export default selectDomain; 