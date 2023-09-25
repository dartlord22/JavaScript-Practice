const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")

//check whether inputBox value is empty, provide alert if it is empty
function addTask(){
    if(inputBox.value === ''){ //triple = is a strict equality operator in js 
        alert("You must write something!")
    }
    else{
        let li = document.createElement('li'); //assign newly created <li> element to li variable so we can reference and manipulate <li> element later in code 
        li.innerHTML = inputBox.value; assign  //set innerHTML property of the <li> element to value created by user in inputBox
        listContainer.appendChild(li); //append <li> element to the list, making it visible in user interface 
        let span = document.createElement('span');
        span.innerHTML = '\u00d7'; //Unicode character for (x) used as the close button symbol
        li.appendChild(span); //append close button to <li> elements
    }
    inputBox.value = ''; //clear input box after task is added
    saveData(); //save to local storage
}

//add ability to enter task by pressing the "enter" key
inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){ //when accessing the 'tagName' property of an element, it returns the tag name in uppercase (hence "LI" instead of "li")
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();