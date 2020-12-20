// document.addEventListener("DOMContentLoaded", function() {});
//DOM ELEMENTS // 

list = document.querySelector('#list')
bookShow = document.querySelector('#show-panel')
let user1 = {"id":1, "username":"pouros"}

// Event Functions // 
function getBookObj(event){
    getSingleBook(event.target.dataset.id)
        // .then(renderBookInfo)

}

function booklike(event){ //not being used currently
    // likePatch(event.target)
    console.log(event.target)
}

// Render Functions // 

function renderBook(bookObj){
    li = document.createElement('li')
    li.innerText = bookObj.title
    li.dataset.id = bookObj.id
    // console.log(li.dataset)
    li.addEventListener("click", getBookObj)

    list.append(li);
}

function renderBookInfo(singleBookObj){
    console.log(singleBookObj)

    // div = document.createElement('div')
    
    bookShow.innerHTML = `
    <img src=${singleBookObj.img_url}>
    <h3>${singleBookObj.title}</h3>
    <h3>${singleBookObj.subtitle}</h3>
    <h3>${singleBookObj.title}</h3>
    <h3>${singleBookObj.author}</h3>
    <p>${singleBookObj.description}</p>
    <ul id="userList"></ul>
    <button> Like </button>
    `
    userlist = bookShow.querySelector('#userList')
    // console.log(userlist)
    // console.log(singleBookObj.users)
    singleBookObj.users.forEach( user => { userlist.innerHTML += `<li>${user.username}</li>`})

    likeBtn = bookShow.querySelector('#show-panel > button')
    // likeBtn.addEventListener("click", booklike)

    bookShow.addEventListener("click", event =>{

        if(event.target === likeBtn){
            // console.log("test")
            console.log(singleBookObj.users)
            
            newUserLikes = singleBookObj.users

            newUserLikes.push(user1)
            console.log(newUserLikes);

            fetch(`http://localhost:3000/books/${singleBookObj.id}`, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    users: newUserLikes
                })
            })
            .then(r => r.json())
            .then(userlist.innerHTML += `<li>${user1.username}</li>`)
                
                
        }
    })
    


}


// FEtch / Update Functions //

function getBooks() {
    fetch('http://localhost:3000/books')
        .then(response => response.json())
        // .then(data => console.log(data));
        .then(books => books.forEach(book => {
            renderBook(book)
            })
        )

}

function getSingleBook(id) {
    fetch(`http://localhost:3000/books/${id}`)
        // .then(data => console.log(data))
        .then(r => r.json())
        .then(renderBookInfo)

}

// Initial Functions //

getBooks();