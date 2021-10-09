export const view = {
  todo: document.querySelector('.todo'),
  list: document.querySelector('.todo-list'),
  input: document.querySelector('.add-input'),
  footer: document.querySelector('.todo-footer'),
  progressBarText: document.querySelector('.bar-text'),
  progressBarFiller: document.querySelector('.bar-filler'),

  createItem() {
    let text = this.getText();
    if (!text) {
      this.remindAboutText();
      return;
    }

    const itemHtml = `
    <li class="todo-list-item">
      <div class="todo-list-item-container">
        <input type="checkbox" class="todo-checker" />
        <span class="todo-text">${text}</span>
      </div>
      <button class="remove-button" data-action="removeItem">
        <i class="fas fa-trash-alt"></i>
      </button>
    </li>`;

    this.list.insertAdjacentHTML('afterbegin', itemHtml);
    let checkbox = document.querySelector('.todo-checker');
    checkbox.addEventListener('change', this.makeItemDone.bind(this));
    this.changeProgressBar();
    this.clearText();
  },

  makeItemDone({ target }) {
    let item = target.closest('.todo-list-item');
    let text = item.querySelector('.todo-text');
    text.classList.toggle('done-text');
    this.changeProgressBar();
  },

  changeProgressBar() {
    let countOfTasks =
      document.querySelectorAll('.todo-list-item').length;
    let countOfDoneTasks =
      document.querySelectorAll('.done-text').length;
    this.changeBarText(countOfTasks, countOfDoneTasks);
    this.changeBarFiller(countOfTasks, countOfDoneTasks);
  },

  changeBarText(countOfTasks, countOfDoneTasks) {
    let text;
    if (!countOfTasks) {
      text = 'No tasks';
    } else if (countOfTasks === countOfDoneTasks) {
      text = 'Completed';
    } else {
      text = `${countOfDoneTasks} of ${countOfTasks}`;
    }

    this.progressBarText.textContent = text;
  },

  changeBarFiller(countOfTasks, countOfDoneTasks) {
    let width = (countOfDoneTasks / countOfTasks) * 100;
    if (!width) {
      width = 0;
    }
    this.progressBarFiller.style.width = width + '%';
  },

  getText() {
    return this.input.value;
  },

  clearText() {
    this.input.value = '';
  },

  remindAboutText() {
    this.input.classList.add('alert');
    setTimeout(() => this.input.classList.remove('alert'), 200);
  },

  removeItem(target) {
    let item = target.closest('.todo-list-item');
    item.classList.add('item-before-remove');
    setTimeout(() => {
      item.remove();
      this.changeProgressBar();
    }, 900);
  },

  removeCompleted() {
    let items = document.querySelectorAll('.todo-list-item');
    for (const item of items) {
      if (item.querySelector('.done-text')) {
        this.removeItem(item);
      }
    }
  },

  changeView(target) {
    let items = document.querySelectorAll('.todo-list-item');
    let show = target.dataset.show;
    this[show](items);
    this.changeActiveBtn(target);
  },

  changeActiveBtn(target) {
    let currentBtn = document.querySelector('.active-btn');
    currentBtn.classList.remove('active-btn');
    target.classList.add('active-btn');
  },

  showAll(items) {
    for (const item of items) {
      item.style.display = '';
    }
  },

  showActive(items) {
    for (const item of items) {
      if (item.querySelector('.done-text')) {
        item.classList.add('item-before-remove');
        setTimeout(() => {
          item.style.display = 'none';
          item.classList.remove('item-before-remove');
        }, 900);
      } else {
        item.style.display = '';
      }
    }
  },

  showCompleted(items) {
    for (const item of items) {
      if (!item.querySelector('.done-text')) {
        item.classList.add('item-before-remove');
        setTimeout(() => {
          item.style.display = 'none';
          item.classList.remove('item-before-remove');
        }, 900);
      } else {
        item.style.display = '';
      }
    }
  }
};
