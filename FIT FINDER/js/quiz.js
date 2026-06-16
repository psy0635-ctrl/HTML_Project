/* ============================================================
   quiz.js — 체형 진단 퀴즈 (FIT FINDER)

   사용 라이브러리: jQuery 3.7.1
   jQuery는 index.html에서 이 파일보다 먼저 로드됨.

   동작 흐름:
   1. "체형 진단 시작하기" 버튼 클릭
      → 인트로 영역(.quiz-intro)을 jQuery fadeOut으로 숨김
      → 문항 영역(#quiz-body)을 jQuery fadeIn으로 표시
   2. 보기 클릭 시 해당 체형 점수에 +값 추가
      → 현재 문항을 fadeOut → 다음 문항을 fadeIn
   3. 5문항 완료 후 점수 합산
      → 가장 높은 점수의 체형을 최종 결과로 결정
   4. 결과 화면(#quiz-result)을 fadeIn으로 표시
      → 이미지, 이름, 설명, 추천 핏을 자동으로 삽입
   5. "다시 진단하기" 버튼 클릭 시 초기 상태로 리셋
============================================================ */


/* ──────────────────────────────────────────────
   1. 체형 데이터 객체
   guide.html 각 체형 카드의 .fit-box(추천 핏) 내용을 그대로 가져와 작성.
   key : 체형 식별자(영소문자)
   value: 결과 화면에 표시할 번호·이름·설명·이미지·추천핏·링크
────────────────────────────────────────────── */
var bodyTypeData = {

  /* 삼각형 체형 */
  triangle: {
    number : '01',                          /* 체형 번호 */
    name   : 'Triangle',                    /* 체형 이름 */
    desc   : '하체가 상대적으로 발달한 체형', /* 한 줄 설명 */
    image  : './images/Triangle.jpg',       /* 체형 이미지 경로 */
    fit    : '어깨 라인이 강조된 자켓, 밝은 상의 + 어두운 하의, A라인 스커트, 크롭 상의로 상체 비율 강조',
    /* guide.html #triangle .fit-box(추천 핏) 텍스트 */
    link   : 'guide.html#triangle'          /* Guide 페이지 해당 앵커 */
  },

  /* 역삼각형 체형 */
  inverted: {
    number : '02',
    name   : 'Inverted',
    desc   : '어깨가 넓고 하체가 슬림한 체형',
    image  : './images/Inverted Triangle.jpg',
    /* 파일명에 공백이 있음 — 브라우저는 공백도 경로로 인식하므로 그대로 사용 */
    fit    : '와이드 팬츠, 플레어 스커트, A라인 하의로 하체에 볼륨을 더해 전체 균형을 맞춤',
    link   : 'guide.html#inverted'
  },

  /* 직사각형 체형 */
  rectangle: {
    number : '03',
    name   : 'Rectangle',
    desc   : '상체와 하체 폭이 비슷한 직선형 체형',
    image  : './images/Rectangle.webp',     /* .webp 확장자 주의 */
    fit    : '벨트, 크롭 자켓, 하이웨스트 팬츠, 랩 스타일로 허리선을 만들어 입체감 추가',
    link   : 'guide.html#rectangle'
  },

  /* 모래시계 체형 */
  hourglass: {
    number : '04',
    name   : 'Hourglass',
    desc   : '허리선이 뚜렷하고 균형 잡힌 체형',
    image  : './images/Hourglass.jpg',
    fit    : '허리 라인이 드러나는 슬림핏, 하이웨스트, 벨티드 자켓으로 자연스러운 비율 강조',
    link   : 'guide.html#hourglass'
  },

  /* 둥근 체형 */
  round: {
    number : '05',
    name   : 'Round',
    desc   : '상체 중심에 볼륨이 있는 체형',
    image  : './images/Round.jpg',
    fit    : '롱 아우터, V넥 상의, 스트레이트 팬츠, 세로 라인을 강조해 전체 실루엣을 정리',
    link   : 'guide.html#round'
  },

  /* 사다리꼴 체형 */
  trapezoid: {
    number : '06',
    name   : 'Trapezoid',
    desc   : '전체 균형이 안정적인 체형',
    image  : './images/Trapezoid.jpg',
    fit    : '테일러드 자켓, 슬림 스트레이트 팬츠, 셋업 스타일로 깔끔하고 정돈된 실루엣 유지',
    link   : 'guide.html#trapezoid'
  }
};


