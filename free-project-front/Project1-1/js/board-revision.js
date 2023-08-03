const openPopupBtn = document.getElementById('openPopupBtn');
const closePopupBtn = document.getElementById('closePopupBtn');
const popupContainer = document.getElementById('popupContainer');

openPopupBtn.addEventListener('click', function() {
  popupContainer.style.display = 'block';
});

closePopupBtn.addEventListener('click', function() {
  popupContainer.style.display = 'none';
});