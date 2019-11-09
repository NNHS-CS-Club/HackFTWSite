function hover(element) {
    element.setAttribute('src', '../images/hftw-light.png');
}

function unhover(element) {
    element.setAttribute('src', '../images/hftw-dark.png');
}
  
unhover(document.getElementById("dark-logo"))