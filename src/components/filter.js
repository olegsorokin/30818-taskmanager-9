export const makeFilter = ({title, count}) => `<input
  type="radio"
  id="filter__${title.toLowerCase()}"
  class="filter__input visually-hidden"
  name="filter"
  ${title.toLowerCase() === `all` ? `checked` : ``}
  ${count === 0 ? `disabled` : ``}
/>
<label for="filter__${title.toLowerCase()}" class="filter__label">
  ${title} <span class="filter__all-count">${count}</span></label
>`.trim();
