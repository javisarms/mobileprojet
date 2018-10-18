window.fn = {};

window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
};

document.addEventListener('init', function(event) {
  var page = event.target;

  if (page.id === 'main') {
    page.querySelector('#push-button').onclick = function() {
      document.querySelector('#myNavigator').pushPage('event.html', {data: {title: 'Event'}});
    };
  } else if (page.id === 'event') {
    page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
  }
});

function showModal() {
  var modal = document.querySelector('ons-modal');
  modal.show();
  setTimeout(function() {
    modal.hide();
  }, 2000);
}