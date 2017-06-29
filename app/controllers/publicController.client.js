'use strict';

(function () {

   //var addButton = document.querySelector('.btn-add');
   //var delButton = document.querySelector('.btn-delete');
   var grid = document.querySelector('#grid');
   //var name = document.querySelector('#name');
   //var image = document.querySelector('#image');
   var apiUrl = appUrl + '/api/:id/public';

   function updateGrid (data) {
      var wins = JSON.parse(data);
      //console.log(wins.images);
      grid.innerHTML = '';
      for(var a = 0; a < wins.length; a++){
         grid.innerHTML = grid.innerHTML + '<div class="grid-item-public"><img src = "'+wins[a].image+'" class = "myimg img-rounded"><p class="txt">'+wins[a].name+'</p><p class="txtuser">By '+wins[a].username+'</p> <img src = "'+wins[a].userimage+'" class = "publicuser img-rounded"></div>'
      }
      
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateGrid));

   /*addButton.addEventListener('click', function () {

      var query = "?name=" + name.value + '&image=' + image.value;
      ajaxFunctions.ajaxRequest('POST', apiUrl + 'add' + query, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateGrid);
      });

   }, false);*/

   /*delButton.addEventListener('click', function () {

      var query = document.querySelector('input[name = "radioWins"]:checked').value;
      ajaxFunctions.ajaxRequest('DELETE', apiUrl + 'del' + query, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateGrid);
      });

   }, false);*/

})();
