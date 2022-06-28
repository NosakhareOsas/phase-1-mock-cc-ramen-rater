// write your code here

const initialize = () => {
    const form = document.querySelector('#new-ramen')
    const img = document.querySelector('img.detail-image')
    const divImg = document.querySelector('#ramen-menu')
    const h2 = document.querySelector('h2.name')
    const h3 = document.querySelector('h3.restaurant')
    const rate = document.querySelector('span#rating-display')
    const comment = document.querySelector('p#comment-display')

    const newimg = document.querySelector('#new-image')
    const newname = document.querySelector('#new-name')
    const newrest = document.querySelector('#new-restaurant')
    const newrate = document.querySelector('#new-rating')
    const newcomment = document.querySelector('#new-comment')
    const id = document.querySelector('#krod')

    //console.log(newimg,newname,newrest,newrate,newcomment)

    const update = document.querySelector('#edit-ramen')
    const updateRate = document.querySelector('#edit-rating')
    const updateComment = document.querySelector('#edit-comment')

    const deleteRamen = document.querySelector('#delete-ramen')

    fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then((data) => {
        data.forEach(element => {
            //console.log(element.id)
            const display = document.createElement('img')
            display.src = `${element.image}`
            divImg.append(display)

            img.src = data[0].image
            h2.textContent = data[0].name
            h3.textContent = data[0].restaurant
            rate.textContent = data[0].rating
            comment.textContent = data[0].comment
            id.textContent = data[0].id

            display.addEventListener('click', ()=>{
                fetch(`http://localhost:3000/ramens/${element.id}`)
                .then(response => response.json())
                .then(() => {
                    //console.log(element.id)
                    img.src = element.image
                    h2.textContent = element.name
                    h3.textContent = element.restaurant
                    rate.textContent = element.rating
                    comment.textContent = element.comment
                    id.textContent = element.id
                    deleteRamen.addEventListener('click', (e) => {
                        e.preventDefault()
                        const configurationObject = {
                            method: "DELETE",
                            headers: {"Content-Type": "application/json", Accept: "application/json"}
                        }
                        
                        fetch(`http://localhost:3000/ramens/${id.textContent}`,configurationObject)
                        .then(response => response.json())
                        .then(() => {
                            location.reload()
                        })
                        //setTimeout(()=>{location.reload()}, 500)   
                    })
                    update.addEventListener('submit', (e) => {
                        e.preventDefault()
                        const updateData = {
                            rating: updateRate.value,
                            comment: updateComment.value
                        }
                        const configurationObject = {
                            method: "PATCH",
                            headers: {"Content-Type": "application/json", Accept: "application/json",},
                            body: JSON.stringify(updateData)
                        }
                        fetch(`http://localhost:3000/ramens/${id.textContent}`,configurationObject)
                        setTimeout(()=>{location.reload()}, 500)
                    } ) 
            })
            })

               
        });      
    })
    .catch(e => console.log(e.message))

    


    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = {
            name: newname.value,
            restaurant: newrest.value,
            rating: newrate.value,
            comment: newcomment.value,
            image: newimg.value
        }
    
        //console.log(newname.value)
    
        const configurationObject = {
            method: "POST",
            headers: {"Content-Type": "application/json", Accept: "application/json",},
            body: JSON.stringify(formData)
    
        }


        
        fetch('http://localhost:3000/ramens', configurationObject)
        setTimeout(()=>{location.reload()}, 500)
        //location.reload();
        //return false;
    })


}

document.addEventListener('DOMContentLoaded', initialize)
