let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filters = document.querySelectorAll(".filter");

let currentFilter = "all";

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks(){

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if(currentFilter === "active"){
            return !task.completed;
        }

        if(currentFilter === "completed"){
            return task.completed;
        }

        return true;

    });


    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        li.className = "task";

        li.innerHTML = `

        <span class="${task.completed ? "completed" : ""}">
            ${task.text}
        </span>

        <div>

        <button onclick="completeTask(${task.id})">
        ✔
        </button>

        <button onclick="editTask(${task.id})">
        ✏
        </button>

        <button onclick="deleteTask(${task.id})">
        🗑
        </button>

        </div>

        `;

        taskList.appendChild(li);

    });

}


addBtn.addEventListener("click",()=>{

    const text = taskInput.value.trim();

    if(text !== ""){

        tasks.push({

            id:Date.now(),

            text:text,

            completed:false

        });


        saveTasks();

        displayTasks();

        taskInput.value="";

    }

});



function completeTask(id){

    tasks = tasks.map(task=>{

        if(task.id === id){

            task.completed = !task.completed;

        }

        return task;

    });


    saveTasks();

    displayTasks();

}



function editTask(id){

    const task = tasks.find(task=>task.id===id);

    const newText = prompt(
        "Edit task:",
        task.text
    );


    if(newText){

        task.text = newText;

        saveTasks();

        displayTasks();

    }

}



function deleteTask(id){

    tasks = tasks.filter(
        task=>task.id!==id
    );


    saveTasks();

    displayTasks();

}



filters.forEach(button=>{

    button.addEventListener("click",()=>{

        filters.forEach(btn=>
            btn.classList.remove("active")
        );


        button.classList.add("active");


        currentFilter =
        button.dataset.filter;


        displayTasks();

    });

});


displayTasks();
