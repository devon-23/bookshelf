var data
async function findBooks() {
    title = (document.getElementById('book').value).split(' ').join('+')
    
    const resp = await fetch(`http://openlibrary.org/search.json?title=${title}&limit=3`)
    data = await resp.json()
    const main = document.querySelector('main')

    console.log(data)

    const bookEl = document.createElement('div');
    bookEl.innerHTML = `
            <h2>which book would you like to add to the database?<h2>
            <p>1.)${data.docs[0].title} by ${data.docs[0].author_name[0]}<input type="radio" value="0" name="add"></p>
            <p>2.)${data.docs[1].title} by ${data.docs[1].author_name[0]}<input type="radio" value="1" name="add"></p>
            <p>3.)${data.docs[2].title} by ${data.docs[2].author_name[0]}<input type="radio" value="2" name="add"></p>
            <button type="submit" onclick="addDatabase(); window.location.href='index.html';" id="btn">Add</button>
        `
    main.appendChild(bookEl)
    //
}

async function addDatabase() {
    const radioButtons = document.querySelectorAll('input[name="add"]');
    let book;

    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            book = Number(radioButton.value);
            break;
        }
    }

    // console.log(this.data.docs[book]) //book to send to database
    
    const title = this.data.docs[book].title
    const author = this.data.docs[book].author_name[0]
    const year = this.data.docs[book].first_publish_year

    const send = {title, author, year}

    console.log(send)

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(send)
    }

    const response = await fetch('/api', options)
    // const json = await response.json()
    // console.log(json)
}