const development = true;
let domain = "";
if(development){
    domain = "http://localhost:3000/";
} 
else{
    domain = "https://www.awesomebook.store/";
}

export default domain; 