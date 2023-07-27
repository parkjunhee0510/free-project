const boardPages = document.querySelectorAll('.board_page .num');

boardPages.forEach((page) => {
    page.addEventListener('click', (event) => {
    event.preventDefault();
    // 현재 선택된 페이지의 스타일을 변경 (num on 클래스 추가)
    boardPages.forEach((p) => p.classList.remove('on'));
    event.target.classList.add('on');
    
    // 페이지 이동 로직 추가 (해당 페이지로 이동하도록 수정)
    const pageNum = parseInt(event.target.textContent);
    console.log(`Go to Page ${pageNum}`); // 여기서 실제 페이지 이동 로직을 구현하면 됩니다.
    });
});

