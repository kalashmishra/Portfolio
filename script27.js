/*var tl=gsap.timeline();
tl.to("#fs",{
  height:0,
  duration:2,
  ease:Expo.easeInOut
})
.to("#element",{
  height:"100%",
  duration:2,
  delay:-2,
  ease:Expo.easeInOut
})
.to("#white",{
  height:"100%",
  duration:2,
  delay:-1.6,
  ease:Expo.easeInOut
})*/
function valueSetters(){
  gsap.set("#nav a",{y:"-100%" ,opacity:0})
  gsap.set("#home .parent .child",{y:"100%"})
  gsap.set("#home .row img",{opacity:0})
  document.querySelectorAll("#Visual>g").forEach(function(e) {
  var character =  e.childNodes[0].childNodes[0];
  character.style.strokeDasharray=character.getTotalLength() +'px';
  character.style.strokeDashoffset=character.getTotalLength() +'px';
  
  })
 

}
function revealToSpan(){
    document.querySelectorAll(".reveal")
  .forEach(function(elem){
    let parent = document.createElement("span");
    let child = document.createElement("span");
    parent.classList.add("parent");
    child.classList.add("child");
    child.innerHTML=elem.innerHTML;
    parent.appendChild(child);
    elem.innerHTML="";
    elem.appendChild(parent);
  
  })
  
  }
  function loaderAnimation(){
    
  var tl=gsap.timeline();
  tl
  .from("#fs .child span " ,{
    x:100,
    duration:1.4,
    stagger:.2,
    delay:1,
     ease:Power3.easeInOut
  })
  
  .to("#fs .parent .child" ,{
    y:"-100%",
    duration:1,
  
     ease:Circ.easeInOut
  })
  .to("#fs",{
    height:0,
    duration:1,
    ease:Circ.easeInOut
  })
  .to("#element",{
    height:"100vh",
    top:0,
    delay:-.8,
    duration:1,
    ease:Circ.easeInOut
  })
  .to("#element",{
    height:"0vh",
    delay:-.5,
 
    duration:.8,
    ease:Circ.easeInOut,
    onComplete: function(){
      animateHomepage();
    }
  })
  
  }
  function animateHomepage(){
 
    var tl = gsap.timeline();
    tl.to("#nav a" , {
      y:0,
      opacity:1,
      stagger:.05,
      ease:Expo.easeInOut
    
    })
    .to("#home .parent .child" , {
      y:0,
      opacity:1,
      stagger:.1,
      duration:1.5,
      ease:Expo.easeInOut
    
    })
    .to("#home .row img" , {
      
      opacity:1,
      delay:-.5,
      
      ease:Expo.easeInOut,
      onComplete:function(){
        animateSvg();
    
      }
    
    })
    
      }
     
    

  
  function animateSvg(){
   gsap.to("#Visual>g>g>path , #Visual>g>g>polyline" ,{
    strokeDashoffset:0,
    duration:2,
    ease:Expo.easeInOut
    
   })
  }
  function locoInitialize(){
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);
    
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    
    
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    ScrollTrigger.refresh();
    
    
    ;
  }
  
  function cardShow(){
    document.querySelectorAll(".cnt")
    .forEach(function(cnt){
      var showingImg;
      cnt.addEventListener("mousemove",function(dets){
    // console.log(dets.target.dataset)
    var dim = document.querySelector(".cnt").getBoundingClientRect();
 
     showingImg = dets.target;
     document.querySelector("#cursor").children[showingImg.dataset.index].style.opacity = 1;
   
// document.querySelector("#cursor").children[dets.target.dataset.index].style.transform =`translate(${dets.clientX}px, ${dets.clientY - dim.y}px)`;
document.querySelector("#cursor").children[dets.target.dataset.index].style.left =(dets.x )+"px";
 document.querySelector("#cursor").children[dets.target.dataset.index].style.top =(dets.y - dim.y)+"px";
showingImg.style.filter = "grayscale(1)";
document.querySelector("#work").style.backgroundColor = "#" + dets.target.dataset.color;
       })
      cnt.addEventListener("mouseleave",function(dets){
        document.querySelector("#cursor").children[showingImg.dataset.index].style.opacity = 0;
        showingImg.style.filter = "grayscale(0)";
        document.querySelector("#work").style.backgroundColor = "#fff";

        
              })
        
    })
  }
  
   window.addEventListener("DOMContentLoaded", function(){
    revealToSpan();
    valueSetters();
    loaderAnimation();
   locoInitialize();
    cardShow();
  
   })
   