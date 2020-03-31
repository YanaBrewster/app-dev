// Yanas code
let url;
$(document).ready(function(){

  // get url and port from config.json
  $.ajax({
    url :'config.json',
    type :'GET',
    dataType :'json',
    success : function(configData){
      url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
      console.log(url);
      generateLandingPageCards();
    },//success
    error:function(){
      console.log('error: cannot call api');
    }//error
  });//ajax
});

// Show and hide pages ===============================================================
// Yanas code

//check if there is any session sessionStorage
if (sessionStorage['userName']) {
  console.log('You are logged in');
  // buttons
  $('#logoutBtn').show();
  $('#myPortfolioBtn').show();
  $('#loginBtn').hide();
  $('#signUpBtn').hide();
  // showMemberName(sessionStorage.userName);
  // pages
  $('#landingPage').show();
  $('#loginPage').hide();
  $('#signUpPage').hide();
  $('#projectPage').hide();
  $('#uploadPortfolioPage').hide();
  $('#updatePortfolio').hide();
} else {
  console.log('Please login');
  // buttons
  $('#logoutBtn').hide();
  $('#myPortfolioBtn').hide();
  $('#loginBtn').show();
  $('#signUpBtn').show();
  // pages
  $('#landingPage').show();
  $('#loginPage').hide();
  $('#signUpPage').hide();
  $('#projectPage').hide();
  $('#uploadPortfolioPage').hide();
  $('#updatePortfolio').hide();
}

//Home button to show landing page
$('#homeBtn').click(function(){
  // pages
  $('#landingPage').show();
  $('#loginPage').hide();
  $('#signUpPage').hide();
  $('#projectPage').hide();
  $('#uploadPortfolioPage').hide();
  $('#updatePortfolio').hide();
});

//Login button to show login page
$('#loginBtn').click(function(){
  // pages
  $('#loginPage').show();
  $('#landingPage').hide();
  $('#signUpPage').hide();
  $('#projectPage').hide();
  $('#uploadPortfolioPage').hide();
  $('#updatePortfolio').hide();
});


//signup button to shoe register page
$('#signUpBtn').click(function(){
  // pages
  $('#signUpPage').show();
  $('#projectPage').hide();
  $('#loginPage').hide();
  $('#landingPage').hide();
  $('#uploadPortfolioPage').hide();
  $('#updatePortfolio').hide();
});

// my portfolio button to show my portfolio page
$('#myPortfolioBtn').click(function(){
  showMyProjects()
  // pages
  $('#projectPage').show();
  $('#signUpPage').hide();
  $('#loginPage').hide();
  $('#landingPage').hide();
  $('#uploadPortfolioPage').hide();
  $('#updatePortfolio').hide();
});

//upload projects button to show upload project page
$('#addPortfolioBtn').click(function(){
  // pages
  $('#uploadPortfolioPage').show();
  $('#projectPage').hide();
  $('#signUpPage').hide();
  $('#loginPage').hide();
  $('#landingPage').hide();
  $('#updatePortfolio').hide();
});

// back button to my portfolio page
$('.back-portfolio').click(function(){
  // pages
  $('#projectPage').show();
  $('#uploadPortfolioPage').hide();
  $('#signUpPage').hide();
  $('#loginPage').hide();
  $('#landingPage').hide();
  $('#updatePortfolio').hide();
});


// Logout member ===============================================================
// Yanas code

$('#logoutBtn').click(function(){
  sessionStorage.clear()
  $('#landingPage').show();
  $('#loginPage').hide();
  $('#signUpPage').hide();
  $('#projectPage').hide();
  $('#uploadPortfolioPage').hide();
  $('#updatePortfolio').hide();
  location.reload("#loginForm");
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
  // $('#registerForm').show();
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
        // alert('You are logged in')
        sessionStorage.setItem('memberId',loginData['_id']);
        sessionStorage.setItem('userName',loginData['username']);
        sessionStorage.setItem('userEmail',loginData['email']);
        // console.log(sessionStorage);
        // showMemberName(username);
        $('#logoutBtn').show();
        $('#myPortfolioBtn').show();
        $('#loginBtn').hide();
        $('#signUpBtn').hide();
        $('#landingPage').show();
        $('#loginPage').hide();
        $("html, body").animate({ scrollTop: 0 }, "fast");

      }
    },//success
    error:function(){
      console.log('error: cannot call api');
    }//error
  });//ajax
});

