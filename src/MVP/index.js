function $(id) {
  return document.querySelector(`#${id}`);
}
function View(controller) {
  const upBtn = $('upBtn');
  const downBtn = $('downBtn');
  const textSpan = $('text');

  this.render = function(model) {
    textSpan.innerHTML = model.getValue();
  }
  upBtn.onclick = controller.up;
  downBtn.onclick = controller.down;
}
function Model() {
  let value = 100;
  this.up = function() {
    value += 1;
  };
  this.down = function() {
    value -= 1;
  };
  this.getValue = function() {
    return value;
  };
}
// 视图注册在controller上，可以实现多个视图共用一个controller
// 缩小了model，model专注于数据改变，不用再承担通知的工作
function Controller() {
  let views = [];
  let model = null;
  function broadcast() {
    views.forEach(view => view.render(model));
  }
  this.up = function() {
    model.up();
    broadcast();
  };
  this.down = function() {
    model.down();
    broadcast();
  }
  this.init = function() {
    views.push(new View(this));
    model = new Model();
  }
}
export default new Controller();