/* ──────────────────────────────────────────────
   2. 퀴즈 문항 배열
   각 문항(question)과 선택지(choices) 객체 배열.
   choices[i].scores = { 체형키: 점수 } 형식으로,
   해당 선택지 클릭 시 그 체형의 총점에 값을 더함.
────────────────────────────────────────────── */
var questions = [

  /* ── 문항 1: 어깨 vs 엉덩이 너비 비교 ── */
  {
    question: 'Q1. 어깨와 엉덩이(골반) 너비를 비교하면 어떤가요?',
    /* 어깨 넓은 inverted ↔ 하체 넓은 triangle 을 가장 잘 구분하는 질문 */
    choices: [
      {
        text  : '어깨가 엉덩이보다 뚜렷이 넓다',
        scores: { inverted: 2 }
        /* 어깨가 발달한 역삼각형 체형에 강한 점수 */
      },
      {
        text  : '엉덩이가 어깨보다 뚜렷이 넓다',
        scores: { triangle: 2 }
        /* 하체가 발달한 삼각형 체형에 강한 점수 */
      },
      {
        text  : '어깨와 엉덩이 폭이 비슷하다',
        scores: { rectangle: 1, hourglass: 1, trapezoid: 1 }
        /* 상하체가 비슷한 경우 → 직사각형·모래시계·사다리꼴 가능성 */
      },
      {
        text  : '잘 모르겠다 / 크게 차이 없는 것 같다',
        scores: { round: 1, rectangle: 1 }
        /* 특징이 불분명하면 둥근형이나 직사각형 가능성 */
      }
    ]
  },

  /* ── 문항 2: 허리 라인 뚜렷함 ── */
  {
    question: 'Q2. 허리 라인(잘록한 정도)은 어떤가요?',
    /* hourglass(뚜렷) / rectangle(일자) / round(배가 나옴) 를 구분 */
    choices: [
      {
        text  : '뚜렷하게 잘록한 허리 라인이 있다',
        scores: { hourglass: 2 }
        /* 모래시계 체형의 핵심 특징: 잘록한 허리 */
      },
      {
        text  : '약간 들어가는 편이다',
        scores: { trapezoid: 1, triangle: 1 }
        /* 약간 있는 경우 → 사다리꼴 또는 삼각형 */
      },
      {
        text  : '허리 라인이 거의 없는 일자형이다',
        scores: { rectangle: 2 }
        /* 직사각형 체형의 핵심 특징: 허리선 없는 일자형 */
      },
      {
        text  : '배가 나와 있어 허리선이 잘 보이지 않는다',
        scores: { round: 2 }
        /* 둥근 체형의 핵심 특징: 복부 돌출 */
      }
    ]
  },

  /* ── 문항 3: 살이 붙는 위치 ── */
  {
    question: 'Q3. 살이 주로 어느 부위에 붙는 편인가요?',
    /* 살 축적 부위는 체형 특성을 직접적으로 반영함 */
    choices: [
      {
        text  : '허벅지·엉덩이 등 하체에 주로 붙는다',
        scores: { triangle: 2 }
        /* 하체 발달 → 삼각형 */
      },
      {
        text  : '어깨·팔·등 상체에 주로 붙는다',
        scores: { inverted: 1, round: 1 }
        /* 상체 발달 → 역삼각형 또는 둥근형 */
      },
      {
        text  : '배·복부 중심으로 붙는다',
        scores: { round: 2 }
        /* 복부 중심 → 둥근 체형 */
      },
      {
        text  : '온몸에 고르게 붙는 편이다',
        scores: { trapezoid: 1, rectangle: 1, hourglass: 1 }
        /* 균등 분포 → 사다리꼴·직사각형·모래시계 가능 */
      }
    ]
  },

  /* ── 문항 4: 상체와 하체 볼륨 비율 ── */
  {
    question: 'Q4. 상체와 하체의 볼륨(크기) 비율은 어떤가요?',
    /* inverted(상체 큼) / triangle(하체 큼) / round(복부 큼) 추가 확인 */
    choices: [
      {
        text  : '상체가 크고 하체가 가는 편이다',
        scores: { inverted: 2 }
        /* 상체 발달·하체 슬림 → 역삼각형 */
      },
      {
        text  : '하체가 크고 상체가 작은 편이다',
        scores: { triangle: 2 }
        /* 하체 발달·상체 작음 → 삼각형 */
      },
      {
        text  : '상하체 볼륨이 전체적으로 비슷하다',
        scores: { rectangle: 1, hourglass: 1, trapezoid: 1 }
        /* 균형형 → 직사각형·모래시계·사다리꼴 */
      },
      {
        text  : '복부·중간 부분이 가장 볼륨 있다',
        scores: { round: 2 }
        /* 복부 돌출 → 둥근 체형 */
      }
    ]
  },

  /* ── 문항 5: 전체 실루엣 인상 ── */
  {
    question: 'Q5. 전체적인 체형 인상을 가장 잘 표현한 것은?',
    /* 최종 문항: hourglass · trapezoid · rectangle · round 를 최종 구분 */
    choices: [
      {
        text  : '허리가 잘록하고 상하 균형이 아름답다',
        scores: { hourglass: 2 }
        /* 모래시계 최종 확인 */
      },
      {
        text  : '어깨가 적당히 넓고 전체 비율이 안정적이다',
        scores: { trapezoid: 2 }
        /* 사다리꼴 최종 확인 */
      },
      {
        text  : '위아래 폭이 비슷하고 전체적으로 곧은 라인이다',
        scores: { rectangle: 2 }
        /* 직사각형 최종 확인 */
      },
      {
        text  : '배 또는 상체 중심이 가장 두드러진다',
        scores: { round: 2 }
        /* 둥근 체형 최종 확인 */
      }
    ]
  }

];


