const getTags = () => {
  const MAX_TAGS = 3;
  const tags = new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
  ]);

  return new Set(
      [
        ...(new Array(Math.round(Math.random() * MAX_TAGS))
          .fill(``)
          .map(() => [...tags][Math.floor(Math.random() * tags.size)]))
      ]
  );
};

export const getTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  tags: getTags(),
  repeatingDays: {
    'mo': false,
    'tu': false,
    'we': Boolean(Math.round(Math.random())),
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ][Math.floor(Math.random() * 5)],
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random())),
});
