
  const imgBoxes = document.querySelectorAll('.alcohol-drinks > div');
  const boardPages = document.querySelectorAll('.board_page .num');

  const itemsPerPage = 4; // 한 페이지에 보여줄 이미지 박스 개수

  function showPage(pageNum) {
    const startIndex = (pageNum - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    imgBoxes.forEach((box, index) => {
      if (index >= startIndex && index < endIndex) {
        box.style.display = 'block';
      } else {
        box.style.display = 'none';
      }
    });
  }

  boardPages.forEach((page, index) => {
    page.addEventListener('click', (event) => {
      event.preventDefault();
      // 현재 선택된 페이지의 스타일을 변경 (num on 클래스 추가)
      boardPages.forEach((p) => p.classList.remove('on'));
      event.target.classList.add('on');

      // 해당 페이지로 컨텐츠 보이기
      const pageNum = index + 1;
      showPage(pageNum);
      console.log(`Go to Page ${pageNum}`);
    });
  });

  // 초기 페이지 설정
  showPage(1);

function first() {
    
    window.location.href("main6.html");
}