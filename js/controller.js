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
    view.list.addEventListener('change', this.onChange);
  },

  onClick({ target }) {
    let elem = target.closest('button[data-action]');
    let action = elem?.dataset.action;

    if (action) {
      view[action](target);
    }
  },

  onKeydown({ code }) {
    if (code === 'Enter') {
      view.createItem();
    }
  },

  onChange({ target }) {
    view.makeItemDone.call(view, target);
  },

  debounce(f) {
    let isCooldown = false;
    let cooldown = view.animationTime;

    return function () {
      if (isCooldown) return;
      f.apply(this, arguments);
      isCooldown = true;
      setTimeout(() => (isCooldown = false), cooldown);
    };
  }
};
