function canUseWebP() {
  var elem = document.createElement('canvas');

  if (!!(elem.getContext && elem.getContext('2d'))) {
      // was able or not to get WebP representation
      return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
  }

  // very old browser like IE 8, canvas not supported
  return false;
}
 
var webp = "png";

window.onload = () => {
  if (canUseWebP()) {
    webp = "webp";
  }
  console.log(webp)
  document.getElementById("logo-parent").style.backgroundImage = "url('images/" + webp + "/space-background." + webp + "')"
  document.getElementById("register2").style.backgroundImage = "url('images/" + webp + "/net." + webp + "')"
}

function hover(element) {
  element.setAttribute('src', 'images/' + webp + '/hftw-dark.' + webp);
}

function unhover(element) {
  element.setAttribute('src', 'images/' + webp + '/hftw-light.' + webp);
}
