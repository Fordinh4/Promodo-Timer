// ====> Variables
const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue("--color-secondary"); 
const shadowColor = getComputedStyle(document.documentElement).getPropertyValue("--color-shadow");

// The setting button to open/close 
const closeMenubtn = document.getElementById("closeMenubtn");
const optionsbtn = document.getElementById("optionsbtn");

// The progress bar
const progressBar = document.getElementById("progressBar");

// The promodo clock and the panel
const workTittle = document.getElementById('work');
const breakTittle = document.getElementById('break');
const setting = document.getElementById("setting");
const promodoInput = document.getElementById("promodoInput");
const shortBreakInput = document.getElementById("shortBreakInput");
const longBreakInput = document.getElementById("longBreakInput");
// Start button
const startbtn = document.getElementById("start");
// Pause button
const pausebtn = document.getElementById("pause");

// Promodo modes
let workTime;
let shortBreakTime ;
let longBreakTime;
let breakCount = 0;
let timeonTab = " | Time for work!";

// For the calculation of the promodo clock
let time_in_minutes;
let current_time;
let futureTime; 
let time_left; // time left on the clock when paused
let begin = false; // The user first press the count down
let timeInterval;

// For the todo list
const entry = document.getElementById("entry");
const form = document.getElementById("form"); 
const ul = document.getElementById("todo-list");
const alertP = document.querySelector('.alert'); // allows you to select elements from the document using CSS selectors
// For the buttons
const clearBtn = document.querySelector('.clear-btn');
const submitBtn = document.querySelector('.submit-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const toDoList = document.getElementById("toDoList");
const closeTDLbtn = document.getElementById("closeTDLbtn");
// For the edit part
let editFlag = false;
let editElement; // an HTML element initially undefined and global for editing
let editID; // Both of these and the above one are undefined

// Local storage
let promodoLSKey = "PromodoClock";
let LSkey = 'TodoList';

//=======> For when DOMContentLoaded=> to display and edit the local storage when the page load
window.addEventListener('DOMContentLoaded', setupPromodoSetting);
window.addEventListener('DOMContentLoaded', setupItems);



// =======> The clock, panel mode, and the buttons
function addZero(num) {
    // Function to display leading 0
    if (num < 10) {
        return "0" + num;
    }
    else {
        return num;
    }
}

// Calculate the remaining time
function time_remaining(endtime){
    // To calculate the remaining time by using the future time - time that count rn (all in milliseconds)
    // The reason why i use date.now() instead of Date.parse(new Date() is because i want the smooth kinda-animation of the progress bar!

	var t = Date.parse(endtime) - Date.now();
	var seconds = Math.floor((t/1000) % 60);
	var minutes = Math.floor((t/60000));
	return {'total':t, 'minutes':minutes, 'seconds':seconds}; // return an object
}

// For time count down and progress bar
function run_clock(endtime){
	function update_clock(){
        // function will start after the play button
        if (begin) {
            var t = time_remaining(endtime); // Create an object name t
            var setTime = time_in_minutes * 60000;
            var angle = (t.total / setTime) * 360;
    
            // Display minutes and seconds
            document.getElementById("minutes").innerHTML = addZero(t.minutes);
            document.getElementById("seconds").innerHTML = addZero(t.seconds);

            // Display remaining time and mode on tab bar
            document.title = `${addZero(t.minutes)}:${addZero(t.seconds)}${timeonTab}`;

            // Display the progress indicator || Use `` instead of ''
            progressBar.style.backgroundImage = `conic-gradient(${secondaryColor} ${angle}deg, ${shadowColor} 0deg)`;

            // If the clock hit 00:00 then do this
            if(t.total <= 0){ 
                clearInterval(timeInterval); 
                document.title = `00:00${timeonTab}`;
                document.getElementById("minutes").innerHTML = "00";
                document.getElementById("seconds").innerHTML = "00";

                // Notify the user that the alarm has ended!
                playSound();

                // Wait for 1 sec before change to another mode
                setTimeout(updatePanelMode, 1000);
            }
        } 
	}

	update_clock(); // run function once at first to avoid delay
	timeInterval = setInterval(update_clock);
}

// Changing the panel mode
function updatePanelMode(){
    if (breakCount % 2 == 0) {

            // breakCount > 0 to avoid the first break
            if (breakCount > 0 && breakCount % 6 == 0) {
                // Start long break
                timeonTab = " | Time for a long break!";
                time_in_minutes = longBreakTime;
                breakCount ++;

                // Change the panel mode
                workTittle.classList.remove("active");
                breakTittle.classList.add("active");
                
                // Run the clock
                current_time = Date.parse(new Date());
                futureTime = new Date(current_time + time_in_minutes * 60000);
                run_clock(futureTime);

            } else {
                // Start short break
                timeonTab = " | Time for a short break!";
                time_in_minutes = shortBreakTime;
                breakCount ++;

                // Change the panel mode
                workTittle.classList.remove("active");
                breakTittle.classList.add("active");
                
                // Run the clock
                current_time = Date.parse(new Date());
                futureTime = new Date(current_time + time_in_minutes * 60000);
                run_clock(futureTime);
                }
        
    } else{
        // continue work
        timeonTab = " | Time for work!";
        time_in_minutes = workTime;
        breakCount ++;

        // Change the panel mode
        breakTittle.classList.remove("active");
        workTittle.classList.add("active");

        // Run the clock
        current_time = Date.parse(new Date());
        futureTime = new Date(current_time + time_in_minutes * 60000);
        run_clock(futureTime);
    }
    
}

// Play sound for every work/break
function playSound(){
    let sound = new Audio("assets/Sound/minecraft-villager-sound-effect.mp3");
    sound.play();
}

// The play/start button
setting.addEventListener("submit", saveChange);

pausebtn.addEventListener("click", () => {
    // The pause button
    document.getElementById('start').style.display = "inline-block";
    document.getElementById('pause').style.display = "none";

    clearInterval(timeInterval); // stop the clock
    time_left = futureTime.getTime() - Date.now();// preserve remaining time

});

startbtn.addEventListener("click", () => {
    document.getElementById('start').style.display = "none";
    document.getElementById('pause').style.display = "inline-block";

    // Update the deadline to preserve the amount of time remaining
    if (!begin) {
        // For the first time clicking the play button
        begin = true;
        current_time = Date.parse(new Date()); //date.parse mean convert that time to milliseconds
        futureTime = new Date(current_time + time_in_minutes * 60000); // its mean that the future time will be the date object that take that sum as milliseconds

        run_clock(futureTime);
    }
    else {
        futureTime = new Date(Date.now() + time_left);

        // Start the clock
        run_clock(futureTime);
    }
});

// Change time/ Local storage for promodo clock
function saveChange(e) {
    e.preventDefault();
    
    // These line checks if the inputted value is valid or not and convert to int if True, otherwise it assigns workTime/shortBreakTime/longBreakTime as the default value
    let promodoVal = promodoInput.value ? parseInt(promodoInput.value) : workTime;
    let shortBreakVal= shortBreakInput.value ? parseInt(shortBreakInput.value) : shortBreakTime;
    let longBreakVal = longBreakInput.value ? parseInt(longBreakInput.value) : longBreakTime;

    // Change the time and the break count
    breakCount = 0;
    workTime = promodoVal;
    shortBreakTime = shortBreakVal;
    longBreakTime = longBreakVal;
    time_in_minutes = workTime;

    // Set everything back to default
    document.getElementById("minutes").innerHTML = addZero(workTime);
    document.getElementById("seconds").innerHTML = "00";

    workTittle.classList.add("active");
    optionsMenu.classList.remove("visible");

    // Reset the clock
    begin = false;
    clearInterval(timeInterval);
    
    // Change the pause button to play button again if changing during its count down
    document.getElementById('start').style.display = "inline-block";
    document.getElementById('pause').style.display = "none";
    progressBar.style.backgroundImage = `conic-gradient(${secondaryColor} 360deg, ${shadowColor} 0deg)`;

    // Change the placeholder for the input field
    promodoInput.placeholder = workTime;
    shortBreakInput.placeholder = shortBreakVal;
    longBreakInput.placeholder = longBreakVal;

    // Reset the input field
    promodoInput.value = '';
    shortBreakInput.value = '';
    longBreakInput.value = '';

    // Overwrite/Edit on local storage about the promodo
    addToPromodoLS("workTime", workTime);
    addToPromodoLS("shortBreakTime", shortBreakTime);
    addToPromodoLS("longBreakTime", longBreakTime);
    
}

// Local storage for promodo clock
function addToPromodoLS(mode, val) {
    let items = getPromodoLS();
    items[mode] = val;
    localStorage.setItem(promodoLSKey, JSON.stringify(items));

}

function getPromodoLS() {
    const data = localStorage.getItem(promodoLSKey);
    if (data) return JSON.parse(data);
    return {};
}



//=======> Setting panel
// Load the promodo time from local storage if there are any
function setupPromodoSetting(){
    // Function to display the promodo data from local storage if they have any
    let modes = getPromodoLS();
    if (Object.keys(modes).length > 0) {
        workTime = parseInt(modes.workTime);
        shortBreakTime = parseInt(modes.shortBreakTime);
        longBreakTime = parseInt(modes.longBreakTime);
        time_in_minutes = workTime;
    }
    else {
        // set the default value
        workTime = 25;
        shortBreakTime = 5;
        longBreakTime = 15;
        time_in_minutes = workTime;
    }

    // Edit the setting input placeholder
    promodoInput.placeholder = workTime;
    shortBreakInput.placeholder = shortBreakTime;
    longBreakInput.placeholder = longBreakTime;
    
    // This event occurs when the entire web page has finished loading
    document.getElementById("minutes").innerHTML = addZero(workTime);
    document.getElementById("seconds").innerHTML = "00";

    workTittle.classList.add("active");
}

// Setting buttons
// Close pop up
closeMenubtn.addEventListener("click", () => {
    var optionsMenu = document.getElementsByClassName("popup")[0];
    optionsMenu.classList.remove("visible");
});

// Option pop up
optionsbtn.addEventListener("click", () => {
    var optionsMenu = document.getElementsByClassName("popup")[0];
    optionsMenu.classList.add("visible");
});

// Close popup when click outside
window.onclick = function(e){
    if (e.target == document.getElementById("optionsMenu")) {
        // Setting popup
        optionsMenu.classList.remove("visible");
    } else if (e.target == document.getElementById("List")) {
        // To-do list popup
        List.classList.remove("visible");
    }
}



//========> To do list pop up
// Todo List buttons

form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);
cancelBtn.addEventListener("click", setBackToDefault);
toDoList.addEventListener("click", () => {
    List.classList.add("visible");
});
closeTDLbtn.addEventListener("click", () => {
    var closeTDLbtn = document.getElementById("List");
    closeTDLbtn.classList.remove("visible");
});

