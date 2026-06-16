/* ============================================================
   favorites.js — 즐겨찾기(하트) 기능 (FIT FINDER - Guide)

   사용 라이브러리: jQuery 3.7.1
   jQuery는 guide.html에서 이 파일보다 먼저 로드됨.

   동작 흐름:
   1. 페이지 로드 시 localStorage에서 즐겨찾기 목록을 읽어 각 카드에 복원
   2. 하트 버튼 클릭 시 해당 체형 id를 즐겨찾기 배열에 추가 또는 제거
   3. 변경된 배열을 JSON.stringify로 localStorage에 다시 저장
   4. 카드 테두리 강조 + 하트 채워짐/비워짐 상태를 jQuery로 업데이트
   5. 상단 즐겨찾기 개수(N)를 실시간으로 갱신
============================================================ */


/* ──────────────────────────────────────────────
   1. 상수 정의
   localStorage에 즐겨찾기 배열을 저장할 때 쓸 키 이름.
   고정된 이름을 상수로 선언해 두면 오타를 방지하고 관리가 쉬워짐.
────────────────────────────────────────────── */
var FAV_KEY = 'fitfinder_favorites';
/* localStorage.setItem / getItem 에 쓰는 키.
   'fitfinder_favorites' 처럼 사이트 이름을 앞에 붙이면
   다른 사이트의 localStorage 데이터와 키가 충돌하지 않음. */


/* ──────────────────────────────────────────────
   2. 즐겨찾기 배열 불러오기 함수
   localStorage에서 저장된 JSON 문자열을 읽어 배열로 변환해 반환.
   저장된 값이 없으면 빈 배열([])을 반환.
────────────────────────────────────────────── */
function loadFavorites() {

  var raw = localStorage.getItem(FAV_KEY);
  /* localStorage.getItem(키): 해당 키에 저장된 문자열을 읽음.
     아직 저장된 값이 없으면(처음 방문) null을 반환. */

  if (raw) {
    return JSON.parse(raw);
    /* JSON.parse(문자열): JSON 문자열을 JavaScript 값으로 변환.
       예: '["triangle","hourglass"]' → ['triangle', 'hourglass']
       localStorage는 문자열만 저장 가능하므로 이 변환이 필수. */
  }

  return [];
  /* 저장된 값이 없으면 빈 배열 반환. 첫 방문이거나 초기화된 경우. */
}


/* ──────────────────────────────────────────────
   3. 즐겨찾기 배열 저장 함수
   현재 즐겨찾기 배열을 JSON.stringify로 문자열로 바꾼 뒤 localStorage에 저장.
   이 함수를 호출할 때마다 최신 상태가 localStorage에 반영됨.
────────────────────────────────────────────── */
function saveFavorites(favArray) {

  localStorage.setItem(FAV_KEY, JSON.stringify(favArray));
  /* localStorage.setItem(키, 값): 해당 키에 값(문자열)을 저장.
     JSON.stringify(배열): 배열을 JSON 문자열로 변환.
     예: ['triangle', 'hourglass'] → '["triangle","hourglass"]'
     → 이 문자열이 localStorage에 저장되어 새로고침 후에도 유지됨. */
}


/* ──────────────────────────────────────────────
   4. 즐겨찾기 개수 업데이트 함수
   현재 즐겨찾기 배열의 개수를 화면 상단 카운터 요소(#fav-count)에 반영.
   하트를 클릭할 때마다 이 함수를 호출해 숫자를 실시간으로 갱신.
────────────────────────────────────────────── */
function updateCounter(favArray) {

  $('#fav-count').text(favArray.length);
  /* jQuery .text(값): #fav-count 요소의 텍스트 내용을 배열 길이로 교체.
     favArray.length = 현재 즐겨찾기된 체형의 수.
     예: ['triangle','hourglass'] → length = 2 → "2" 로 표시. */
}


/* ──────────────────────────────────────────────
   5. 카드 즐겨찾기 스타일 적용·해제 함수
   특정 체형(type)의 카드와 하트 버튼에 즐겨찾기 상태를 시각적으로 반영.
   isFav: true → 활성화(채워진 하트 + 카드 테두리 강조)
          false → 비활성화(빈 하트 + 기본 테두리)
────────────────────────────────────────────── */
function applyFavStyle(type, isFav) {

  var $card = $('#' + type);
  /* '#' + type = '#triangle', '#hourglass' 등 카드의 id로 요소 선택.
     각 .image-guide-card 는 id="triangle" 형식의 고유 id를 가짐. */

  var $btn = $card.find('.fav-btn');
  /* jQuery .find(선택자): $card 요소 안에서 .fav-btn 버튼을 찾음.
     .find()는 자식, 손자 등 모든 후손 중에서 검색. */

  if (isFav) {
    /* 즐겨찾기 활성화 */
    $card.addClass('is-fav');
    /* jQuery .addClass(클래스명): 요소에 클래스를 추가.
       카드에 is-fav가 붙으면 CSS에서 빨간 테두리+글로우 효과 적용. */

    $btn.addClass('is-fav');
    /* 버튼에 is-fav가 붙으면 CSS에서 하트가 빨간색으로 채워짐. */

    $btn.attr('title', '즐겨찾기 해제');
    /* jQuery .attr(속성, 값): HTML 속성을 변경.
       title 속성은 마우스를 올렸을 때 나타나는 툴팁 텍스트. */
  } else {
    /* 즐겨찾기 비활성화 */
    $card.removeClass('is-fav');
    /* jQuery .removeClass(클래스명): 요소에서 클래스를 제거.
       카드에서 is-fav가 없어지면 기본 테두리로 돌아옴. */

    $btn.removeClass('is-fav');
    /* 버튼에서 is-fav가 없어지면 하트가 다시 빈(윤곽) 상태로. */

    $btn.attr('title', '즐겨찾기 추가');
  }
}


