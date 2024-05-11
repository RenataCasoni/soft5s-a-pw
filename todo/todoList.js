const todoForm = document.getElementById('todo-form');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const todoList = document.getElementById('todo-list');

document.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToList(task.title, task.description));
});

todoForm.addEventListener('submit', event => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();

  if (title === '' || description === '') return;

  addTaskToList(title, description);
  saveTask(title, description);
  clearInputs();
});

function addTaskToList(title, description) {
  const li = document.createElement('li');
  const pTitle = document.createElement('p');
  const pDescription = document.createElement('p');

  pTitle.textContent = title;
  pTitle.classList.add('titulo'); 
  pDescription.textContent = description;

  li.appendChild(pTitle);
  li.appendChild(pDescription);
  todoList.appendChild(li);
}
function saveTask(title, description) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ title, description });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearInputs() {
  titleInput.value = '';
  descriptionInput.value = '';
}

//contador de visitas

const lsVisistorsKey = '@visitorsCounter'

const defaultLsVisitors = {
  count: 0,
  lastVisit: getCurrentDateAndTime(),
}

function getCurrentDateAndTime() {
  const locale = 'pt-BR'
  const date = new Date()

  options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }

  const time = new Intl.DateTimeFormat(locale, options).format(date)
  return time
}

function countVisitors() {
  const lsVisitors =
    localStorage.getItem(lsVisistorsKey) || JSON.stringify(defaultLsVisitors)
  const lsVisitorsObj = JSON.parse(lsVisitors)

  lsVisitorsObj.count++
  lsVisitorsObj.lastVisit = getCurrentDateAndTime()

  localStorage.setItem(lsVisistorsKey, JSON.stringify(lsVisitorsObj))

  const p = document.createElement('p')
  p.id = 'visitors-counter'
  p.textContent = `Esta página foi visitada ${lsVisitorsObj.count} vezes. A última visita foi: ${lsVisitorsObj.lastVisit}`

  const footer = document.querySelector('footer')

  footer.appendChild(p)
}

document.addEventListener('DOMContentLoaded', function () {
  countVisitors()
})