function addItem(e) {
    // To prevent the website to refresh when pressing submit
    e.preventDefault();

    let val = entry.value;
    // For the unique id of each task in the local storage
    let id = new Date().getTime().toString()

    if (val && !editFlag) {
        // if we have something in our input and not in edit mode, create a list
        createLis(val, id);
        displayAlert("A new item has been added!", "alert-success");
        clearBtn.classList.remove('d-none'); // to reveal the clear items button

        // Local storage part
        addtoLS(val, id);

    } else if(val && editFlag){
        //For the edit mode

        // editing the current task need a global value -> editElement and editID from editItems()
        // it will be equal to the current inputted val
        editElement.innerText = val;
        displayAlert("Value changed!", "alert-success");

        //Local storage: edit the item in there
        editLS(val, editID);

        setBackToDefault();

    }else{
        // for the case when the user submit without any value
        displayAlert("Please type something!", "alert-danger");
    }
    // clear entry
    entry.value = null;

}

function createLis(val, id) {
    // create each li|list-item == text value with the buttons inside the id = "todo-list"
    const li = document.createElement('li');
    li.className = "list-item";
    li.setAttribute('data-id', id); // set the unique id for this task|list-item
    li.innerHTML = `
        <p class="text">${val}</p>
        <i class="tdlIcon fa-solid fa-pen-to-square"></i>
        <i class="tdlIcon fa-solid fa-check"></i>
        <i class="tdlIcon fa-solid fa-trash-can"></i>`;

    li.querySelector(".tdlIcon.fa-pen-to-square").addEventListener("click", editItem);
    li.querySelector(".tdlIcon.fa-check").addEventListener("click", checkItem);
    li.querySelector(".tdlIcon.fa-trash-can").addEventListener("click", deleteItem);

    ul.append(li);
}

