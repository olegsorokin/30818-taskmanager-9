import {createSiteMenuTemplate} from './components/site-menu.js';
import {createSearchTemplate} from './components/search.js';
import {createSortingTemplate} from './components/sorting.js';
import {createFiltersContainer} from './components/filters-container.js';
import {getFilters} from './data/filters.js';
import {makeFilter} from './components/filter.js';
import {createBoardTemplate} from './components/board.js';
import {getTask} from './data/task.js';
import {makeTask} from './components/task.js';
import {makeTaskEdit} from './components/task-edit.js';
import {createLoadMoreButtonTemplate} from './components/load-more-button.js';

const TASK_COUNT = 17;
const TASK_PER_LOAD = 8;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const render = (container, template, place) => container.insertAdjacentHTML(place, template);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createSearchTemplate(), `beforeend`);
render(siteMainElement, createFiltersContainer(), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.board`);
const tasksContainer = document.querySelector(`.board__tasks`);
const filtersContainer = document.querySelector(`.filter`);
const taskList = new Array(TASK_COUNT).fill(``).map(getTask);

const renderTasks = (container, task, tasks) => {
  container.insertAdjacentHTML(`beforeend`, tasks.map(task).join(``));
};

render(boardElement, createSortingTemplate(), `afterbegin`);

let loadCounter = 0;
let taskPackLength = (value) => value * TASK_PER_LOAD + TASK_PER_LOAD;

render(filtersContainer, getFilters(taskList).map(makeFilter).join(``), `beforeend`);
render(tasksContainer, [taskList[0]].map(makeTaskEdit).join(``), `beforeend`);

if (TASK_COUNT <= TASK_PER_LOAD) {
  render(tasksContainer, taskList.slice(1, taskList.length).map(makeTask).join(``), `beforeend`);
} else {
  render(tasksContainer, taskList.slice(1, taskPackLength(loadCounter)).map(makeTask).join(``), `beforeend`);
  render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);

  const buttonLoadMore = siteMainElement.querySelector(`.load-more`);

  buttonLoadMore.addEventListener(`click`, () => {
    loadCounter = loadCounter + 1;

    const firstElementIndex = loadCounter * TASK_PER_LOAD;
    let lastElementIndex = taskPackLength(loadCounter);

    if (taskPackLength(loadCounter) >= TASK_COUNT) {
      lastElementIndex = loadCounter * TASK_PER_LOAD + TASK_COUNT % TASK_PER_LOAD;
      buttonLoadMore.parentNode.removeChild(buttonLoadMore);
    }

    renderTasks(tasksContainer, makeTask, taskList.slice(firstElementIndex, lastElementIndex));
  });
}
