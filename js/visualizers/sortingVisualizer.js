console.log("Sorting Visualizer is connected! ");

const arrayContainer = document.getElementById("array-container");

const array =[50,100,150,80,120];

function renderArray(values)
{
    arrayContainer.innerHTML = "";
    values.forEach(function(value){

    const bar = document.createElement("div");

    bar.style.height =  value + "px";
    bar.style.width = "30px";
    bar.style.backgroundColor = "#38bdf8";

    arrayContainer.appendChild(bar);
    })
}
renderArray(array);
renderArray([80,130,60]);
