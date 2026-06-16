/* ============================================================
   toggle.js — 추천 핏 ↔ 비추천 핏 토글 기능 (FIT FINDER - Guide)

   사용 라이브러리: jQuery 3.7.1
   jQuery와 favorites.js 는 guide.html에서 이 파일보다 먼저 로드됨.

   동작 흐름:
   1. 페이지 로드 시 모든 카드의 두 번째 .fit-box(비추천 핏)를 .hide()로 숨김
      → 기본 상태에서는 추천 핏만 보임
   2. 버튼 클릭 시 해당 카드 안의 두 .fit-box를 .fadeToggle()로 교차 전환
      → 추천 핏이 사라지면서 비추천 핏이 나타남 (또는 반대)
   3. 버튼 라벨도 상태에 맞게 변경: "비추천 핏 보기" ↔ "추천 핏 보기"
   4. 각 카드의 토글은 독립적으로 동작 — 한 카드 토글이 다른 카드에 영향 없음
============================================================ */


/* ──────────────────────────────────────────────
   1. jQuery DOM 준비 후 실행
   페이지의 HTML 구조가 전부 로드된 뒤 코드 실행.
   카드·버튼 요소들이 준비돼야 .find()나 이벤트 연결이 정상 동작.
────────────────────────────────────────────── */
$(document).ready(function() {
/* $(document).ready(함수): HTML DOM이 준비된 후에 안의 코드 실행.
   <script>가 </body> 직전에 있어도 이 안에서 DOM을 다루면 안전. */


  /* ──────────────────────────────────────────────
     2. 페이지 로드 시: 모든 카드의 비추천 핏(.fit-box 두 번째)을 숨김
     기본 상태에서는 "추천 핏"만 보이도록 설정.
  ────────────────────────────────────────────── */
  $('.image-guide-card').each(function() {
  /* jQuery .each(함수): 선택된 요소들을 하나씩 순회.
     $('.image-guide-card') = 6개 체형 카드를 모두 선택.
     each로 카드 하나씩 처리 → 카드마다 .fit-box 두 번째를 개별로 숨김. */

    $(this).find('.fit-box').eq(1).hide();
    /* $(this)        : each 콜백 안에서 현재 순회 중인 카드 요소
       .find('.fit-box') : 이 카드 안의 .fit-box 요소들만 선택
                           → 다른 카드의 .fit-box는 절대 선택하지 않음
       .eq(1)         : 0-index 기준 두 번째 요소 (비추천 핏 박스)
                         eq(0) = 추천 핏, eq(1) = 비추천 핏
       .hide()        : display:none으로 즉시 숨김 (애니메이션 없음)
       → 페이지 로드 시 비추천 핏이 처음부터 안 보이도록 */
  });


  /* ──────────────────────────────────────────────
     3. 토글 버튼 클릭 이벤트 (이벤트 위임 방식)
     버튼이 .guide-grid 안에 있으므로 부모에 이벤트를 걸고 필터링.
  ────────────────────────────────────────────── */
  $('.guide-grid').on('click', '.toggle-fit-btn', function() {
  /* 이벤트 위임(Event Delegation):
     .toggle-fit-btn 버튼들이 모두 .guide-grid 안에 있으므로
     부모(.guide-grid)에 이벤트를 걸고,
     실제 클릭된 대상이 '.toggle-fit-btn'일 때만 실행.
     → 버튼 6개 각각에 이벤트를 따로 연결하는 것보다 간결하고 효율적. */

    var $btn = $(this);
    /* $(this): 지금 클릭된 .toggle-fit-btn 버튼을 jQuery 객체로 감쌈. */

    var $card = $btn.closest('.image-guide-card');
    /* jQuery .closest(선택자): 클릭된 버튼에서 DOM 트리를 위로 올라가며
       가장 가까운 .image-guide-card 조상 요소를 찾음.
       → 이 줄 덕분에 클릭된 카드 안의 .fit-box 만 대상으로 할 수 있음.
       → 다른 카드에는 절대 영향을 주지 않음. */

    var $recommend    = $card.find('.fit-box').eq(0);
    /* 이 카드 안의 첫 번째 .fit-box = 추천 핏 박스
       .find('.fit-box') → 이 카드 내부에서만 .fit-box를 검색 (다른 카드 제외)
       .eq(0) → 0번 인덱스 = 첫 번째 = 추천 핏 */

    var $notRecommend = $card.find('.fit-box').eq(1);
    /* 이 카드 안의 두 번째 .fit-box = 비추천 핏 박스
       .eq(1) → 1번 인덱스 = 두 번째 = 비추천 핏 */


    /* ── 두 .fit-box를 fadeToggle로 교차 전환 ── */
    $recommend.fadeToggle(280);
    /* jQuery .fadeToggle(시간ms):
       - 현재 보이는 상태이면 → 서서히 사라짐 (fadeOut)
       - 현재 숨겨진 상태이면 → 서서히 나타남 (fadeIn)
       첫 번째 클릭: 추천 핏이 보이는 상태 → fadeOut(사라짐)
       두 번째 클릭: 추천 핏이 숨겨진 상태 → fadeIn(나타남) */

    $notRecommend.fadeToggle(280);
    /* 비추천 핏도 동일하게 fadeToggle 적용.
       첫 번째 클릭: 비추천 핏이 숨겨진 상태 → fadeIn(나타남)
       두 번째 클릭: 비추천 핏이 보이는 상태 → fadeOut(사라짐)
       → 두 박스가 동시에 fadeToggle되어 자연스러운 교차(cross-fade) 효과. */


    /* ── 버튼 라벨·title 속성 전환 ── */
    if ($btn.hasClass('showing-bad')) {
    /* jQuery .hasClass(클래스명): 요소에 해당 클래스가 있으면 true 반환.
       'showing-bad' 클래스가 있다 = 현재 비추천 핏이 표시 중인 상태. */

      /* 비추천 핏 표시 중 → 추천 핏으로 전환 */
      $btn.removeClass('showing-bad');
      /* 버튼에서 'showing-bad' 클래스 제거 → CSS 빨간 강조 해제 */

      $btn.text('비추천 핏 보기');
      /* jQuery .text(값): 버튼 텍스트를 "비추천 핏 보기"로 변경
         → 다음 클릭 시 비추천 핏으로 이동할 것임을 사용자에게 안내 */

      $btn.attr('title', '비추천 핏 보기로 전환');
      /* title 속성(툴팁) 업데이트 */

    } else {

      /* 추천 핏 표시 중 → 비추천 핏으로 전환 */
      $btn.addClass('showing-bad');
      /* 버튼에 'showing-bad' 클래스 추가 → CSS 빨간 색조 스타일 적용 */

      $btn.text('추천 핏 보기');
      /* 버튼 텍스트를 "추천 핏 보기"로 변경
         → 다음 클릭 시 추천 핏으로 돌아올 것임을 안내 */

      $btn.attr('title', '추천 핏 보기로 전환');
    }

  }); /* .toggle-fit-btn 클릭 이벤트 끝 */


}); /* $(document).ready 끝 */
