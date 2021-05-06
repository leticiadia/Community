const modalOverlay = document.querySelector ('.modal-overlay')

function activeVideo(){
    const cards = document.querySelectorAll ('.card')

    for (let card of cards) {
        card.addEventListener("click", function(){
            const videoId = card.getAttribute("id")
            window.location.href = `/video?id=${videoId}`
        })
    }

}
activeVideo()


function activeMenu(){
    const currentPage = location.pathname
    const menuItems = document.querySelectorAll('header .links a')

    for(item of menuItems){
        if(currentPage.includes(item.getAttribute('href'))){
            item.classList.add('active')
        }
    }
}
activeMenu()


function deleteMessage(){
    const formDelete = document.querySelector('#form-delete')

    formDelete.addEventListener('submit', function(event){
        const confirmation = confirm('Do you want to delete?')

        if(!confirmation){
            event.preventDefault()
        }
    })
}

deleteMessage()
