const TASK_ARRAY = "TASK_ARRAY";
// localStorage.clear();

//output: task array
const loadData = () => {
  let data = JSON.parse(localStorage.getItem(TASK_ARRAY));
  data = data ? data : [];
  return data;
};
//input: task array
const saveData = (data) =>
  localStorage.setItem(TASK_ARRAY, JSON.stringify(data));

//input: task
const addTask = (new_task) => {
  let data = loadData();
  data.push(new_task);
  saveData(data);
};
//input: element task, is completed, index
const createTaskItem = (task, is_completed, index) => {
  return ` <li class="task-item" is-completed = ${is_completed} task-index = ${index}>
<span onclick="markCompletedTask(${index})">${task}</span>
<div id="task-action">
  <button class="btn-edit" onclick="pushEditTask(${index})">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="{1.5}"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
      />
    </svg>
  </button>
  <button class="btn-delete" onclick="deleteTask(this,${index})">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  </button>
</div>
</li>`;
};
const renderTasksHTML = () => {
  let data, tasksHTML, ulElement, count, num_completed_task;
  data = loadData();
  count = 0;
  tasksHTML = data.map((element, index) => {
    if (element.is_completed) count++;

    return createTaskItem(element.task, element.is_completed, index);
  });

  ulElement = document.getElementById("task-list");
  ulElement.innerHTML = tasksHTML.join("");
  num_completed_task = document.getElementById("num-completed-task");
  num_completed_task.innerText =
    count > 0 ? `Yeah, ${count} tasks completed!` : "";
};
//input: index of element in task array
const markCompletedTask = (index) => {
  let data;
  data = loadData();

  data[index].is_completed = data[index].is_completed ? false : true;
  saveData(data);
  renderTasksHTML();
};
//input: index of task,
const deleteTask = (element, index) => {
  console.log(element);
  let confirm_delete = confirm("Task bị xóa sẽ không thể khôi phục.");
  if (!confirm_delete) {
    return false;
  }

  let data;
  data = loadData();
  data.splice(index, 1);
  saveData(data);
  // element.closest("li.task-item").remove();
  renderTasksHTML();
};
//input: task
const pushEditTask = (index) => {
  let data, task, btn_edit;
  data = loadData();
  task = document.getElementById("task");
  task.value = data[index].task;
  task.setAttribute("index", index);
  task.focus();
  btn_add_task = document.querySelector("form#add_task #btn-add-task");
  btn_add_task.innerText = "EDIT TASK";
};
//input: update task, index
const editTask = (update_task, index) => {
  let data, btn_add_task;
  btn_add_task = document.getElementById("btn-add-task");
  data = loadData();
  data[index].task = update_task;
  btn_add_task.innerText = "ADD TASK";
  saveData(data);
};

renderTasksHTML();

const formAddTask = document.forms.add_task;
formAddTask.addEventListener("submit", (e) => {
  e.preventDefault();
  let task, new_task, index;
  task = document.getElementById("task");
  index = task.getAttribute("index");

  if (task.value.length < 2) {
    alert("Nội dung phải có nhiều hơn 2 kí tự");
    return false;
  }

  if (index) {
    editTask(task.value, index);
    task.removeAttribute("index");
  } else {
    new_task = {
      task: task.value,
      is_completed: false,
    };
    addTask(new_task);
  }

  task.value = "";

  renderTasksHTML();
});
document.addEventListener("keyup", (e) => {
  let task = document.getElementById("task");

  if (e.which == 27) {
    task.value = "";
    task.removeAttribute("index");
    const btn_add_task = document.getElementById("btn-add-task");

    btn_add_task.innerText = "ADD TASK";
  }
  // console.log(e.which);
});
