fetch("data.json")
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].completed == "false") {
                addTask(data[i].name, document.getElementById('task-complete'), 1);
                // console.log(document.getElementById("task-complete").lastChild);
                document.getElementById("task-complete").lastChild.querySelector(".mark-complete").checked = true;
                console.log(document.getElementById("task-complete").lastChild.querySelector(".mark-complete").setAttribute("checked", "true"));
                document.getElementById("task-complete").lastChild.querySelector(".task-item").style.textDecoration = "line-through";
            }
            else {
                addTask(data[i].name, document.getElementById('task-list'), 1);
            }

        }
    })
    .catch(error => console.log(error));
// function update JSON file when task is deleted or added
const updateJSON = (task, completed) => {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            data.push({
                "name": task,
                "completed": completed
            });
            fetch("data.json", {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
}


const isEmpty = str => !str.trim().length;
const btnAdd = document.getElementById("btn-add-task");
const taskItem = document.getElementById("task-item");
document.getElementById("task").addEventListener("input", function () {
    if (isEmpty(this.value)) {
        btnAdd.classList.add("disabled");
    } else {
        btnAdd.classList.remove("disabled");
    }
});
const updatePenIcon = () => {
    for (let i = 0; i < document.getElementsByClassName("pen-icon").length; i++) {
        console.log(i);
        document.getElementsByClassName("pen-icon")[i].addEventListener("click", function () {
            this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".task-item").disabled = false;
            this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".task-item").focus();
        });
    }
}
const deleteTask = () => {
    for (let i = 0; i < document.getElementsByClassName("recycle-bin-icon").length; i++) {
        document.getElementsByClassName("recycle-bin-icon")[i].addEventListener("click", function () {
            this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
        });
    }
};
const markComplete = () => {
    for (let i = 0; i < document.getElementsByClassName("mark-complete").length; i++) {
        document.getElementsByClassName("mark-complete")[i].addEventListener("click", function () {
            if (this.checked) {
                this.parentElement.parentElement.parentElement.parentElement.querySelector(".task-item").style.textDecoration = "line-through";
                document.getElementById("task-complete").appendChild(this.parentElement.parentElement.parentElement.parentElement);
                console.log(this.parentElement.parentElement.parentElement.parentElement);
            } else {
                this.parentElement.parentElement.parentElement.parentElement.querySelector(".task-item").style.textDecoration = "none";
                document.getElementById("task-list").appendChild(this.parentElement.parentElement.parentElement.parentElement);
            }
        });
    }
};
updatePenIcon();
deleteTask();
markComplete();
const addTask = (task, list, auto) => {
    console.log(task);
    if (!btnAdd.classList.contains("disabled") || auto != 0) {
        list.innerHTML += `<div class="task-item-box">
                                    <div class="row">
                                        <div class="col-md-1">
                                            <div class="wrapper-checkbox">
                                                <input type="checkbox" class="mark-complete" >
                                            </div>
                                        </div>
                                        <div class="col-md-11 pl-0">
                                            <div class="row">
                                                <div class="col-md-10">
                                                    <input type="text" name="" class="task-item" disabled
                                                        value="${task}">
                                                </div>
                                                <div class="col-md-2">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <div class="pen-icon">
                                                                <i class="fas fa-pencil-alt"></i>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="recycle-bin-icon">
                                                                <i class="fas fa-trash-alt"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
        document.getElementById("task").value = "";
        btnAdd.classList.add("disabled");
        updatePenIcon();
        deleteTask();
        markComplete();
        if (auto == 0) {
            updateJSON(task, "true");
        }
    }
};
const addCompletedTask = (task, auto) => {

};


btnAdd.addEventListener("click", () => addTask(document.getElementById("task").value, document.getElementById('task-list'), 0));

// Execute a function when the user presses a key on the keyboard
document.getElementById("task").addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        btnAdd.click()
    }
});



$(document).ready(function () {
    $('.task-item').is(':focus', function () {
        console.log("focus");
    });
});

// save data to csv file

const saveData = () => {
    var csv = 'Task, Completed\r';
    var task = document.getElementsByClassName("task-item");
    var completed = document.getElementsByClassName("mark-complete");
    for (var i = 0; i < task.length; i++) {
        csv += task[i].value + "," + completed[i].checked + "\r";
    }
    // update csv file
    var blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"

    });
    var link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);



};
// saveData();