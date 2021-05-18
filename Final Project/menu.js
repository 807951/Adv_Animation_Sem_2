function createMenu () {
document.getElementById("cnv1").style.marginTop = "0px";

this.topPanel = document.createElement("div")
this.topPanel.style.width = "900px"
this.topPanel.style.height = "100px"
this.topPanel.style.background = "blue"
this.topPanel.style.marginLeft = "20px"
this.topPanel.style.border = "solid black 2px";

this.sidePanel = document.createElement("div")
this.sidePanel.style.width = "96px"
this.sidePanel.style.height = "600px"
this.sidePanel.style.background = "red"
this.sidePanel.style.position = "absolute"
this.sidePanel.style.marginLeft = "824px"
this.sidePanel.style.border = "solid black 2px";

for(var i=0;i<5;i++){
    var button = document.createElement("button");
    //button.innerHTML = "Button";
    button.className = "menuButton";
    button.id = "menuButton" + i;
    this.topPanel.append(button)
}

for(var i=0;i<5;i++){
    var button = document.createElement("button");
    //button.innerHTML = "sideButton";
    button.className = "sideButton";
    button.id = "sideButton" + i;
    this.sidePanel.append(button)
}

document.getElementById("game").prepend(this.sidePanel)
document.getElementById("game").prepend(this.topPanel)
console.log("menuCreated")
}
