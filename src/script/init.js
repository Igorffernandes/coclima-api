/* eslint-disable no-console */
/* eslint-disable no-var */
/* eslint-disable no-undef */
/* eslint-disable vars-on-top */

// function addCss(href) {
//   var s = document.createElement('link');
//   s.setAttribute('rel', 'stylesheet');
//   s.setAttribute('href', href);
//   document.head.appendChild(s);
// }

// addCss('https://api.coclima.com/css');

function addPopUp() {
  // var modal = document.createElement('div');
  // var close = document.createElement('div');
  // var closex = document.createElement('a');
  // var trees = document.createElement('div');
  // var treesDesc = document.createElement('a');
  // var treesValue = document.createElement('a');
  // var mainText = document.createElement('a');
  // var submainText = document.createElement('a');
  // var button = document.createElement('button');

  var pageInfo = window.dataLayer || [];

  // modal.setAttribute('id', 'modal-coclima');
  // close.setAttribute('id', 'close-coclima');
  // closex.setAttribute('id', 'closex-coclima');
  // trees.setAttribute('id', 'trees-coclima');
  // treesDesc.setAttribute('id', 'treesDesc-coclima');
  // treesValue.setAttribute('id', 'treesValue-coclima');
  // mainText.setAttribute('id', 'mainText-coclima');
  // submainText.setAttribute('id', 'submainText-coclima');
  // button.setAttribute('id', 'button-coclima');

  // treesDesc.appendChild(document.createTextNode('Ávores plantadas por Tray até agora'));
  // treesValue.appendChild(document.createTextNode('1000'));

  // mainText.appendChild(document.createTextNode('Sua compra ajudou a transformar o mundo'));
  // submainText.appendChild(document.createTextNode('A cada compra realizada você ajuda a plantar árvores e construir um planeta melhor'));

  // closex.appendChild(document.createTextNode('X'));

  // close.appendChild(closex);

  // trees.appendChild(treesDesc);
  // trees.appendChild(treesValue);

  // button.setAttribute('onclick', "window.open('https://coclima.com', '_blank');");
  // button.appendChild(document.createTextNode('Conhecer mais'));

  // modal.appendChild(close);
  // modal.appendChild(trees);
  // modal.appendChild(mainText);
  // modal.appendChild(submainText);
  // modal.appendChild(button);
  // document.body.appendChild(modal);

  console.log('\n', 'DataLayer', pageInfo, '\n');

  // close.onclick = function () {
  //   modal.style.display = 'none';
  //   console.log('\n', 'DataLayer', pageInfo, '\n');
  // };
}

window.onload = addPopUp;
