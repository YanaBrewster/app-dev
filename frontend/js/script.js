// Yanas code

$(document).ready(function(){
  console.log("js is working");

// Testing jQuery
// $('#hide').click(function(){
//     $('.hidden').hide();
//   });

  // get url and port from config.json
  $.ajax({
    url :'config.json',
    type :'GET',
    dataType :'json',
    success : function(configData){
      url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
    },//success
    error:function(){
      console.log('error: cannot call api');
    }//error
  });//ajax

});


  // VIEW USERS BUTTON ===============================================================

  // view users
  $('#viewUserBtn').click(function(){
    $.ajax({
      url : `${url}/allMembers`,
      type : 'GET',
      dataType : 'json',
      success : function(membersFromMongo){
        console.log(membersFromMongo);
        $('#usersCards').empty();
        document.getElementById('usersCards').innerHTML +=
        '<h2 class="pt-5 pb-4">All Users</h2>'
        for(let i=0; i<membersFromMongo.length; i++){
          document.getElementById('usersCards').innerHTML +=
          `<div class="col mt-3">
          <h4 class=""> ${membersFromMongo[i].username}</h4>
          </div>`;
        }

      },
      error:function() {
        console.log('ERROR: cannot call API');
      }//error

    });//ajax
  });
