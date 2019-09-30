import {getTask} from './data/task.js';
import {getFilters} from './data/filters.js';

import {createSiteMenuTemplate} from './components/site-menu.js';
import {createSearchTemplate} from './components/search.js';
import {createFiltersContainer} from './components/filters-container.js';
import {makeFilter} from './components/filter.js';
import {createSortingTemplate} from './components/sorting.js';
import {createBoardTemplate} from './components/board.js';
import {makeTaskEdit} from './components/task-edit.js';
import {makeTask} from './components/task.js';
import {createLoadMoreButtonTemplate} from './components/load-more-button.js';

const TASK_COUNT = 17;
const TASKS_PER_PAGE = 8;
let page = 0;

const tasks = new Array(TASK_COUNT).fill(``).map(getTask);
const editTask = tasks[0];

const mainLayout = document.querySelector(`.main`);
const headerLayout = mainLayout.querySelector(`.main__control`);

const render = (container, template, place) => container.insertAdjacentHTML(place, template);
const renderLayouts = () => {
  render(headerLayout, createSiteMenuTemplate(), `beforeend`);
  render(mainLayout, createSearchTemplate(), `beforeend`);
  render(mainLayout, createFiltersContainer(), `beforeend`);
  render(mainLayout, createBoardTemplate(), `beforeend`);
};

const initPage = () => {
  renderLayouts();

  const filtersContainer = mainLayout.querySelector(`.filter`);
  const boardElement = mainLayout.querySelector(`.board`);
  const tasksContainer = mainLayout.querySelector(`.board__tasks`);

  const renderTasks = (firstElementIndex) => {
    const getLastTaskIndex = page * TASKS_PER_PAGE + TASKS_PER_PAGE;

    render(tasksContainer, tasks
        .slice(firstElementIndex, getLastTaskIndex)
        .map(makeTask)
        .join(``),
    `beforeend`);
  };

  render(filtersContainer, getFilters(tasks).map(makeFilter).join(``), `beforeend`);
  render(boardElement, createSortingTemplate(), `afterbegin`);
  render(tasksContainer, makeTaskEdit(editTask), `beforeend`);
  renderTasks(1);

  if (TASK_COUNT > TASKS_PER_PAGE) {
    render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);

    const buttonLoadMore = mainLayout.querySelector(`.load-more`);

    buttonLoadMore.addEventListener(`click`, (event) => {
      event.preventDefault();
      page++;

      const currentElement = page * TASKS_PER_PAGE;
      renderTasks(currentElement);

      if (currentElement + TASKS_PER_PAGE >= TASK_COUNT) {
        buttonLoadMore.remove();
      }
    });
  }
};

initPage();
