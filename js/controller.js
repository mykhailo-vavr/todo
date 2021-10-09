import { view } from './view.js';

export const controller = {
  start() {
    this.setListeners();
  },

  setListeners() {
    view.list.addEventListener('click', this.onClick);
    view.footer.addEventListener(
      'click',
      this.debounce(this.onClick)
    );
    document.addEventListener('keydown', this.onKeydown);
  },

  onClick(event) {
    let elem = event.target.closest('button[data-action]');
    let action = elem?.dataset.action;

    if (action) {
      view[action](event.target);
    }
  },

  debounce(f) {
    let isCooldown = false;
    let cooldown = 900;

    return function () {
      if (isCooldown) return;
      f.apply(this, arguments);
      isCooldown = true;
      setTimeout(() => (isCooldown = false), cooldown);
    };
  },

  onKeydown({ code }) {
    if (code == 'Enter') {
      view.createItem();
    }
  }
};
