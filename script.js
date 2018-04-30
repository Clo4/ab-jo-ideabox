$ideaTitle = $('.input-title');
$ideaBody = $('.input-body');
$ideaSave = $('.save-button');
$ideaSearch = $('.search');
$cardContainer = $('.card-section');
var qualityDisplay = ['plausible', 'genius', 'swill'];
var quality = 0;
$(window).on('load', reload);

$ideaSave.on('click', acceptableInput);
$ideaTitle.on('keyup', toggleSaveButton);
$ideaBody.on('keyup', toggleSaveButton);
$cardContainer.on('click', '.delete-button', deleteCard);

function reload() {
  for (var i = 0; i < localStorage.length; i++) {
    var returnCard = localStorage.getItem(localStorage.key(i));
    var parsedCard = JSON.parse(returnCard);
    cardCreater(parsedCard);
  }
}

function toggleSaveButton () {
  if ($ideaTitle.val() === "" && $ideaBody.val() === "") {
    $ideaSave.prop("disabled", true);
  } else {
    $ideaSave.prop("disabled", false);
  }
}

function acceptableInput () {
  if ($ideaTitle.val() === "" || $ideaBody.val() === "") {
    alert("Please Enter Fillout The Title And Body Fields");
  } else {
    userInput();
  }
}

function userInput() {
  var ideaTitle = $ideaTitle.val();
  var ideaBody = $ideaBody.val();
  var newIdea = new CardInfo(ideaTitle, ideaBody);
  cardCreater(newIdea);
  clearInputFields();
  objectToString(newIdea);
};

function clearInputFields() {
  $('.input').val('');
};

function cardCreater(idea) {
  var ideaCard = document.createElement('article');
  ideaCard.innerHTML = (`
    <article id=${idea.id} class="card">
      <h2 class=".title-display">${idea.title}</h2>
      <input type="button" name="delete button" class="delete-button">
      <p class="card-body">${idea.body}</p>
      <input type="button" class="arrow-button upvote">
      <input type="button" class="arrow-button downvote">
      <h3 class="quality">quality: <span class="quality-text">${idea.ideaQuality}<span>
      </h3>
    </article>
  `);
  $cardContainer.prepend(ideaCard);
};

function CardInfo (title, body, ideaQuality) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.ideaQuality = qualityDisplay[2];
};

function objectToString(newIdea) {
  var newObjectString = JSON.stringify(newIdea);
  localStorage.setItem(newIdea.id, newObjectString);
}

function deleteCard() {
  (this).closest('article').remove();
  localStorage.removeItem($(this).closest('article').attr('id'));
}

