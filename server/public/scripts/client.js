console.log('js')
$(onReady);

function onReady() { // Click listeners and initial GET function call
    console.log('jQ');
    $('#addBtn').on('click', handleAdd);
    $('#taskList').on('click', '.completeBtn', handleComplete);
    $('#taskList').on('click', '.deleteBtn', handleDelete);
    retrieveTasks();
}

function retrieveTasks() { // Retrieve tasks from database
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function(response) {
        console.log('task list retrieved:')
        console.log(response);
        publishTasks(response); // Call tasklist DOM write function
    }).catch(function(err) {
        console.log('client GET error', err)
    })
}

function publishTasks(tasks) { // Write task list to DOM
    $('#taskList').empty();
    for (let task of tasks) {
        if (task.complete === false) {
        $('#taskList').append(`
            <tr class="incomplete" data-id=${task.id}>
                <td>${task.task}</td>
                <td><button class=completeBtn>Complete</button></td>
                <td></td>
                <td><button class=deleteBtn>Delete</button></td>
            </tr>
            `)
        } else { // Prescribe alternate appearance for completed tasks
        $('#taskList').append(`
            <tr class="complete" data-id=${task.id}>
                <td>${task.task}</td>
            <td><span class=completeMarker>Complete!</span></td>
            <td>Completed: </td>
            <td><button class=deleteBtn>Delete</button></td>
            </tr>
            `)
        }
    }
}

function handleAdd() { // Package add request for transit to server
    console.log('add submitted');
    newTask = $('#taskIn').val();
    console.log(newTask);
    if (newTask.length < 1) {
        alert('Please enter a task.');
        return;
    } else {
    console.log(newTask);
    addTask(newTask);
    $('#taskIn').val('');
    }
}

function addTask(newTask) { // Submit task add package to server
    console.log('sending add');
    $.ajax({
        method: 'POST',
        url: `/tasks`,
        data: {
            task: newTask
        }
    }).then(function(response) {
        console.log(response);
        retrieveTasks(); // Rewrite task list to DOM - new task appears upon success
    }).catch(function(err) {
        console.log('client POST error', err);
    })
}

function handleComplete() { // Submit request to server to mark task complete
    const id = $(this).closest('tr').data('id');
    const timeComplete = new Date;
    console.log(id);
    $.ajax({
        method: 'PUT',
        url: `/tasks/${id}`,
    }).then(function(response) {
        console.log(response);
        handleTimeComplete(timeComplete);
    }).catch(function(err) {
        console.log('client PUT error', err);
    })
}

function handleTimeComplete(time) {
    console.log('in handleTimeComplete', time);
    const id = $(this).closest('tr').data('id');
    $.ajax({
        method: 'PUT',
        url: `/tasks/${id}`,
        data: {
            time: time
        }
    }).then(function(response) {
        console.log(response);
        retrieveTasks(); // Task auto-updates to 'complete' on DOM
    }).catch(function(err) {
        console.log('client PUT error', err);
    })
}

function handleDelete() { // Submit request to server to delete task from list
    const id = $(this).closest('tr').data('id');

    if ($(this).closest('tr').attr('class') == 'incomplete') { // Requires user confirmation to delete incomplete tasks
        if (confirm("This task has not been completed. Do you really want to delete it?")) {

            $.ajax({
                method: 'DELETE',
                url: `/tasks/${id}`
            }).then(function(response) {
                console.log(response);
                retrieveTasks(); // Task removed from DOM
            }).catch(function(err) {
                console.log('client DELETE error', err);
            })
        } else {
            console.log('delete aborted by user');
            return;
        }
    } else {
        $.ajax({
            method: 'DELETE',
            url: `/tasks/${id}`
        }).then(function(response) {
            console.log(response);
            retrieveTasks(); // Task removed from DOM
        }).catch(function(err) {
            console.log('client DELETE error', err);
        })
    }
}