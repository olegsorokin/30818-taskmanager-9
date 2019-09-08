import {createSiteMenuTemplate} from './components/site-menu.js';
import {createSearchTemplate} from './components/search.js';
import {createFilterTemplate} from './components/filter.js';
import {createTaskTemplate} from './components/task.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createLoadMoreButtonTemplate} from './components/load-more-button.js';
import {createBoardTemplate} from './components/board.js';
import {createSortingTemplate} from './components/sorting.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createSearchTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);

render(boardElement, createSortingTemplate(), `afterbegin`);
render(taskListElement, createTaskEditTemplate(), `beforeend`);

new Array(3).fill(``).forEach(() => render(taskListElement, createTaskTemplate(), `beforeend`));

render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);
