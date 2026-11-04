console.log("Algorithm Analyser is running!");
const backToTop = document.getElementById("backToTop");

backToTop.addEventListener("click", function(){
    window.scrollTo({
        top: 0,
        behaviour: "smooth"
    });
});
window.addEventListener("scroll", function(){
    if(window.scrollY > 300){
        backToTop.style.display = "block";
    }else{
        backToTop.style.display = "none";
    }
});