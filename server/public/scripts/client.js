console.log('js')
$(onReady);

function onReady() {
    console.log('jQ');
    $('#addBtn').on('click', handleAdd);
    $('#taskList').on('click', '.completeBtn', handleComplete);
    $('#taskList').on('click', '.deleteBtn', handleDelete);
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
            <tr data-id=${task.id}>
                <td>${task.task}</td>
                <td><button class=completeBtn>Complete</button></td>
                <td><button class=deleteBtn>Delete</button></td>
            </tr>
            `)
        } else {
        $('#taskList').append(`
            <tr data-id=${task.id}>
                <td>${task.task}</td>
            <td><span class=completeMarker>Complete!</span></td>
            <td><button class=deleteBtn>Delete</button></td>
            </tr>
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

function handleComplete() {
    const id = $(this).closest('tr').data('id');

    $.ajax({
        method: 'PUT',
        url: `/tasks/${id}`,
    }).then(function(response) {
        console.log(response);
        retrieveTasks();
    }).catch(function(err) {
        console.log('error in PUT', err);
    })
}

function handleDelete() {
    const id = $(this).closest('tr').data('id');

    $.ajax({
        method: 'DELETE',
        url: `/tasks/${id}`
    }).then(function(response) {
        console.log(response);
        retrieveTasks();
    }).catch(function(err) {
        console.log('error in DELETE', err);
    })

}