
function handleDragStart(e) {
    this.style.opacity = '0.4';

    e.dataTransfer.setData("text", e.target.id);
}

function handleDragEnd(e) {
    this.style.opacity = '1';
}


function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    return false;
}

function handleDrop(e) {
    // e.stopPropagation(); // stops the browser from redirecting.
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    let dropBox = document.querySelector('.drop__boxes__container');
    // e.target.appendChild(document.getElementById(data));
    dropBox.appendChild(document.getElementById(data));
    var element = document.getElementById(data);
    element.removeEventListener('dragstart', handleDragStart);
    element.draggable = false;

    var logDiv = document.querySelector(".action__log");
    var pNode = document.createElement("h1");
    var node = document.createTextNode("Box " + data.replace(/^box-/, '') +" has been inserted");
    
    pNode.appendChild(node);
    logDiv.appendChild(pNode);
    console.log(data);

    var emptyBox = document.querySelector("#empty-box-"+ data.replace(/^box-/, ''));
    emptyBox.classList.add("empty__box");
}

let items = document.querySelectorAll('.square__box');

items.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragend', handleDragEnd, false);
    
});

let dropBox = document.querySelector('.drop__boxes__container');

dropBox.addEventListener('drop', handleDrop, false);
dropBox.addEventListener('dragover', handleDragOver, false);