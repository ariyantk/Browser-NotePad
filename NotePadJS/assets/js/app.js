// variables
const noteList = document.querySelector("#note-list");
// event listerners
eventlisteners();

function eventlisteners() {
  document.querySelector("#form").addEventListener("submit", newNote);

  document.querySelector("#note-list").addEventListener("click", removeNote);

  //dom content load
  document.addEventListener("DOMContentLoaded", LocalStorageOnLoad);
}

//function

// adding newNote
function newNote(e) {
  e.preventDefault();
  const note = document.querySelector("#note").value;

  //remove note
  const removeBtn = document.createElement("a");
  removeBtn.textContent = "X";
  removeBtn.classList = "remove-note";

  //new element li
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(note));

  //adding  removeBTn to li
  li.appendChild(removeBtn);

  //adding li to note-list
  noteList.appendChild(li);

  //
  this.reset();

  //
  addNoteToLocalStorage(note);

  //
  alert("یادداشت شما با موفقیت اضافه شد!");
}

//remove note from note-list
function removeNote(e) {
  if (e.target.classList.contains("remove-note")) {
    e.target.parentElement.remove();
  }
  removeNoteFromLS(e.target.parentElement.textContent);
}

//add note to local storage
function addNoteToLocalStorage(newNote) {
  const notes = getNotesFromLocalStorage();
  notes.push(newNote);
  localStorage.setItem("notes", JSON.stringify(notes));
}

//check local storage
function getNotesFromLocalStorage() {
  let notes;
  let getFromLS = localStorage.getItem("notes");

  if (getFromLS === null) {
    notes = [];
  } else {
    notes = JSON.parse(getFromLS);
  }
  return notes;
}

function LocalStorageOnLoad() {
  const notes = getNotesFromLocalStorage();

  notes.forEach(function (note) {
    //remove note
    const removeBtn = document.createElement("a");
    removeBtn.textContent = "X";
    removeBtn.classList = "remove-note";

    //new element li
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(note));

    //adding  removeBTn to li
    li.appendChild(removeBtn);

    //adding li to note-list
    noteList.appendChild(li);
  });
}

function removeNoteFromLS(item) {
  //delete X from content
  const itemRemove = item.substring(0, item.length - 1);

  //delete Item
  const itemFromLS = getNotesFromLocalStorage();

  itemFromLS.forEach(function (note, index) {
    if (note === itemRemove) {
      itemFromLS.splice(index, 1);
    }
  });

  localStorage.setItem("notes", JSON.stringify(itemFromLS));
}
