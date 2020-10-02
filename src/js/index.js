import '../css/style.css'
import NotesStorage from "./storage";
import Note from "./note";
let storage
let notes_list = document.getElementById('notes_list')
let textarea= document.getElementById('note')
let add_note= document.getElementById('add_note')
let delete_note = document.getElementById('delete_note')
//buttons event listeners and textarea
add_note.addEventListener('click',(ev)=>{
    let note = storage.add_note()
    pushToURL('','id',note._urlID)
    update_page()
})
delete_note.addEventListener('click', (ev)=>{
    if(storage._selected!==0)
    storage.delete_note(storage._selected)
    textarea.value =''
    textarea.disabled=true
    pushToURL('','','')
    update_page()
})
textarea.addEventListener('input',(ev)=>{
    storage.edit_note(storage._selected,textarea.value)
    storage.makeFirst(storage._selected)
    update_page()
})
//window event listeners
window.addEventListener('click', event => {
    if (
        event.target.classList.contains('sidebar__note') ||
        event.target.nodeName == 'H2' ||
        event.target.nodeName == 'TIME'
    ) {
        const noteID =
            event.target.dataset.id || event.target.parentNode.parentNode.dataset.id;
        for (let i = 0; i < storage._notes.length; i++) {
            if(noteID == +storage._notes[i].getDate()){
                storage._notes[i].setSelected(true)
                storage._selected = storage._notes[i].getDate()
                textarea.disabled= false
                pushToURL('','id',storage._notes[i].get_urlID())
            }else{
                storage._notes[i].setSelected(false)
            }
        }
        update_page()
    }
})

window.addEventListener('unload',(ev )=>{
    localStorage.setItem('notes',JSON.stringify(storage._notes))
})

window.addEventListener('load', () => {
    if (localStorage.getItem('notes') === null) {
        localStorage.setItem('notes', JSON.stringify([]));
        storage = new NotesStorage()
    } else {
        let notes = JSON.parse(localStorage.getItem('notes'));
        notes.forEach((note) => {
            note.__proto__ = Note.prototype;
            note._createdDate= new Date(note._createdDate)
            note._editedDate= new Date(note._editedDate)
            note._selected=false
        });
        storage = new NotesStorage(notes)
    }

    textarea.disabled = true;
    const { search } = window.location
    const query = parseQuery(search)
    for(let i=0;i<storage._notes.length;i++){
        if(query.id==storage._notes[i].get_urlID()){
            storage._selected = storage._notes[i].getDate()
            storage._notes[i].setSelected(true)
            textarea.disabled= false
            break;
        }

    }
    update_page()
});


function  update_page() {
    notes_list.innerHTML=''
    storage._notes.forEach(note=>{
        const li = createNoteLI(note)
        notes_list.insertBefore(li, notes_list.firstChild);
        if(note.getSelected()===true)
            textarea.value = note.getText()
    })
}

function createNoteLI(note){
    const li = document.createElement('li')
    li.classList.add('sidebar__note')
    const div = document.createElement('div')
    if (note.getSelected()) {
        li.classList.add('active')
    }

    let title = document.createElement('h2')
    title.appendChild(document.createTextNode(note.getTitle()))
    div.appendChild(title)


    const noteDate = document.createElement('time')
    noteDate.appendChild(document.createTextNode('Creation date:'+formattedDate(note.getDate())))
    div.appendChild(noteDate)

    const updateDate = document.createElement('time')
    updateDate.appendChild(document.createTextNode("Update date:"+formattedDate( note.getEditionDate())))
    div.appendChild(updateDate)

    li.appendChild(div)

    li.dataset.id = +note.getDate()
    return li;
}

function formattedDate(date) {
    let year = date.getFullYear()

    let month = (1 + date.getMonth()).toString()
    month = month.length > 1 ? month : '0' + month

    let day = date.getDate().toString()
    day = day.length > 1 ? day : '0' + day

    let hour = date.getHours().toString()
    hour = hour.length > 1 ? hour : '0' + hour

    let minutes = date.getMinutes().toString()
    minutes = minutes.length > 1 ? minutes : '0' + minutes

    let seconds = date.getSeconds().toString()
    seconds = seconds.length > 1 ? seconds : '0' + seconds

    return day + '.' + month + '.' + year + ' ' + hour + ':' + minutes + ':' + seconds
}

function pushToURL(name, key, value){
    if(value===''){
        window.history.replaceState(null, null, '/')
    }else
    window.history.replaceState(null, null, `${name}?${key}=${value}`)
}

function parseQuery(query){
    const queryStrings = query.slice(1).split('&')
    const queryItems = {}
    queryStrings.forEach(item => {
        const parts = item.split('=')
        queryItems[parts[0]] = parts[1]
    })
    return queryItems
}