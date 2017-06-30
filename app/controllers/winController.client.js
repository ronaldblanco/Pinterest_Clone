'use strict';

(function () {

   var addButton = document.querySelector('.btn-add');
   var delButton = document.querySelector('.btn-delete');
   var grid = document.querySelector('#grid');
   var name = document.querySelector('#name');
   var image = document.querySelector('#image');
   var apiUrl = appUrl + '/api/:id/wins';

   function gridConfig(w,h){
      if(w > 639 && h > 359) return 'grid-item--width4 grid-item--height4';
      else if(w > 479 && h > 299) return 'grid-item--width3 grid-item--height3';
      else if(w > 319 && h > 279) return 'grid-item--width2 grid-item--height2';
      else if(w > 639) return 'grid-item--width4';
      else if(w > 479) return 'grid-item--width3';
      else if(w > 319) return 'grid-item--width2';
      else if(h > 359) return 'grid-item--height4';
      else if(h > 299) return 'grid-item--height3';
      else if(h > 319) return 'grid-item--height2';
      else return '';
   }
   
   function updateGrid (data) {
      var wins = JSON.parse(data);
      console.log(wins.images);
      grid.innerHTML = '';
      for(var a = 0; a < wins.images.length; a++){
         var size = gridConfig(wins.images[a].info.width,wins.images[a].info.height);
         if(size == '') grid.innerHTML = grid.innerHTML + '<div class="grid-item"><input type="radio" value="?name=' +wins.images[a].name+'&image='+wins.images[a].image+ '" name="radioWins" id="radioWin'+a+'">This Win.<img src = "'+wins.images[a].image+'" class = "myimg img-rounded" onError="this.onerror=null;this.src=`/public/img/noimage.jpg`;"><p class="txt">'+wins.images[a].name+'</p><p class="txtuser">By '+wins.images[a].username+'</p>  <input type="radio" value="?name=' +wins.images[a].name+'&username='+wins.images[a].username+ '" name="radioLike" id="radioLike'+a+'">Likes '+wins.images[a].likes.length+'  <img src = "'+wins.images[a].userimage+'" class = "user img-rounded"></div>'
         else grid.innerHTML = grid.innerHTML + '<div class="grid-item '+size+'"><input type="radio" value="?name=' +wins.images[a].name+'&image='+wins.images[a].image+ '" name="radioWins" id="radioWin'+a+'">This Win.<img src = "'+wins.images[a].image+'" class = "myimg img-rounded" onError="this.onerror=null;this.src=`/public/img/noimage.jpg`;"><p class="txt">'+wins.images[a].name+'</p><p class="txtuserbig">By '+wins.images[a].username+'</p>  <input type="radio" value="?name=' +wins.images[a].name+'&username='+wins.images[a].username+ '" name="radioLike" id="radioLike'+a+'">Likes '+wins.images[a].likes.length+'  <img src = "'+wins.images[a].userimage+'" class = "userbig img-rounded"></div>'
         
      }
      
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateGrid));

   addButton.addEventListener('click', function () {

      var query = "?name=" + name.value + '&image=' + image.value;
      ajaxFunctions.ajaxRequest('POST', apiUrl + 'add' + query, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateGrid);
      });

   }, false);

   delButton.addEventListener('click', function () {

      var query = document.querySelector('input[name = "radioWins"]:checked').value;
      ajaxFunctions.ajaxRequest('DELETE', apiUrl + 'del' + query, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateGrid);
      });

   }, false);
   
   grid.addEventListener('click', function () {

      if(document.querySelector('input[name = "radioLike"]:checked').value != null && document.querySelector('input[name = "radioLike"]:checked').value != undefined){
         var query = document.querySelector('input[name = "radioLike"]:checked').value;
         //console.log(query);
      
         ajaxFunctions.ajaxRequest('POST', apiUrl + 'like' + query, function () {
            ajaxFunctions.ajaxRequest('GET', apiUrl, updateGrid);
         });
      }
      

   }, false);

})();