/* ──────────────────────────────────────────────
   3. 퀴즈 상태 변수
   현재 문항 번호와 각 체형별 점수를 관리
────────────────────────────────────────────── */

var currentQuestion = 0;
/* 현재 보여지는 문항의 인덱스 (0부터 시작).
   0 = 첫 번째 문항, 4 = 다섯 번째(마지막) 문항 */

var scores = {};
/* 6개 체형별 점수를 담는 객체.
   예: { triangle: 0, inverted: 2, rectangle: 1, hourglass: 0, round: 0, trapezoid: 0 }
   가장 높은 점수의 체형이 최종 진단 결과가 됨 */


/* ──────────────────────────────────────────────
   4. 점수 초기화 함수
   퀴즈를 시작하거나 다시 시작할 때 모든 체형 점수를 0으로 리셋
────────────────────────────────────────────── */
function initScores() {
  scores = {
    triangle  : 0,  /* 삼각형 체형 점수 */
    inverted  : 0,  /* 역삼각형 체형 점수 */
    rectangle : 0,  /* 직사각형 체형 점수 */
    hourglass : 0,  /* 모래시계 체형 점수 */
    round     : 0,  /* 둥근 체형 점수 */
    trapezoid : 0   /* 사다리꼴 체형 점수 */
  };
}


