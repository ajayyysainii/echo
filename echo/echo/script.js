const list = document.getElementsByClassName("list")[0];
const newReminder = document.getElementById("newReminder");

// Create reminder function 
function createReminder(id, message) {
    // Error handling
    if (message && message.length > 25) {
        alert("We only support 25 characters");
        return;
    } else if (!message) {
        alert("Please enter a Reminder");
        return;
    }

    const li = document.createElement("li");
    li.id = id;
    li.className = "reminder";
    const div = document.createElement("div");
    div.className = "text";
    div.innerText = message;

    // Actions container
    const actionContainer = document.createElement("div");
    actionContainer.className = "actions"

    // Have the check and delete buttons
    const checkBtn = document.createElement("button");
    checkBtn.className = "btn-check";
    checkBtn.innerText = "Checked";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-delete";
    deleteBtn.innerText = "Delete";

    const modifyBtn = document.createElement("button");
    modifyBtn.className = "btn-modify";
    modifyBtn.innerText = "Modify";

    // Events handler functions
    checkBtn.addEventListener("click", function () {
        if (li.id == id) {
            div.style.textDecoration = "line-through";
        }
    });

    deleteBtn.addEventListener("click", function () {
        if (li.id == id) {
            list.removeChild(li);
        }
    });

    modifyBtn.addEventListener("click", function () {
        let input = prompt("Enter modified reminder: ");
        div.innerText = input;
    });

    // Append the button for actions
    actionContainer.appendChild(checkBtn);
    actionContainer.appendChild(deleteBtn);
    actionContainer.appendChild(modifyBtn);
    // Append all the elements in Li
    li.appendChild(div);
    li.appendChild(actionContainer);

    return li;
}

newReminder.addEventListener("click", function () {
    let message = prompt("Please enter a Reminder");
    let id = Math.floor(Math.random() * 100);
    let reminder = createReminder(id, message);
    list.appendChild(reminder);
});




// alarm reminder
var alarmSound = new Audio();
alarmSound.src = 'alarm2.mp3';
var alarmTimer;

function setAlarm(button) {
    var ms = document.getElementById('alarmTime').valueAsNumber;
    if (isNaN(ms)) {
        alert('Invalid Date');
        return;
    }

    var alarm = new Date(ms);
    var alarmTime = new Date(alarm.getUTCFullYear(), alarm.getUTCMonth(), alarm.getUTCDate(), alarm.getUTCHours(), alarm.getUTCMinutes(), alarm.getUTCSeconds());

    var differenceInMs = alarmTime.getTime() - (new Date()).getTime();

    if (differenceInMs < 0) {
        alert('Specified time is already passed');
        return;
    }

    alarmTimer = setTimeout(initAlarm, differenceInMs);
    button.innerText = 'Cancel Alarm';
    button.setAttribute('onclick', 'cancelAlarm(this);');
};

function cancelAlarm(button) {
    clearTimeout(alarmTimer);
    button.innerText = 'Set Reminder';
    button.setAttribute('onclick', 'setAlarm(this);')
};

function initAlarm() {
    alarmSound.play();
    document.getElementById('alarmOptions').style.display = '';
};

function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    document.getElementById('alarmOptions').style.display = 'none';
    cancelAlarm(document.getElementById('alarmButton'));
};

function snooze() {
    stopAlarm();
    alarmTimer = setTimeout(initAlarm, 300000); // 5 * 60 * 1000 = 5 Minutes
};
