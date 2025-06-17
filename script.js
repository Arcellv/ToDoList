document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
  
    // Load tasks from localStorage
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => addTaskToDOM(task.text, task.completed));
  
    addTaskBtn.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        addTaskToDOM(taskText);
        saveTasks();
        taskInput.value = "";
      }
    });
  
    function addTaskToDOM(text, completed = false) {
      const li = document.createElement("li");
  
      const span = document.createElement("span");
      span.textContent = text;
      if (completed) span.classList.add("completed");
  
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete";
      deleteBtn.innerHTML = `<img src="icons/delete.svg" alt="Delete" class="delete-icon" />`;
  
      // Toggle completed
      span.addEventListener("click", () => {
        span.classList.toggle("completed");
        saveTasks();
      });
  
      // Delete task
      deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
      });
  
      li.appendChild(span);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    }
  
    function saveTasks() {
      const tasks = [];
      taskList.querySelectorAll("li").forEach(li => {
        tasks.push({
          text: li.querySelector("span").textContent,
          completed: li.querySelector("span").classList.contains("completed")
        });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });
  