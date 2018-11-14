window.fn = {};

// Open and load pages for splitter etc.
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

// Pusing and popping pages
function push(page) {
  document.querySelector('#myNavigator').pushPage(page, {data: {title: 'Event'}});
}

window.fn.pop = function() {
  var content = document.getElementById('myNavigator');
  content.popPage();
};

// Showing modals
function showModal(form) {
  var modal = document.querySelector(form);
  modal.show({ animation: 'fade' });
}

function closeModal(form) {
  var modal = document.querySelector(form);
  modal.hide({ animation: 'fade' });
}

// Pull to refresh
// ons.ready(function() {
//   var pullHook = document.getElementById('pull-hook');

//   pullHook.addEventListener('changestate', function(event) {
//     var message = '';

//     switch (event.state) {
//       case 'initial':
//         message = 'Pull to refresh';
//         break;
//       case 'preaction':
//         message = 'Release';
//         break;
//       case 'action':
//         message = 'Loading...';
//         break;
//     }

//     pullHook.innerHTML = message;
//   });

//   pullHook.onAction = function(done) {
//     setTimeout(done, 1000);
//   };
// });
