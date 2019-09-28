const startToday = new Date().setHours(0, 0, 0, 0);
const endToday = new Date().setHours(23, 59, 59, 999);

const getCountAll = (tasks) => tasks.length;
const getCountOverdue = (tasks) => tasks.reduce((acc, item) => item.dueDate < startToday ? ++acc : acc, 0);
const getCountToday = (tasks) => tasks.reduce((acc, item) => item.dueDate > startToday && item.dueDate < endToday ? ++acc : acc, 0);
const getCountFavorites = (tasks) => tasks.reduce((acc, item) => item.isFavorite ? ++acc : acc, 0);
const getCountRepeating = (tasks) => {
  return tasks.reduce((acc, item) => Object.keys(item.repeatingDays).some((day) => item.repeatingDays[day]) ? ++acc : acc, 0);
};
const getCountTags = (tasks) => tasks.reduce((acc, item) => item.tags.size ? ++acc : acc, 0);
const getCountArchive = (tasks) => tasks.reduce((acc, item) => item.isArchive ? ++acc : acc, 0);

export const getFilters = (tasks) => ([
  {
    title: `All`,
    count: getCountAll(tasks)
  },
  {
    title: `Overdue`,
    count: getCountOverdue(tasks)
  },
  {
    title: `Today`,
    count: getCountToday(tasks)
  },
  {
    title: `Favorites`,
    count: getCountFavorites(tasks)
  },
  {
    title: `Repeating`,
    count: getCountRepeating(tasks)
  },
  {
    title: `Tags`,
    count: getCountTags(tasks)
  },
  {
    title: `Archive`,
    count: getCountArchive(tasks)
  },
]);
