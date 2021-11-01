export const view = {
  todo: document.querySelector('.todo'),
  list: document.querySelector('.todo-list'),
  input: document.querySelector('.add_input'),
  footer: document.querySelector('.todo-footer'),
  progressBarText: document.querySelector('.bar_text'),
  progressBarFiller: document.querySelector('.bar_filler'),
  animationTime: 900,

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
      <button class="remove_btn" data-action="removeItem">
        <i class="fas fa-trash-alt"></i>
      </button>
    </li>`;

    this.list.insertAdjacentHTML('afterbegin', itemHtml);
    this.changeProgressBar();
    this.clearText();
  },

  getText() {
    return this.input.value;
  },

  clearText() {
    this.input.value = '';
  },

  makeItemDone(target) {
    let item = target.nextElementSibling;
    item.classList.toggle('done_text');
    this.changeProgressBar();
  },

  changeProgressBar() {
    let countOfTasks =
      document.querySelectorAll('.todo-list-item').length;
    let countOfDoneTasks =
      document.querySelectorAll('.done_text').length;
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

  remindAboutText() {
    this.input.classList.add('alert');
    setTimeout(() => this.input.classList.remove('alert'), 200);
  },

  removeItem(target) {
    let item = target.closest('.todo-list-item');
    item.classList.add('item-before_remove');
    setTimeout(() => {
      item.remove();
      this.changeProgressBar();
    }, this.animationTime);
  },

  removeCompleted() {
    let items = document.querySelectorAll('.todo-list-item');
    for (const item of items) {
      if (item.querySelector('.done_text')) {
        this.removeItem(item);
      }
    }
  },

  changeView(target) {
    let options = {
      showAll: () => false,
      showActive: item => item.querySelector('.done_text'),
      showCompleted: item => !item.querySelector('.done_text')
    };
    let showOption = target.dataset.show;
    this.show(options[showOption]);
    this.changeActiveBtn(target);
  },

  show(rule) {
    let items = document.querySelectorAll('.todo-list-item');

    for (const item of items) {
      if (rule(item)) {
        item.classList.add('item-before_remove');
        setTimeout(() => {
          item.style.display = 'none';
          item.classList.remove('item-before_remove');
        }, this.animationTime);
      } else {
        item.style.display = '';
      }
    }
  },

  changeActiveBtn(target) {
    let currentBtn = this.footer.querySelector('.active_btn');
    currentBtn.classList.remove('active_btn');
    target.classList.add('active_btn');
  }
};
