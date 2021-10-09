import { view } from './view.js';

export const controller = {
  start() {
    this.setListeners();
  },

  setListeners() {
    view.todo.addEventListener('click', this.onClick);
    document.addEventListener('keydown', this.onKeydown);
  },

  onClick(event) {
    let elem = event.target.closest('button[data-action]');
    let action = elem?.dataset.action;

    if (action) {
      view[action](event);
    }
  },

  onKeydown({ code }) {
    if (code == 'Enter') {
      view.createItem();
    }
  }
};
