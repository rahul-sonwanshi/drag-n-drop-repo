
// Event Handling Functions

function handleDragStart(e) { // When starting to drag
    this.style.opacity = '0.4'; // give visual effect of dropping it!

    e.dataTransfer.setData("text", e.target.id);
}

function handleDragEnd(e) { // When Drag has been completed meaning it has been dropped
    this.style.opacity = '1';
}


function handleDragOver(e) { // drag over what area that is the rectangular area in this case
    if (e.preventDefault) {
        e.preventDefault();
    }

    return false;
}

function handleDrop(e) { // Actually Appending the div on drop!
    e.preventDefault(); // prevent default behaviour

    var data = e.dataTransfer.getData("text");
    let boxNo = data.replace(/^box-/, '');

    let dropBox = document.querySelector('.drop__boxes__container'); // dropping area
    
    //to prevent re-dropping of the same box on the same place
    if(document.getElementById(data).parentNode === dropBox)
        return;

    dropBox.appendChild(document.getElementById(data)); // appendding dropped item.
    var element = document.getElementById(data);
    // element.removeEventListener('dragstart', handleDragStart); // remove drag event listner so that it cannot be re-dropped on the same area
    // element.draggable = false; // to prevent re-dropping

    var emptyBox = document.querySelector("#empty-box-"+ boxNo); // replace the empty space with the same empty div with different opacity
    emptyBox.classList.add("empty__box");
    emptyBox.setAttribute("id","empty-box-"+boxNo);
    emptyBox.addEventListener('drop', handleEmptyDrop, false);
    emptyBox.addEventListener('dragover', handleDragOver, false);

    printLog(boxNo,1);
}

function handleEmptyDrop(e) {
    e.preventDefault(); // prevent default behaviour
    var data = e.dataTransfer.getData("text");
    let boxNo = data.replace(/^box-/, '');
    let emptyBox = document.querySelector('#empty-box-' + boxNo); // dropping area
    
    emptyBox.appendChild(document.getElementById(data)); // appendding dropped item.
    var element = document.getElementById(data);
    // element.removeEventListener('dragstart', handleDragStart); // remove drag event listner so that it cannot be re-dropped on the same area
    // element.draggable = false; // to prevent re-dropping

    emptyBox.classList.remove("empty__box");
    printLog(boxNo,2);
}

// function for printing logs
function printLog(boxNo, operationNo) {
    var logDiv = document.querySelector(".action__log"); // selecting action log to print what box was dropped!
    var pNode = document.createElement("h1");
    if(operationNo === 1) {
        var node = document.createTextNode("Box " + boxNo +" has been inserted");
    }
    else {
        var node = document.createTextNode("Box " + boxNo +" has been placed Back");
    }

    pNode.appendChild(node);
    logDiv.appendChild(pNode);
}

// Adding Event Listners to the Elements

let items = document.querySelectorAll('.square__box');

items.forEach(function(item) { // adding event listner to square boxes for dragging
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragend', handleDragEnd, false);
    
});

// adding event listner to dropping area for dropping
let dropBox = document.querySelector('.drop__boxes__container');

dropBox.addEventListener('drop', handleDrop, false);
dropBox.addEventListener('dragover', handleDragOver, false);