// add portfolio form ===============================================================
// Yanas code

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
        memberId : sessionStorage.getItem('memberId')
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
          $("html, body").animate({ scrollTop: 0 }, "fast");
      },   // success
      error:function(){
        console.log('error: cannot call api');
      }  //error
    }); //ajax
  } //else
}); // submit add portfolio

// View my portfolio project cards =============================================
// Yanas code

function showMyProjects(){
  $.ajax({
    url :`${url}/allPortfolios`,
    type :'GET',
    dataType :'json',
    success : function(portfoliosFromMongo){
      let currentMemberId = sessionStorage.getItem('memberId');
      myProjects = portfoliosFromMongo.filter(item=>item.memberId === currentMemberId);
      renderAllCards(myProjects);
    }
  });
};

function renderAllCards(projects){

  document.getElementById('myProjectCards').innerHTML = "";
  for(let i=0; i<projects.length; i++){
    let project = projects[i];
    let card = renderCard(project);
    document.getElementById('myProjectCards').innerHTML += card;
  }
}

function renderCard(project){
  return  `<div class="col-md-3 col-lg-3 col-sm-12">
  <div class="card mb-4 border-0">
  <img src="${project.image}" class="card-img-top radius" alt="Picture from my project">
  <div class="card-body">
  <h4 class="card-text">${project.title}</h4>
  <div class="d-flex justify-content-between align-items-center">
  <div class="btn-group pt-2 pb-3 border-bottom mx-auto">
  <button id="viewProject${project._id}" onclick="getArtworkInfo()" type="button" class="viewMoreButton mx-2 btn btn-info btn-font">View</button>
  <button id="updateProject${project._id}" type="button" class="mx-2 btn btn-dark btn-font">Update</button>
  <button id="deleteProject${project._id}" type="button" class="mx-2 btn btn-danger btn-font">Delete</button>
  </div>
  </div>
  </div>
  </div>
  </div>`;

  let viewMoreButtons = document.getElementsByClassName('viewMoreButton');
  console.log(viewMoreButtons);

  for (let i = 0; i < viewMoreButtons.length; i++) {
    viewMoreButtons[i].addEventListener('click', getArtworkInfo)
  }
}


// Yanas code ends

// Hayley's code
function generateLandingPageCards() {

  $.ajax({
    url: `${url}/portfoliosAndAuthors`,
    type: 'GET',
    dataType: 'json',
    success: function(portfolios) {
      console.log(portfolios);
      makeProductCards(portfolios);
    },
    error: function(error) {
      console.log('Error: ' + error);
    }
  })
}

function makeProductCards(arr) {
  document.getElementById('artsDeck').innerHTML = arr.map(art =>
    `<div class="card artcard border-bottom">
      <div class="image-container">
        <img src="${art.image}" alt="Avatar" class="card-img-top art-image" style="width:100%">
      </div>

      <div class="card-body artcard-body">
        <div class="artcard-columnwrap mb-3">
          <h5 class="card-title h4 artcard-title">${art.title}</h5>
          <h5 class="card-title h4 artcard-price">&dollar;${art.price}</h5>
        </div>
        <h6 class="card-title mb-3">${art.authorInfo.username}, ${art.authorInfo.location}</h6>
        <p class="card-text artcard-description mb-3">${art.description}</p>
        <a href="${art.authorInfo.website}" class="card-link artcard-link">Artist Website</a>
        <div class="artcard-columnwrap mt-5">
          <p class="card-title h5-cyan">${art.category}</p>
          <div class="button viewMoreButton" id="${art._id}">View</div>
        </div>
      </div>

    </div>`
  ).join(' ');

  let viewMoreButtons = document.getElementsByClassName('viewMoreButton');
  for (let i = 0; i < viewMoreButtons.length; i++) {
    viewMoreButtons[i].addEventListener('click', getArtworkInfo)
  }
}

console.log(sessionStorage);

function getArtworkInfo(e) {
  let id = e.target.id;
  $.ajax({
    url: `${url}/portfolioWithAuthor/${id}`,
    type: 'GET',
    dataType: 'json',
    success: function(portfolio) {
      generateViewMoreHTML(portfolio[0]);
      generateCommentsHTML(portfolio[0].comments);
      console.log(portfolio[0].comments);
      sessionStorage.setItem('currentPortfolio', portfolio[0]._id);
      $("#viewMorePage").show();
      $("#landingPage").hide();
    },
    error: function(error) {
      console.log('Error: ' + error);
    }
  })
}

