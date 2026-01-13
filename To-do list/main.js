
const q = (sel) => document.querySelector(sel);
const STORAGE_KEY = 'todo_list_v1';

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}


const app = q('#app');

const wrapper = document.createElement('div');
wrapper.classList.add(...'max-w-xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow'.split(' '));

const title = document.createElement('h1');
title.textContent = 'My To-Do';
title.classList.add(...'text-2xl font-semibold mb-4 text-slate-800'.split(' '));

const inputRow = document.createElement('div');
inputRow.classList.add(...'flex items-center mb-4'.split(' '));

const input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Enter a task';
input.classList.add(...'flex-1 border border-slate-300 rounded-xl px-4 py-2 outline-none focus:ring focus:ring-slate-200'.split(' '));

const addBtn = document.createElement('button');
addBtn.type = 'button';
addBtn.textContent = 'Add Task';
addBtn.classList.add(...'ml-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 active:scale-[.99] transition'.split(' '));

inputRow.appendChild(input);
inputRow.appendChild(addBtn);

const list = document.createElement('ul');
list.classList.add(...'space-y-2'.split(' '));


wrapper.appendChild(title);
wrapper.appendChild(inputRow);
wrapper.appendChild(list);
app.appendChild(wrapper);


function createTaskElement(task, index, tasks) {
  const li = document.createElement('li');
  li.classList.add(...'flex items-center justify-between px-4 py-2 bg-slate-50 rounded-xl border border-slate-200'.split(' '));

  const textSpan = document.createElement('span');
  textSpan.textContent = task.text;
  textSpan.classList.add(...'text-slate-700'.split(' '));
  if (task.completed) {
    textSpan.classList.add(...'line-through opacity-60'.split(' '));
  }

 
  textSpan.addEventListener('click', () => {
    task.completed = !task.completed;
    if (task.completed) {
      textSpan.classList.add(...'line-through opacity-60'.split(' '));
    } else {
      textSpan.classList.remove('line-through', 'opacity-60');
    }
    saveTasks(tasks);
  });

 
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.classList.add(...'text-sm px-2 py-1 rounded-lg bg-rose-500 text-white hover:bg-rose-600'.split(' '));
  removeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks(tasks);
  });

  
  const left = document.createElement('div');
  left.classList.add(...'flex items-center gap-3'.split(' '));
  left.appendChild(textSpan);

  li.appendChild(left);
  li.appendChild(removeBtn);

  return li;
}

function renderTasks(tasks) {
  list.innerHTML = '';
  tasks.forEach((task, idx) => {
    const li = createTaskElement(task, idx, tasks);
    list.appendChild(li);
  });
}


function addTask() {
  const text = input.value.trim();
  if (!text) {
    alert('Please enter a task.');
    return;
  }
  const tasks = loadTasks();
  tasks.push({ text, completed: false });
  saveTasks(tasks);
  renderTasks(tasks);
  input.value = '';
  input.focus();
}


input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

addBtn.addEventListener('click', addTask);



renderTasks(loadTasks());
