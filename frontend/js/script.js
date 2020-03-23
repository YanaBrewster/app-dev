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
