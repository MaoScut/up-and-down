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
  const self = this;
  const views = [];
  this.up = function() {
    value += 1;
  };
  this.down = function() {
    value -= 1;
  };
  this.getValue = function() {
    return value;
  };
  this.broadcast = function() {
    views.forEach(view => view.render(self));
  };
  this.subscribe = function(cb) {
    views.push(cb);
  }
}
// 注册，广播，都是由controller做的
// model，view中不直接出现对方
function Controller() {
  let view = null;
  let model = null;
  this.up = function() {
    // 修改数据
    model.up();
    // 通知视图
    model.broadcast();
  };
  this.down = function() {
    model.down();
    model.broadcast();
  }
  this.init = function() {
    view = new View(this);
    model = new Model();
    // 把视图注册到model中
    model.subscribe(view);
  }
}
export default new Controller();