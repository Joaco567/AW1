const notifications = [
    {
        date: 'Octubre 13 - 2025',
        icon: 'bi-tag-fill text-warning',
        message: '¡50% OFF en todo Re:Zero hasta fin de mes!'
    },
    {
        date: 'Octubre 17 - 2025',
        icon: 'bi-gift-fill text-success',
        message: 'Descuento especial: 20% en tu primera compra'
    },
    {
        date: 'Octubre 20 - 2025',
        icon: 'bi-credit-card-fill text-info',
        message: 'Nuevo método de pago disponible: Mercado Pago'
    }
]

const newArrivals = [
    {
        date: 'Octubre 15 - 2025',
        message: 'Recién llegado: Dr. Stone Vol. 1'
    },
    {
        date: 'Octubre 17 - 2025',
        message: 'Ya disponible: Jojo\'s Bizarre Adventure P.1 Vol. 1'
    },
    {
        date: 'Octubre 19 - 2025',
        message: 'Estreno: Neon Genesis Evangelion Vol. 1'
    }
]

export const notificationsComponent = `
<div class="row">
    <div class="col-12 col-md-6">
        <div class="card card-notis mt-5">
            <div class="card-header text-center">
                <i class="bi bi-bell-fill me-2"></i>Notificaciones 
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-secondary">
                    +${notifications.length}
                    <span class="visually-hidden">unread messages</span>
                </span>
            </div>

            <div class="card-body">
                <ul class="list-group list-group-flush list-group-item-warning rounded-3">
                    ${notifications.map(notif => `
                        <li class="list-group-item text-white">
                            <small class="text-secondary d-block mb-3">
                                <i class="bi bi-calendar3 mx-1"></i> ${notif.date}
                            </small>
                            <i class="bi ${notif.icon} mx-1"></i>
                            ${notif.message}
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    </div>

    <div class="col-12 col-md-6">
        <div class="card mt-5">
            <div class="card-header text-center">
                <i class="bi bi-box-seam-fill me-2"></i>Nuevos Ingresos 
                <span class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2">
                    <span class="visually-hidden">unread messages</span>
                </span>
            </div>

            <div class="card-body">
                <ul class="list-group list-group-flush list-group-item-primary rounded-3">
                    ${newArrivals.map(item => `
                        <li class="list-group-item text-white">
                            <small class="text-secondary d-block mb-3">
                                <i class="bi bi-calendar3 mx-1"></i> ${item.date}
                            </small>
                            <i class="bi bi-book-fill text-primary me-2"></i>
                            ${item.message}
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    </div>
</div>
`