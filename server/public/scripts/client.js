console.log('js')
$(onReady);

function onReady() {
    console.log('jQ');
    $('#addBtn').on('click', handleAdd);
    // $('#taskList').on('click', '.completeBtn', handleComplete);
    // $('#taskList').on('click', '.deleteBtn', handleDelete);
    retrieveTasks();
}

function retrieveTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function(response) {
        console.log('task list retrieved:')
        console.log(response);
        publishTasks(response);
    }).catch(function(err) {
        console.log('error in GET', err)
    })
}

function publishTasks(tasks) {
    $('#taskList').empty();
    for (let task of tasks) {
        if (task.complete === false) {
        $('#taskList').append(`
            <tr id=${task.id}>
                <td>${task.task}</td>
                <td><button class=completeBtn>Complete</button></td>
                <td><button class=deleteBtn>Delete</button></td>
            </tr>
            `)
        } else {
        $('#taskList').append(`
            <tr id=${task.id}>
                <td>${task.name}</td>
            </tr>
            <td><button class=deleteBtn>Delete</button></td>
            `)
        }
    }
}

function handleAdd() {
    console.log('add submitted');
    newTask = $('#taskIn').val();
    console.log(newTask);
    addTask(newTask);
}

function addTask(newTask) {
    $.ajax({
        method: 'POST',
        url: `/tasks`,
        data: {
            task: newTask
        }
    }).then(function(response) {
        console.log(response);
        retrieveTasks();
    }).catch(function(err) {
        console.log('error in POST', err);
    })
}