const rope = document.getElementById("rope");
const knob = document.querySelector(".knob-logo");

let dragging = false;
let baseHeight = 200;
let currentHeight = baseHeight;
let isOn = false;

knob.addEventListener("pointerdown", (e) => {
  dragging = true;
  rope.style.transition = "none";
});

document.addEventListener("pointermove", (e) => {
  if (!dragging) return;

  let newHeight = e.clientY - 80;

  if (newHeight < 120) newHeight = 120;
  if (newHeight > 320) newHeight = 320;

  rope.style.height = newHeight + "px";
  currentHeight = newHeight;
});

document.addEventListener("pointerup", () => {
  if (!dragging) return;

  dragging = false;

  rope.style.transition = "0.5s cubic-bezier(.25,.8,.25,1)";
  rope.style.height = baseHeight + "px";

  // Light 
  if (currentHeight > baseHeight + 80) {
    isOn = !isOn;
    document.body.classList.toggle("on", isOn);
  }
});




// Desaper rope from toggle

const ropeContainer = document.querySelector(".rope-container");
const navbarCollapse = document.getElementById("navbarNav");

navbarCollapse.addEventListener("show.bs.collapse", () => {
  ropeContainer.style.opacity = "0";
  ropeContainer.style.transform = "translateX(-20px)";
});

navbarCollapse.addEventListener("hide.bs.collapse", () => {
  ropeContainer.style.opacity = "1";
  ropeContainer.style.transform = "translateX(0)";
});


// typing text
const words = ["Front-End & Interactive UI | ", "Front-End Web Crafting | ", "Web Interface Development | "];
let index = 0;
let charIndex = 0;
let isDeleting = false;
const speed =90;

function typeEffect(){

  const text = words[index];
  const element = document.getElementById("typing-text");

  if(!isDeleting){
    element.textContent = text.substring(0,charIndex++);
  }else{
    element.textContent = text.substring(0,charIndex--);
  }

  if(!isDeleting && charIndex === text.length){
    isDeleting = true;
    setTimeout(typeEffect,1000);
    return;
  }

  if(isDeleting && charIndex === 0){
    isDeleting = false;
    index = (index + 1) % words.length;
  }

  setTimeout(typeEffect,speed);
}

typeEffect();


// skills

 const scene    = document.getElementById('scene');
  const svgEl    = document.getElementById('linesSvg');
  const orbEl    = document.getElementById('centralOrb');

  function center(el) {
    const eR = el.getBoundingClientRect();
    const sR = scene.getBoundingClientRect();
    return { x: eR.left - sR.left + eR.width  / 2,
             y: eR.top  - sR.top  + eR.height / 2 };
  }

  function drawLines() {
    svgEl.innerHTML = '';
    const orbC = center(orbEl);
    scene.querySelectorAll('.skill-icon').forEach(icon => {
      const ic   = center(icon);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', ic.x);   line.setAttribute('y1', ic.y);
      line.setAttribute('x2', orbC.x); line.setAttribute('y2', orbC.y);
      svgEl.appendChild(line);
    });
  }

  window.addEventListener('load',   drawLines);
  window.addEventListener('resize', drawLines);