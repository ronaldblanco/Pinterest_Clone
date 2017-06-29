'use strict';

(function () {

   //var addButton = document.querySelector('.btn-add');
   //var delButton = document.querySelector('.btn-delete');
   var grid = document.querySelector('#grid');
   //var name = document.querySelector('#name');
   //var image = document.querySelector('#image');
   var apiUrl = appUrl + '/api/:id/public';


   function gridConfig(w,h){
      if(w > 319 && h > 279) return 'grid-item--width2 grid-item--height2';
      else if(w > 479 && h > 299) return 'grid-item--width3 grid-item--height3';
      else if(w > 639 && h > 359) return 'grid-item--width4 grid-item--height4';
   }
   
   
   function updateGrid (data) {
      var wins = JSON.parse(data);
      //console.log(wins.images);
      grid.innerHTML = '';
      for(var a = 0; a < wins.length; a++){
         grid.innerHTML = grid.innerHTML + '<div class="grid-item-public '+gridConfig(wins[a].info.width,wins[a].info.height)+'"><img src = "'+wins[a].image+'" class = "myimg img-rounded" onError="this.onerror=null;this.src=`/public/img/noimage.jpg`;"><p class="txt">'+wins[a].name+'</p><p class="txtuser">By '+wins[a].username+'</p> <img src = "'+wins[a].userimage+'" class = "publicuser img-rounded"></div>'
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