/* ──────────────────────────────────────────────
   5. 문항 렌더링 함수
   currentQuestion 번호에 맞는 문항과 선택지를 화면에 출력
────────────────────────────────────────────── */
function renderQuestion() {

  /* 현재 문항 데이터를 questions 배열에서 가져옴 */
  var q = questions[currentQuestion];

  /* 진행률 숫자 업데이트: "현재번호 / 전체수" 형식 */
  $('#quiz-current').text(currentQuestion + 1);  /* 0-index이므로 +1 해서 표시 */
  $('#quiz-total').text(questions.length);        /* 전체 문항 수 (5) */

  /* 진행 막대 너비 계산: 현재 문항이 진행된 비율(%) */
  var progressPercent = ((currentQuestion + 1) / questions.length) * 100;
  /* 예: 문항 1 → 20%, 문항 3 → 60%, 문항 5 → 100% */

  $('#quiz-bar-fill').css('width', progressPercent + '%');
  /* jQuery .css()로 CSS width 속성을 동적으로 변경
     CSS transition이 설정되어 있어 부드럽게 늘어남 */

  /* 문항 텍스트를 화면에 삽입 */
  $('#quiz-question').text(q.question);
  /* jQuery .text()는 HTML 태그 없이 순수 텍스트를 안전하게 삽입 */

  /* 선택지 버튼 영역 초기화 후 새 선택지 삽입 */
  var $choices = $('#quiz-choices');
  $choices.empty();
  /* .empty()는 해당 요소의 자식 요소들을 모두 제거 */

  /* 각 선택지에 대해 버튼을 동적으로 생성 */
  $.each(q.choices, function(index, choice) {
  /* $.each(배열, 함수): jQuery 반복문.
     q.choices 배열을 순서대로 돌며 index(번호)와 choice(데이터)를 꺼냄 */

    var $btn = $('<button>')             /* 새 <button> 요소 생성 */
      .addClass('quiz-choice-btn')       /* CSS 클래스 추가 */
      .text(choice.text)                 /* 버튼에 선택지 텍스트 삽입 */
      .data('scores', choice.scores);
    /* .data(키, 값): 버튼에 점수 데이터를 숨겨서 저장.
       DOM에는 보이지 않지만 클릭 시 꺼내 쓸 수 있음.
       직접 속성으로 넣으면 object를 문자열로 변환해야 하는데 .data()는 그대로 저장. */

    $choices.append($btn);
    /* 생성한 버튼을 선택지 컨테이너에 추가 */
  });
}


/* ──────────────────────────────────────────────
   6. 다음 문항으로 이동 함수
   선택지 클릭 → 점수 반영 → fadeOut → 다음 문항 렌더링 → fadeIn
────────────────────────────────────────────── */
function nextQuestion(choiceScores) {

  /* 선택한 보기의 점수를 전체 점수 객체(scores)에 반영 */
  $.each(choiceScores, function(type, value) {
  /* choiceScores 예: { triangle: 2 }
     $.each로 key(type)='triangle', value=2 를 꺼내서 scores에 더함 */
    scores[type] = (scores[type] || 0) + value;
    /* 해당 체형 점수가 undefined이면 0으로 초기화한 뒤 더함 */
  });

  currentQuestion++;
  /* 다음 문항으로 이동: currentQuestion 1 증가 */

  if (currentQuestion >= questions.length) {
  /* 모든 문항을 완료했으면 결과 화면으로 이동 */
    showResult();
    return;
    /* return으로 함수 종료 (아래 코드가 실행되지 않도록) */
  }

  /* 아직 문항이 남아있으면: fadeOut → 다음 문항 렌더링 → fadeIn */
  var $quizBody = $('#quiz-body');

  $quizBody.fadeOut(200, function() {
  /* .fadeOut(시간ms, 콜백): 200ms 동안 서서히 사라짐.
     완전히 사라진 후 콜백 함수 실행 → 내용 교체 후 다시 보여줌 */
    renderQuestion();      /* 다음 문항 내용을 새로 렌더링 */
    $quizBody.fadeIn(250); /* 250ms 동안 서서히 나타남 */
  });
}


/* ──────────────────────────────────────────────
   7. 결과 계산 및 표시 함수
   점수 객체에서 최고점 체형을 찾아 결과 화면에 데이터 삽입 후 fadeIn
────────────────────────────────────────────── */
function showResult() {

  /* 가장 높은 점수의 체형 찾기 */
  var topType  = null;  /* 최고점 체형의 키 (예: 'hourglass') */
  var topScore = -1;    /* 비교용 최고 점수 (-1로 시작해서 0점 체형도 처리) */

  $.each(scores, function(type, score) {
  /* scores 객체를 순회하며 최고 점수 체형을 찾음 */
    if (score > topScore) {
      topScore = score;  /* 현재까지의 최고 점수 갱신 */
      topType  = type;   /* 최고 점수 체형 갱신 */
    }
  });

  /* 모든 점수가 0인 경우 기본값 설정 (이론상 발생 안 함) */
  if (!topType) { topType = 'trapezoid'; }

  /* 해당 체형의 데이터를 bodyTypeData 객체에서 가져옴 */
  var data = bodyTypeData[topType];

  /* 결과 화면의 각 요소에 데이터 삽입 */
  $('#quiz-result-num').text(data.number);         /* 체형 번호 (예: 04) */
  $('#quiz-result-name').text(data.name);          /* 체형 이름 (예: Hourglass) */
  $('#quiz-result-desc').text(data.desc);          /* 체형 한 줄 설명 */
  $('#quiz-result-fit').text(data.fit);            /* 추천 핏 내용 */
  $('#quiz-result-img').attr('src', data.image);   /* 이미지 경로를 src에 삽입 */
  $('#quiz-result-img').attr('alt', data.name + ' 체형 이미지'); /* alt 텍스트 */
  $('#quiz-guide-link').attr('href', data.link);   /* Guide 페이지 앵커 링크 */
  /* jQuery .attr(속성명, 값): HTML 속성을 동적으로 변경하는 메서드 */

  /* 문항 화면을 즉시 숨기고 결과 화면을 fadeIn으로 표시 */
  $('#quiz-body').hide();
  /* .hide(): display:none 으로 즉시 숨김 (애니메이션 없음) */

  $('#quiz-result').fadeIn(400);
  /* 400ms 동안 결과 화면이 서서히 나타남 */
}


