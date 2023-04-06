// Change color of button on hover

const buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.backgroundColor = '#80c49a';
    button.style.color = '#fff';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.backgroundColor = '#fff';
    button.style.color = '#80c49a';
  });
});

// Smooth scrolling animation

const links = document.querySelectorAll('nav a');

links.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();

    const href = link.getAttribute('href');
    const offsetTop = document.querySelector(href).offsetTop;

    scroll({
      top: offsetTop,
      behavior: 'smooth'
    });
  });
});
