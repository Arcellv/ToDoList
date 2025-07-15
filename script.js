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
  
      // Toggle completed
      span.addEventListener("click", () => {
        span.classList.toggle("completed");
        saveTasks();
      });
  
      // Delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete";
      deleteBtn.innerHTML = `<img src="icons/delete.svg" alt="Delete" class="delete-icon" />`;
      deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
      });
  
      // Edit button
      const editBtn = document.createElement("button");
      editBtn.className = "edit";
      editBtn.innerHTML = `<img src="icons/edit.svg" alt="Edit" class="edit-icon" />`;
      editBtn.addEventListener("click", () => {
        const newText = prompt("Edit your task:", span.textContent);
        if (newText !== null && newText.trim() !== "") {
          span.textContent = newText.trim();
          saveTasks();
        }
      });
  
      // Group buttons in a wrapper div
      const buttonGroup = document.createElement("div");
      buttonGroup.style.display = "flex";
      buttonGroup.style.gap = "8px";
      buttonGroup.appendChild(editBtn);
      buttonGroup.appendChild(deleteBtn);
  
      li.appendChild(span);
      li.appendChild(buttonGroup);
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
  