import { notificationsComponent } from "../components/notisComp.js"

let notificationsContainer = document.querySelector('#notifications-section')

window.addEventListener('load', () => {
    if (notificationsContainer) {
        notificationsContainer.innerHTML = notificationsComponent
    }
})