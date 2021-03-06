var DraggingElement = false;

function dragElement(elementId) {
    var elmnt = document.getElementById(elementId);
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "-header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "-header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        //$(document).on('mouseup', function () { closeDragElement() })
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;

        DraggingElement = true;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        var screenWidth = window.innerWidth;
        var screenHeight = window.innerHeight - 40;

        // set the element's new position:
        if (elmnt.offsetTop - pos2 < 0)
            elmnt.style.top = (0) + "px";
        else if ((elmnt.offsetTop - pos2) + elmnt.offsetHeight > screenHeight)
            elmnt.style.top = (screenHeight - elmnt.offsetHeight) + "px";
        else
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";

        if (elmnt.offsetLeft - pos1 < 0)
            elmnt.style.left = (0) + "px";
        else if ((elmnt.offsetLeft - pos1) + elmnt.offsetWidth > screenWidth)
            elmnt.style.left = (screenWidth - elmnt.offsetWidth) + "px";
        else
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;

        DraggingElement = false;
    }
}