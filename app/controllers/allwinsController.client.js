'use strict';

(function () {

   //var addButton = document.querySelector('.btn-add');
   //var delButton = document.querySelector('.btn-delete');
   var grid = document.querySelector('#grid');
   //var name = document.querySelector('#name');
   //var image = document.querySelector('#image');
   var apiUrl = appUrl + '/api/:id/allwins';

   function gridConfig(w,h){
      if(w > 319 && h > 279) return 'grid-item--width2 grid-item--height2';
      else if(w > 479 && h > 299) return 'grid-item--width3 grid-item--height3';
      else if(w > 639 && h > 359) return 'grid-item--width4 grid-item--height4';
      else if(w > 479) return 'grid-item--width3';
      else if(w > 639) return 'grid-item--width4';
      else if(w > 319) return 'grid-item--width2';
      else if(h > 359) return 'grid-item--height4';
      else if(h > 299) return 'grid-item--height3';
      else if(h > 319) return 'grid-item--height2';
      else return '';
   }

   function updateGrid (data) {
      var wins = JSON.parse(data);
      //console.log(wins);
      grid.innerHTML = '';
      for(var a = 0; a < wins.length; a++){
         var size = gridConfig(wins[a].info.width,wins[a].info.height);
         if(size == '') grid.innerHTML = grid.innerHTML + '<div class="grid-item-public"><img src = "'+wins[a].image+'" class = "myimg img-rounded" onError="this.onerror=null;this.src=`/public/img/noimage.jpg`;"><p class="txt">'+wins[a].name+'</p><p class="txtuser">By '+wins[a].username+'</p>  <input type="radio" value="?name=' +wins[a].name+'&username='+wins[a].username+ '" name="radioLike" id="radioLike'+a+'">Likes '+wins[a].likes.length+'  <img src = "'+wins[a].userimage+'" class = "allwinsuser img-rounded"></div>'
         else grid.innerHTML = grid.innerHTML + '<div class="grid-item-public '+size+'"><img src = "'+wins[a].image+'" class = "myimg img-rounded" onError="this.onerror=null;this.src=`/public/img/noimage.jpg`;"><p class="txt">'+wins[a].name+'</p><p class="txtuserbig">By '+wins[a].username+'</p>  <input type="radio" value="?name=' +wins[a].name+'&username='+wins[a].username+ '" name="radioLike" id="radioLike'+a+'">Likes '+wins[a].likes.length+'  <img src = "'+wins[a].userimage+'" class = "allwinsuserbig img-rounded"></div>'
         
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
