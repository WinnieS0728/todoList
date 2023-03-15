const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
})
const newItem = document.querySelector('#newItem')
const addBtn = document.querySelector('#add-newItem')
const newItem_board = document.querySelector(`.board.new .list`)

addBtn.addEventListener('click', addNewItem)
window.addEventListener('keyup', e => {
    if (e.key == 'Enter') {
        addNewItem()
        newItem.value = ''
    }
})

function addNewItem() {
    if (!newItem.value) {
        alert('事項沒打')
        return
    }
    newItem_board.innerHTML += `<div class="item">${newItem.value}</div>`
}

function setData(state) {
    const items = localStorage.getItem(`${state}List`)
    if (!items) {
        return
    }
    const itemList = items.split(',')
    const item_board = document.querySelector(`.board.${state} .list`)
    for (let i = 0; i < itemList.length; i++) {
        item_board.innerHTML += `<div class="item">${itemList[i]}</div>`
    }
}
setData('new')
setData('ing')
setData('done')

const boards = document.querySelectorAll('.board .list')
boards.forEach(i => {
    Sortable.create(i, {
        group: "items",
        animation: 300,
        filter: '.title',
        ignore: '.title',
    })
})

function upload(state) {
    const items = document.querySelectorAll(`.board.${state} .item`)
    const itemList = [...items].map(i => i.textContent)

    localStorage.setItem(`${state}List`, itemList)
}
function uploads() {
    upload('new')
    upload('ing')
    upload('done')
    alert('上傳成功')
}