/* ──────────────────────────────────────────────
   8. 퀴즈 초기화 함수
   "다시 진단하기" 버튼 클릭 시 퀴즈를 처음 상태로 되돌림
────────────────────────────────────────────── */
function resetQuiz() {

  currentQuestion = 0;  /* 문항 인덱스를 첫 번째로 리셋 */
  initScores();          /* 모든 체형 점수를 0으로 리셋 */

  /* 결과 화면을 즉시 숨기고 인트로 화면을 fadeIn으로 표시 */
  $('#quiz-result').hide();
  $('#quiz-intro').fadeIn(300);
  /* 300ms 동안 인트로 화면이 서서히 나타남 */
}


/* ──────────────────────────────────────────────
   9. jQuery 이벤트 바인딩
   $(document).ready(): HTML DOM이 모두 로드된 후 실행.
   이 안에서 버튼 클릭 이벤트를 연결해야 요소를 찾을 수 있음.
────────────────────────────────────────────── */
$(document).ready(function() {
/* $(document).ready(함수): HTML이 준비된 후 안의 코드 실행.
   스크립트가 </body> 직전에 있어도 습관적으로 감싸면 안전. */


  /* ── 시작 버튼 클릭 이벤트 ── */
  $('#quiz-start-btn').on('click', function() {
  /* .on('click', 함수): 요소에 클릭 이벤트를 연결하는 jQuery 메서드 */

    initScores();           /* 점수를 모두 0으로 초기화 */
    currentQuestion = 0;    /* 첫 번째 문항부터 시작 */
    renderQuestion();       /* 첫 번째 문항 화면을 렌더링 */

    /* 인트로 화면 fadeOut 후 문항 화면 fadeIn */
    $('#quiz-intro').fadeOut(250, function() {
    /* 250ms 동안 인트로 화면이 사라진 후 콜백 실행 */
      $('#quiz-body').fadeIn(300);
      /* 300ms 동안 문항 화면이 서서히 나타남 */
    });
  });


  /* ── 선택지 버튼 클릭 이벤트 (이벤트 위임 방식) ── */
  $('#quiz-choices').on('click', '.quiz-choice-btn', function() {
  /* 이벤트 위임(Event Delegation) 사용 이유:
     .quiz-choice-btn 버튼은 JS가 동적으로 생성하기 때문에
     페이지 로드 시점에는 존재하지 않아 직접 이벤트를 연결할 수 없음.
     대신 항상 존재하는 부모(#quiz-choices)에 이벤트를 걸고,
     실제 클릭 대상이 '.quiz-choice-btn'일 때만 동작하도록 필터링. */

    var choiceScores = $(this).data('scores');
    /* $(this): 클릭된 버튼 요소를 jQuery 객체로 감쌈.
       .data('scores'): renderQuestion()에서 버튼에 저장해둔 점수 데이터를 꺼냄 */

    nextQuestion(choiceScores);
    /* 점수 반영 후 다음 문항으로 이동 (또는 결과 표시) */
  });


  /* ── 다시 진단하기 버튼 클릭 이벤트 ── */
  $('#quiz-reset-btn').on('click', function() {
    resetQuiz();  /* 퀴즈 초기화 함수 호출 */
  });


}); /* $(document).ready 끝 */
