const body = document.querySelector("body");
const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

//skening the mouse follower

let timer = 0;
function scaleMouseFollower() {
  let scaleX = 1;
  let scaleY = 1;

  let Xprev = 0;
  let Yprev = 0;
  window.addEventListener("mousemove", (event) => {
    clearTimeout(timer);
    let Xdiff = event.clientX - Xprev;
    let Ydiff = event.clientY - Yprev;
    Xprev = event.clientX;
    Yprev = event.clientY;

    scaleY = gsap.utils.clamp(0.8, 1.2, Ydiff / 100);
    scaleX = gsap.utils.clamp(0.8, 1.2, Xdiff / 100);

    circleMouseFollower(scaleX, scaleY);
    timer = setTimeout(() => {
      document.querySelector(
        ".minicircle"
      ).style.transform = `translate(${x}px,${y}px) scale(1,1)`;
    }, 100);
  });
}

function circleMouseFollower(scaleX, scaleY) {
  window.addEventListener("mousemove", (det) => {
    x = det.clientX;
    y = det.clientY;
    document.querySelector(
      ".minicircle"
    ).style.transform = `translate(${x}px,${y}px) scale(${scaleX} ,${scaleY})`;
  });
}
function hideunhidemouse() {
  document.querySelector("body").addEventListener("mouseleave", () => {
    document.querySelector(".minicircle").style.display = "none";
  });

  document.querySelector("body").addEventListener("mouseenter", () => {
    document.querySelector(".minicircle").style.display = "block";
  });
}

function moveImages() {
  document.querySelectorAll(".row").forEach((elem) => {
    var rotate = 0;
    var diffR = 0;

    elem.addEventListener("mouseleave", (det) => {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
      });
    });

    elem.addEventListener("mousemove", (det) => {
      const diff = det.clientY - elem.getBoundingClientRect().top;
      diffR = det.clientX - rotate;
      rotate = det.clientX;

      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        top: diff - 50,
        left: det.clientX,
        duration: 0.5,
        ease: Power3,
        rotate: gsap.utils.clamp(-20, 20, diffR),
      });
    });
  });
}

moveImages();

//scaleUP pointer in images //Check for eerrors
// function sacleUpfollower(){
//     const container = document.querySelector("#second");
//     const pointer = document.querySelector('.minicircle')
//     container.addEventListener('mouseenter', ()=>{
//         pointer.style.display ='block';
//         pointer.style.transform ='scale(5,5)';
//     })

//     container.addEventListener('mouseleave', () => {
//         pointer.style.transform = 'scale(1)'; // Reset scale
//         pointer.style.display = 'none'; // Hide the pointer if needed
//     });
// }
// sacleUpfollower()

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  });

  tl.to(".boundingelm", {
    y: "0%",
    opacity: "0.6",
    duration: 2,
    ease: Expo.easeInOut,
    stagger: 0.2,
    delay: -1,
  });
}

//image movement

document.querySelectorAll(".logos img").forEach((elem, index) => {
  gsap.to(elem, {
    x: "-=100vw", 
    duration: 8, 
    repeat: -1, 
    ease: "none", 
    delay: index * 1, 
  });
});

hideunhidemouse();
firstPageAnim();
scaleMouseFollower();
circleMouseFollower();
