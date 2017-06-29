'use strict';

(function () {

   //var addButton = document.querySelector('.btn-add');
   //var delButton = document.querySelector('.btn-delete');
   var grid = document.querySelector('#grid');
   //var name = document.querySelector('#name');
   //var image = document.querySelector('#image');
   var apiUrl = appUrl + '/api/:id/allwins';

   function updateGrid (data) {
      var wins = JSON.parse(data);
      //console.log(wins);
      grid.innerHTML = '';
      for(var a = 0; a < wins.length; a++){
         grid.innerHTML = grid.innerHTML + '<div class="grid-item-public"><img src = "'+wins[a].image+'" class = "myimg img-rounded" onError="this.onerror=null;this.src=`/public/img/noimage.jpg`;"><p class="txt">'+wins[a].name+'</p><p class="txtuser">By '+wins[a].username+'</p>  <input type="radio" value="?name=' +wins[a].name+'&username='+wins[a].username+ '" name="radioLike" id="radioLike'+a+'">Likes '+wins[a].likes.length+'  <img src = "'+wins[a].userimage+'" class = "allwinsuser img-rounded"></div>'
      }
      
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateGrid));

  grid.addEventListener('click', function () {

      if(document.querySelector('input[name = "radioLike"]:checked').value != null && document.querySelector('input[name = "radioLike"]:checked').value != undefined){
         var query = document.querySelector('input[name = "radioLike"]:checked').value;
         //console.log(query);
      
         ajaxFunctions.ajaxRequest('POST', appUrl + '/api/:id/winslike' + query, function () {
            ajaxFunctions.ajaxRequest('GET', apiUrl, updateGrid);
         });
      }
      

   }, false);

})();