function generateViewMoreHTML(portfolio) {

  document.getElementById('viewMorePage-artInfo').innerHTML = `
    <div>
      <h5 class="h3">${portfolio.title}</h5>
      <div class="viewMore-photoBackground">
        <img src="${portfolio.image}" class="viewMore-mainPhoto" alt="${portfolio.title} photo">
      </div>
      <div class="flexContainer-row mt-3 mb-3">
        <h5 class="h4">${portfolio.authorInfo.username}</h5>
        <h5 class="card-title h4 artcard-price">&dollar;${portfolio.price}</h5>
      </div>
      <p>${portfolio.description}</p>
      <strong class="mb-5">Location: ${portfolio.authorInfo.location}</strong>
      <br/>
      <a href="${portfolio.authorInfo.website}" class="artcard-link">${portfolio.authorInfo.website}</a>
      <div class="artcard-columnwrap mt-5 viewMore-endBoarder">
        <p class="card-title h5-cyan">${portfolio.category}</p>
        <div class="button" id="${portfolio._id}">Buy</div>
      </div>
      <button id="backToLanding" type="button" class="btn btn-dark mt-3 mb-5">Back</button>
    </div>
  `
  document.getElementById('backToLanding').addEventListener('click', function() {
    $("#viewMorePage").hide();
    $("#landingPage").show();
    sessionStorage.removeItem('currentPortfolio');
    console.log(sessionStorage);
  })
}

function generateCommentsHTML(comments) {
  let currentUser = sessionStorage.getItem('userName');
  for (let i = 0; i < comments.length; i++) {  
    if (currentUser && (comments[i].postByUsername === currentUser)) {
      document.getElementById('viewMorePage-comments').innerHTML += `
        <div class="comment-container comment-container--right mb-3">
          <div class="comment-info">
            <strong class="mr-1">You</strong>
            <p>on ${formatDate(comments[i].posted)}</p>
          </div>
          <p>${comments[i].text}</p>
        </div>
      `
    } else if (comments[i].postByUsername !== currentUser) {
      document.getElementById('viewMorePage-comments').innerHTML += `
        <div class="comment-container comment-container--left mb-3">
          <div class="comment-info">
            <strong class="mr-1">${comments[i].postByUsername}</strong>
            <p>on ${formatDate(comments[i].posted)}</p>
          </div>
          <p>${comments[i].text}</p>
        </div>
      `
    }    
  }
}

document.getElementById("filterButton").addEventListener('click', getFilteredArtworks)

function getFilteredArtworks() {
  let minPrice = (JSON.parse($("#filterDropdown-byPrice").val())).min;
  let maxPrice = (JSON.parse($("#filterDropdown-byPrice").val())).max;
  let category = $("#filterDropdown-byCategory").val();

  $.ajax({
    url: `${url}/filterPortfolios/${minPrice}/${maxPrice}/${category}`,
    type: 'GET',
    success: function(response) {
      console.log(response);
      if (response === 'Sorry, there is no artwork that matches your search!') {
        document.getElementById('artsDeck').innerHTML = `
        <div class="noResultText-wrapper">
        <h3 class="noResultText">Sorry, there is no artwork that matches your search!</h3>
        </div>

        `
      } else {
        makeProductCards(response);
      }
    },
    error: function(error) {
      console.log('Error: ' + error);
    }
  })
}

document.getElementById('viewMorePage-postCommentButton').addEventListener('click', postComment)

function postComment() {
  let _content = $('textarea#viewMorePage-postComment').val();
  let _date = Date.now();
  let _portfolioID = sessionStorage.getItem('currentPortfolio');
  let _userID = sessionStorage.getItem('memberId');
  let _username = sessionStorage.getItem('userName');

  $.ajax({
    url: `${url}/addComment`,
    type: 'POST',
    data: {
      portfolioID: _portfolioID,
      postByID: _userID,
      postByUsername: _username,
      postDate: _date,
      content: _content
    },
    success: function(comment) {
      $('textarea#viewMorePage-postComment').val('');
      console.log(comment);
      addComment(comment);
    },
    error: function(err) {
      console.log(err);
    }

  })
}

function formatDate(datestring) {
  let date = new Date(datestring);
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let hour = date.getHours();
  let minute = (date.getMinutes()<10?'0':'') + date.getMinutes();

  return `${day}/${month}/${year} at ${hour}:${minute}`;
}

function addComment(comment) {
  let commentHtml = `
    <div class="comment-container mb-3">
      <div class="comment-info">
        <strong class="mr-1">You</strong>
        <p>on ${formatDate(comment.posted)}</p>
      </div>
      <p>${comment.text}</p>
    </div>
  `;
  document.getElementById('viewMorePage-comments').innerHTML += commentHtml;
}

// Hayley's code ends
