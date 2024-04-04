/*
* Juguemos a adivinar la palabra
*
* El usuario tiene 3 intentos para divinar la palabra oculta
*
* Requerimientos:
*
* - El juego debe tener una palabra oculta.
* - El juego puede dar 1 pista  de la palabra.
* - El usuario debe ingresar una suposición.
* - El juego debe verificar si la suposición del usuario es correcta.
* - El juego debe tener un número limitado de intentos.
* - El juego debe terminar cuando el usuario adivine la palabra o se quede sin intentos.
*
* */

/*
* Exercise: Managing a Stack
* Create a program that simulates a stack using the push and pop methods.
* The stack should store a collection of books. Users can perform the following actions:
* 1. Add a new book to the top of the stack.
* 2. Remove the book from the top of the stack.
* 3. Display the current stack of books.
* Implement a loop that allows user to interact with the stack until they choose to exit.
*
*
*
* */

function main() {
    let bookCart = []

    // Actions
    const ADD_TO_CART_ACTION = 'addToCart'
    const REMOVE_FROM_CART_ACTION = 'removeFromCart'
    const VIEW_CART_ACTION = 'viewCart'

    // DOM Elements
    const bookNameInputElement = document.getElementById('bookNameInput')
    const addToCartButtonElement = document.getElementById('addToCartButton')
    const removeFromCartButtonElement = document.getElementById('removeFromCartButton')
    const bookListElement = document.getElementById('bookList')
    const errorMsgElement = document.getElementById('errorMsg')
    const successMsgElement = document.getElementById('successMsg')

    let bookName

    // Event Listeners
    bookNameInputElement.addEventListener('input', () => bookName = bookNameInputElement.value)
    addToCartButtonElement.addEventListener('click', () => performCartActions(ADD_TO_CART_ACTION, bookName))
    addToCartButtonElement.addEventListener(
        'keypress',
        (event) => console.log(event.key))
    removeFromCartButtonElement.addEventListener('click', () => performCartActions(REMOVE_FROM_CART_ACTION, bookName))
    onChangeBookList()

    // Observers
    // const mutationObserver = new MutationObserver(onChangeBookList)
    // mutationObserver.observe(bookListElement, {childList: true})

    function performCartActions(action, book) {

        switch (action) {

            case ADD_TO_CART_ACTION:

                if (!book) {
                    onModifyBookList("Elige un nombre valido para tu libro", errorMsgElement)
                    break
                }

                if (bookCart.find(value => value === book)) {
                    onModifyBookList(`Ya tienes el Libro ${book} en tu Coleccion`, errorMsgElement)
                    break
                }

                bookCart.push(book)

                const newBookElement = document.createElement("li")
                newBookElement.id = book
                newBookElement.classList.add('bookList--item')

                const bookIcon = document.createElement("span")
                bookIcon.textContent = '📕'

                const bookName = document.createElement("span")
                bookName.textContent = `${book}`

                newBookElement.appendChild(bookIcon)
                newBookElement.appendChild(bookName)

                bookListElement.appendChild(newBookElement)

                onChangeBookList()

                onModifyBookList(` ${book} agregado satisfactoriamente`, successMsgElement)
                break

            case REMOVE_FROM_CART_ACTION:

                if (!book) {
                    onModifyBookList("Elige un nombre valido para eliminar",errorMsgElement)
                    break
                }

                if (!bookCart) {
                    onModifyBookList("No hay libro para eliminar", errorMsgElement)
                    break
                }

                if (!bookCart.find(value => value === book)) {
                    onModifyBookList(`El libro ${book} no esta en su coleccion`, errorMsgElement)
                    break
                }

                bookCart = bookCart.filter(value => value !== book)

                for (const innerBook in bookListElement.childNodes) {
                    if (bookListElement.childNodes[innerBook].id === `${book}`) {
                        bookListElement.childNodes[innerBook].parentNode.removeChild(bookListElement.childNodes[innerBook])
                    }
                }
                onChangeBookList()

                onModifyBookList(` ${book} eliminado satisfactoriamente`, successMsgElement)

                break
        }

    }

    function onChangeBookList() {

        if (bookCart.length === 0 && !document.getElementById('emptyBookListMsg')) {
            const emptyBookListMsgElement = document.createElement("li")
            emptyBookListMsgElement.id = 'emptyBookListMsg'
            emptyBookListMsgElement.classList.add('bookList--item')
            emptyBookListMsgElement.innerText = 'No tienes libros en tu Carrito aún'

            bookListElement.appendChild(emptyBookListMsgElement)
        } else if (bookCart.length > 0 && document.getElementById('emptyBookListMsg')) {
            document.getElementById('emptyBookListMsg').remove()
        }
    }

    function onModifyBookList(msg, msgElement) {
        msgElement.innerText = msg
        msgElement.classList.remove('hidden')

        setTimeout(() => msgElement.classList.add('hidden'), 3000)
    }

}

// Evento para ejecutar la app cuando se recargue la web
document.addEventListener('DOMContentLoaded', main)