/* ──────────────────────────────────────────────
   6. 페이지 로드 시 즐겨찾기 복원 함수
   localStorage에서 이전에 저장한 배열을 읽어
   각 카드에 즐겨찾기 스타일을 다시 적용 → 새로고침해도 상태 유지.
────────────────────────────────────────────── */
function restoreFavorites() {

  var favArray = loadFavorites();
  /* localStorage에서 저장된 즐겨찾기 배열 읽기 */

  $.each(favArray, function(index, type) {
  /* $.each(배열, 함수): jQuery 반복문.
     favArray를 순서대로 돌며 index(번호)와 type(체형 id)를 꺼냄. */

    applyFavStyle(type, true);
    /* 저장된 각 체형 카드에 즐겨찾기 스타일 적용 */
  });

  updateCounter(favArray);
  /* 복원한 즐겨찾기 개수를 카운터에 표시 */
}


/* ──────────────────────────────────────────────
   7. jQuery 이벤트 바인딩
   $(document).ready(): HTML DOM이 모두 로드된 후 실행.
   카드와 버튼 요소가 준비된 후 이벤트를 연결해야 정상 동작.
────────────────────────────────────────────── */
$(document).ready(function() {
/* $(document).ready(함수): 페이지의 HTML 구조가 전부 준비된 후 안의 코드 실행.
   이 안에서 DOM 요소를 찾거나 이벤트를 연결해야 "요소를 찾지 못하는" 오류 방지. */


  /* ── 페이지 로드 시 이전 즐겨찾기 복원 ── */
  restoreFavorites();
  /* 이 한 줄 덕분에 새로고침해도 즐겨찾기 상태가 그대로 유지됨.
     localStorage → 배열 읽기 → 각 카드에 스타일 적용까지 자동 처리. */


  /* ── 하트 버튼 클릭 이벤트 (이벤트 위임 방식) ── */
  $('.guide-grid').on('click', '.fav-btn', function(e) {
  /* 이벤트 위임(Event Delegation) 방식:
     .fav-btn 버튼들이 모두 .guide-grid 안에 있으므로
     부모(.guide-grid)에 이벤트를 걸고, 실제 클릭 대상이
     '.fav-btn'일 때만 실행되도록 필터링.
     → 버튼 개수만큼 이벤트를 따로 연결하는 것보다 효율적. */

    e.stopPropagation();
    /* 이벤트 전파(Bubbling) 차단.
       클릭 이벤트는 자식 → 부모 방향으로 퍼지는데(버블링),
       하트 버튼 클릭이 카드 클릭 이벤트로 이어지지 않도록 막음. */

    var $btn = $(this);
    /* $(this): 지금 클릭된 .fav-btn 버튼 요소를 jQuery 객체로 감쌈. */

    var $card = $btn.closest('.image-guide-card');
    /* jQuery .closest(선택자): 클릭된 버튼에서 DOM 트리를 위로 올라가며
       가장 가까운 .image-guide-card 조상 요소를 찾음.
       하트 버튼이 카드 안에 있으므로 반드시 찾을 수 있음. */

    var type = $card.attr('id');
    /* 카드의 id 속성 읽기 (예: 'triangle', 'hourglass').
       이 id가 즐겨찾기 배열에 저장되는 식별값. */

    /* 현재 localStorage에서 최신 즐겨찾기 배열 불러오기 */
    var favArray = loadFavorites();

    var idx = favArray.indexOf(type);
    /* Array.indexOf(값): 배열에서 해당 값의 위치(인덱스)를 반환.
       찾으면 0 이상의 숫자(인덱스), 없으면 -1 반환.
       예: ['triangle'].indexOf('triangle') → 0
           ['triangle'].indexOf('hourglass') → -1 */

    if (idx === -1) {

      /* ── 즐겨찾기 추가 ── */
      favArray.push(type);
      /* Array.push(값): 배열 맨 끝에 값을 추가. 원본 배열이 직접 변경됨.
         예: [].push('triangle') → ['triangle'] */

      applyFavStyle(type, true);
      /* 카드에 빨간 테두리, 버튼에 채워진 하트 스타일 적용 */

    } else {

      /* ── 즐겨찾기 해제 ── */
      favArray.splice(idx, 1);
      /* Array.splice(시작인덱스, 제거할개수): 해당 위치에서 1개 제거.
         예: ['triangle','hourglass'].splice(0, 1) → ['hourglass']
         원본 배열이 직접 변경됨. */

      applyFavStyle(type, false);
      /* 카드에서 강조 테두리, 버튼에서 채워진 하트 스타일 제거 */
    }

    saveFavorites(favArray);
    /* 변경된 배열을 localStorage에 저장.
       이 시점부터 새로고침해도 방금 설정한 상태가 유지됨. */

    updateCounter(favArray);
    /* 화면 상단 즐겨찾기 개수 업데이트 */

  }); /* .fav-btn 클릭 이벤트 끝 */


}); /* $(document).ready 끝 */
