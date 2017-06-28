'use strict';

(function () {

   var addButton = document.querySelector('.btn-add');
   var grid = document.querySelector('#grid');
   var name = document.querySelector('#name');
   var image = document.querySelector('#image');
   var apiUrl = appUrl + '/api/:id/wins';

   function updateGrid (data) {
      var wins = JSON.parse(data);
      console.log(wins.images);
      grid.innerHTML = '';
      for(var a = 0; a < wins.images.length; a++){
         grid.innerHTML = grid.innerHTML + '<div class="grid-item"><img src = "'+wins.images[a].image+'" class = "myimg img-rounded"><p class="txt">'+wins.images[a].name+'</p><p class="txtuser">By '+wins.images[a].username+'</p><button type="submit" class="minibtn">LIKE</button> <img src = "'+wins.images[a].userimage+'" class = "user img-rounded"></div>'
      }
      
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateGrid));

   addButton.addEventListener('click', function () {

      var query = "?name=" + name.value + '&image=' + image.value;
      ajaxFunctions.ajaxRequest('POST', apiUrl + 'add' + query, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateGrid);
      });

   }, false);

   /*deleteButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);*/

})();
