document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const filterButtons = document.querySelectorAll('.filters .bauhaus-btn');
    
    // Load tasks from sessionStorage instead of localStorage
    let tasks = JSON.parse(sessionStorage.getItem('tasks')) || [];
    let currentFilter = 'all';
    
    // Render tasks based on current filter
    function renderTasks() {
        taskList.innerHTML = '';
        
        const filteredTasks = tasks.filter(task => {
            if (currentFilter === 'all') return true;
            if (currentFilter === 'active') return !task.completed;
            if (currentFilter === 'completed') return task.completed;
            return true;
        });
        
        filteredTasks.forEach((task) => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            
            taskItem.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
                <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                <div class="task-actions">
                    <button class="edit-btn" data-id="${task.id}">EDIT</button>
                    <button class="delete-btn" data-id="${task.id}">DELETE</button>
                </div>
            `;
            
            taskList.appendChild(taskItem);
        });
        
        // Add event listeners to new elements
        document.querySelectorAll('.task-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', toggleTask);
        });
        
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', editTask);
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', deleteTask);
        });
    }
    
    // Add new task
    function addTask() {
        const text = taskInput.value.trim();
        if (text === '') return;
        
        const newTask = {
            id: Date.now(),
            text,
            completed: false
        };
        
        tasks.push(newTask);
        saveTasks();
        taskInput.value = '';
        renderTasks();
    }
    
    // Toggle task completion status
    function toggleTask(e) {
        const taskId = parseInt(e.target.getAttribute('data-id'));
        const task = tasks.find(task => task.id === taskId);
        
        if (task) {
            task.completed = e.target.checked;
            saveTasks();
            renderTasks();
        }
    }
    
    // Edit task
    function editTask(e) {
        const taskId = parseInt(e.target.getAttribute('data-id'));
        const task = tasks.find(task => task.id === taskId);
        
        if (task) {
            const newText = prompt('Edit your task:', task.text);
            if (newText !== null && newText.trim() !== '') {
                task.text = newText.trim();
                saveTasks();
                renderTasks();
            }
        }
    }
    
    // Delete task
    function deleteTask(e) {
        const taskId = parseInt(e.target.getAttribute('data-id'));
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        renderTasks();
    }
    
    // Save tasks to sessionStorage instead of localStorage
    function saveTasks() {
        sessionStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Filter tasks
    function setFilter(e) {
        currentFilter = e.target.getAttribute('data-filter');
        
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        e.target.classList.add('active');
        renderTasks();
    }
    
    // Event listeners
    addTaskBtn.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', setFilter);
    });
    
    // Initial render
    renderTasks();
});