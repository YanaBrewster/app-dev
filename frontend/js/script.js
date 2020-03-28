// Yanas code
$(document).ready(function(){

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

  // view all members button ===============================================================
// Yanas code

  $('#viewMembersBtn').click(function(){
    $.ajax({
      url : `${url}/allMembers`,
      type : 'GET',
      dataType : 'json',
      success : function(membersFromMongo){
        console.log(membersFromMongo);
        $('#membersCards').empty();
        document.getElementById('membersCards').innerHTML +=
        '<h2 class="pt-5 pb-4">All Members</h2>'
        for(let i=0; i<membersFromMongo.length; i++){
          document.getElementById('membersCards').innerHTML +=
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
// register member ===============================================================
// Yanas code
$('#registerBtn').click(function(){
  $('#registerForm').show();
});

// register user
$('#registerForm').submit(function(){
  event.preventDefault();
  let username = $('#registerUsername').val();
  let email = $('#registerEmail').val();
  let password = $('#registerPassword').val();
  console.log(username,email,password);
  $.ajax({
    url :`${url}/registerMember`,
    type :'POST',
    data:{
      username : username,
      email : email,
      password : password
    },
    success : function(member){
      console.log(member);
      if (!(member === 'Username already taken. Please try another one' )) {
        alert ('Please login to add artwork and buy art');
        $('#loginBtn').show();
        $('#registerBtn').hide();
        $('#registerForm').hide();
      } else {
        alert('Username already taken. Please try another one');
        $('#registerUsername').val('');
        $('#registerEmail').val('');
        $('#registerPassword').val('');
      }
    },//success
    error:function(){
      console.log('error: cannot call api');
    }//error

  });//ajax
});//submit function for register form

// login member ===============================================================
// Yanas code

$('#loginSubmitBtn').click(function(){
  event.preventDefault();
  let username = $('#inputUsernameLogin').val();
  let password = $('#inputPasswordLogin').val();
  console.log(username,password);
  $.ajax({
    url :`${url}/loginMember`,
    type :'POST',
    data:{
      username : username,
      password : password
    },
    success : function(loginData){
      // console.log(loginData);
      if (loginData === 'Please fill in all input fields') {
        alert('Please fill in all input fields')
      } else if (loginData === 'Member not found. Please register') {
        alert('Register please')
      } else if (loginData === 'Not Authorized') {
        alert('Incorrect Password')
      }  else {
          alert('You are logged in')
        sessionStorage.setItem('memberId',loginData['_id']);
        sessionStorage.setItem('userName',loginData['username']);
        sessionStorage.setItem('userEmail',loginData['email']);
        // console.log(sessionStorage);
        // showMemberName(username);
        // $('.landingPage-banner').hide();
        // $('.logout-btn').show();
        // $('.signInButton').hide();
        // $('#signUp').hide();
        // $('#projectPage').show();
        // $('#signUpPage').hide();
        // $('#loginPage').hide();
      }
    },//success
    error:function(){
      console.log('error: cannot call api');
    }//error
  });//ajax
});

// logout member ===============================================================
// Yanas code

$('#logoutBtn').click(function(){
  sessionStorage.clear()
  // $('#loginBtn').show();
  // $('#logoutBtn').hide();
  // $('#registerBtn').show();
  // $('#updatePortfolioForm').hide();
  // $('#addPortfolioForm').hide();
  // $('#deleteForm').hide();
  location.reload("#loginForm");
});

// add portfolio ===============================================================
// Yanas code

$('#addPortfolioBtn').click(function(){
  $('#addPortfolioForm').show();
  // $('#updatePortfolioForm').hide();
  // $('#deletePortfolioForm').hide();
});

$('#addPortfolioForm').submit(function(){
  event.preventDefault();
  if(!sessionStorage['memberId']){
        alert('401, permission denied');
        return;
    };
  let title = $('#addPortfolioTitle').val();
  let description = $('#addPortfolioDescription').val();
  let image = $('#addPortfolioImage').val();
  let category = $('#addPortfolioCategory').val();
  let price = $('#addPortfolioPrice').val();
  let memberId = $('#addPortfolioMemberId').val();
    // console.log(title, description, image, category, price, memberId);
  if (title == '' || description == '' || image == '' || category == '' || price == '' || memberId == ''){
    alert('Please enter all details')
  } else {
    $.ajax({
      url :`${url}/addPortfolio`,
      type : 'POST',
      data : {
        // username : username,
        title : title,
        description : description,
        image : image,
        category : category,
        price: price,
        memberId : sessionStorage['memberId']
      },
      success:function(portfolio){
        console.log(portfolio);
        if (!(portfolio == 'Title taken already, please try another one')) {
             alert('added the portfolio');
           } else {
             alert("Title taken already, please try another one")
           }
        $('#addPortfolioTitle').val();
        $('#addPortfolioDescription').val();
        $('#addPortfolioImage').val();
        $('#addPortfolioCategory').val();
        $('#addPortfolioPrice').val();
        $('#addPortfolioMemberId').val();
      },   // success
      error:function(){
        console.log('error: cannot call api');
      }  //error
    }); //ajax
  } //else
}); // submit add portfolio




// Yanas code ends
