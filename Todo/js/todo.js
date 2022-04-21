let todoServiceUrl = "https://localhost:7282/api/todo";

let todoEl = document.getElementById("items");


document.getElementById("task-submit").addEventListener("click", async() => {
    // get the new task's values then submit	(post)
    // <input type="text" id="task-name" />
    // <input type="checkbox" id="task-complete" />

    let taskNameEl = document.getElementById("task-name");
    let taskCompleteEl = document.getElementById("task-complete");

    let taskName = taskNameEl.value;
    let taskComplete = taskCompleteEl.checked;


    if (taskName.trim() != '') {

        let newTask = { task: taskName, isComplete: taskComplete };
        //console.log(newTask);


        let newTodoData = await fetch(todoServiceUrl, {
            cache: 'no-cache',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(newTask)
        });

        //todoEl.innerHTML += `<li class="complete${newTask.isComplete}">${newTask.task}</li>`;
        getTodos();
        taskNameEl.value = "";

    }



});


let getTodos = async function() {

    let todoData = await (await fetch(todoServiceUrl, {
        cache: 'no-cache',
        method: 'GET'
    })).json();


    let html = "<ol>";
    for (let i = 0; i < todoData.length; i++) {
        html += `<li class="complete${todoData[i].isComplete}">${todoData[i].task}</li>`;
    }
    html += "</ol>";

    todoEl.innerHTML = html;

}


getTodos();