// The to-do list buttons
//   the keyword 'this' mean the icon itself
function editItem(){
    editFlag = true;
    editID = this.parentElement.dataset.id; // For the editLS()

    // For assigning the local text that need to edit to the global one
    let taskText = this.previousElementSibling;//.text of the task list-item
    editElement = taskText;

    // Text value to the input
    entry.value = this.previousElementSibling.innerText;

    submitBtn.innerText = "Edit";
    cancelBtn.classList.remove('d-none');

    //The code selects all elements with the class name "tdlIcon" within a `ul` element and adds the CSS class "v-none" to hide or visually remove them.
    ul.querySelectorAll(".tdlIcon").forEach(i => {
        i.classList.add("v-none");
    })
    clearBtn.classList.add("d-none");
}

function checkItem(){
    // The same as li.list-item
    this.parentElement.classList.toggle('liChecked');
}

function deleteItem(){
    // The todo-list will remove this child which is the "this" del button parent => remove the list-item that have the clicked delete button.

    // Local storage id
    let id = this.parentElement.dataset.id; // retrieves the value of the "data-id" attribute from the parent element of the current element in the DOM.

    ul.removeChild(this.parentElement);
    displayAlert("one item was removed!", "alert-danger");
    if (ul.children.length === 0) {
        // ul.children mean that ul == todo-list and ul.children are the task that we put in. So we check the length of ul.children to see if there r any task left
        // == allows type coercion during comparison, while === requires both value and type to be equal for a true comparison.
        clearBtn.classList.add('d-none');
    }
    removeFromLS(id);
}

