/**
 * Created by japjohal on 2019-03-21.
 */

// store element by name
let noteTitle = document.getElementById("note-title");
let noteBody  = document.getElementById("note-body");
let notesUl = document.getElementById("notesUl");
let storageKey = "notesList";


const addNote =  () => {
    /**
     * Purpose: function called when addNote is clicked. Goes to checkInputs() and returns 0 or 1. If 0 we add to list. If 1 we do nothing
     * @param: None
     * Return: none
    */

    checkInputs()== 0 ? addToList(): "";
    return null;
};

const checkInputs = () => {
    /**
     * Purpose: function called by addNote(). If their is no text in noteTitle makes bottomBorder red.
     * @param: None
     * Return: 1 or 0 depending if their is text in input field
     */
    if(noteTitle.value == ""){
        noteTitle.style.borderColor="red";
        return 1;
    }
    return 0;
};

const changeRedUnderline = (element) =>{
    /**
     * Purpose: function purpose is to change red underline to grey for title
     * @param {Element} the element that is calling this function
     * Return: none
     */
    let callingElement = document.getElementById(element.id);

    if(callingElement.style.borderColor == 'red') {
        document.getElementById(element.id).style.borderColor = "#C7C7C7";
    }
    return null;
};

const addToList = async() =>{
    /**
     * Purpose: functions add to localStorage. Checks if any items are stores in localStorage if so pulls json add to array JSON object and pushes back. Does reload of loadList() each time called
     * @param: none
     * Return: none
     */
    if(localStorage.getItem(storageKey) == null){
        let notesArray = [];
        let note = {
            title:noteTitle.value,
            body:noteBody.value
        }; // create initial note

        notesArray.push(note);
        let parentJson = {
            notesArray:notesArray
        }; // the parent json hold array which hold json objects
        localStorage.setItem(storageKey,JSON.stringify(parentJson));
        loadList();
        return null;
    }

    else{
        let storedNotes =  await JSON.parse(localStorage.getItem(storageKey));
        let note = {
            title:noteTitle.value,
            body: noteBody.value
        };
        storedNotes.notesArray.push(note);
        localStorage.setItem(storageKey,JSON.stringify(storedNotes));
        loadList();
        return null;
    }
};

const deleteIndividualNote = (locationInArray) =>{
    /**
     * Purpose: to delete indiviudal note. Takes position of object pulls localStorage and deletes from it
     * @param {locationInArray} takes the location in the array of object
     * Return: none
     */
    const data = JSON.parse(localStorage.getItem(storageKey));
    data.notesArray.splice(locationInArray,1);
    localStorage.setItem(storageKey,JSON.stringify(data));
    loadList();
    return null;
}

const loadList = ()  =>{
    /**
     * Purpose: to load information from localStorage. Because function is called when new items are added we empty it each time its called and then append to it if the list is not null
     * @param: none
     * Return: none
     */
    let noteData = JSON.parse(localStorage.getItem(storageKey));
    if(noteData != null) {
        let notesArray = noteData.notesArray;
        notesUl.innerHTML = ""; // clearing the existing list

        for (let i = 0; i < notesArray.length; i++) {  // for loop of localStorage
            let li = document.createElement("li");
            let button = document.createElement("button");
            let span = document.createElement("span");

            span.setAttribute('aria-hidden', "true");
            span.innerHTML='&times';

            // button configuration
            button.appendChild(span);
            button.type="button";
            button.className="close deleteIndividualNote"; // adding function that calls it
            button.addEventListener("click", () => deleteIndividualNote(i));
            button.setAttribute('aria-label', "Close");

            li.className = "list-group-item notesObjects";
            li.innerHTML = li.innerHTML += '<strong><i>' + notesArray[i].title + '</i></strong><br><br>' + notesArray[i].body; // styling the note
            li.appendChild(button);

            notesUl.appendChild(li); // append to UL element

        }
    }
    return null;
};


const deleteNotes = () =>{
    /**
     * Purpose: to delete all notes
     * @param: none
     * return: none
     */

    localStorage.clear();
    notesUl.innerHTML="";
};

loadList(); // initial call to load the list