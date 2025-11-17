import { footComponent } from "../components/footerComp.js"

let footContainer = document.querySelector('footer')

window.addEventListener('load', ()=>{
    footContainer.innerHTML = footComponent
})