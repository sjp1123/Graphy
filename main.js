const form = document.getElementById("coor_form");
const addButton = document.getElementById("addxy");
const ol = form.querySelector("ol");
const xbtns = document.getElementsByClassName("x_btn");
const ret = document.getElementById("ret");

let coors = [];

for (var i = 0; i < xbtns.length; i++) {
    xbtns[i].addEventListener("click", del);
}

addButton.addEventListener("click", make);
form.addEventListener("submit", makeGraph);

function make(e) {
    const li = document.createElement("li");
    const lbl = document.createElement("label");
    const inpx = document.createElement("input");
    const inpy = document.createElement("input");
    const xbtn = document.createElement("button");
    lbl.innerText = "좌표";
    inpx.id = "inpx";
    inpx.placeholder = "x";
    inpy.id = "inpy";
    inpy.placeholder = "y";
    xbtn.type = "button";
    xbtn.innerText = "❌";
    xbtn.addEventListener("click", del);
    li.appendChild(lbl);
    li.appendChild(inpx);
    li.appendChild(inpy);
    li.appendChild(xbtn);
    ol.appendChild(li);
    li.id = Date.now();
    coors.push(li);
}

function del(e) {
    const li = e.target.parentElement;
    coors = coors.filter((coor) => coor.id != parseInt(li.id));
    li.remove();
}

function makeGraph(e) {
    e.preventDefault();
    let arr = [];
    for (var i = 0; i < coors.length; i++) {
        li = coors[i];
        x = li.querySelector("#inpx").value;
        y = li.querySelector("#inpy").value;
        arr.push([x, y]);
    }
    const coeffs = calc(arr);
    var text = "";
    for (var i = 0; i < coeffs.length; i++) {
        var coeff = coeffs[i];
        if (coeff[0] == 0) continue;
        if (text != "" && coeff[0] > 0) text += " +";
        if (coeff[1] == 1) {
            if (coeff[0] != 1) text += coeff[0];
        } else {
            text += coeff[0] + "/" + coeff[1];
        }
        if (i < coeffs.length-2) {
            text += "x^" + (coeffs.length-i-1);
        } else if (i == coeffs.length-2) {
            text += "x"
        }
    }
    ret.innerText = text;
}