function displayAlert(msg, styles){
    // This function will display the notification after the user do sth inside the to do list
    // It will get add in class="alert" in html
    alertP.innerText = msg; // Only set the text content and not the HTMl tag
    alertP.classList.add(styles);

    setTimeout(() => {
        // This is an arrow function, a concise way to define an anonymous function. It contains the code that will be executed after the delay.
        alertP.innerText = "";
        alertP.classList.remove(styles);
    }, 1500);
} 

function clearItems(){
    // Remove all list-items in the todo-list
    ul.innerHTML = null;
    displayAlert("All items were removed!", "alert-danger");
    clearBtn.classList.add('d-none'); 
    
    //Local storage
    localStorage.setItem(LSkey, JSON.stringify([]));

}

function setBackToDefault(){
    // Set everything back to normal => mainly for edit mode
    editFlag = false;
    editElement = undefined;
    editID = undefined;

    entry.value = null;

    submitBtn.innerText = "Submit";
    cancelBtn.classList.add('d-none');

    ul.querySelectorAll(".tdlIcon").forEach(i => {
        i.classList.remove("v-none");
    })
    clearBtn.classList.remove("d-none");
}

// Local storage for Todo List
function addtoLS(val, id) {
    // It's the object shorthand syntax which mean obj={id: someid, value: somevalue}
    let obj = {id, val};
    let items = getLS() 
    // Items is either an empty array or full of data

    items.push(obj); 

    // Because local storage require the date to be string
    // LSkey is the key to the value - list items that contain obj of todo task
    localStorage.setItem(LSkey, JSON.stringify(items)); 
}

function getLS() {
    // Check if there is any data in the local storage. If yes, return that data. Else, return []
    const data = localStorage.getItem(LSkey);

    if (data) return JSON.parse(data); // convert a string back to an object
    return [];
}

function removeFromLS(id){
    // Get the list items from local storage and remove/filter the item that have the given id. Then overwrite this list again to the local storage
    let items = getLS();
    items = items.filter(item => item.id !== id)

    // Update my LS
    localStorage.setItem(LSkey, JSON.stringify(items));
}

function editLS(val, editID){
    // Get the list items from local storage and map/find the item that have the given id to assign the old value with the edited one. Then overwrite this list again to the local storage.
    let items = getLS();
    items = items.map(item => {
        if(item.id === editID) item.val = val;
        return item;
    })

    // Update my LS
    localStorage.setItem(LSkey, JSON.stringify(items));
}

function setupItems() {
    // Go through each task from to do list local storage and show it to the user when the page load
    let items = getLS()

    if(items.length > 0){
        // If there r data in the local storage 
        items.forEach(item => {
            const {id, val} = item;
            // Extract the val == task's name and id == represent for each task
            createLis(val, id);
        })
        clearBtn.classList.remove("d-none");
    }
}
