# Counter

## 구현 내용

- counter의 증가 / 감소 버튼을 구현한다. 단, count는 정보 은닉화로 안전하게 상태를 유지한다.

## 구현 방향

- counter의 증가 / 감소 버튼을 구현한다.

  > 단, 감소(decrease) 버튼을 구현할 경우 count 값이 음수인지 확인하여, 0 이하로 내려가지 않도록 조건을 추가한다.

- 해당 count 값은 클로저를 이용해 정보 은닉화 한다.

  > 증가 함수인 increase와 감소 함수인 decrease, count 값을 받아오는 getCount 함수를 메서드로 갖는 객체를 즉시 실행 함수를 통해 count에 반환한다.

  > 즉시 실행 함수 내부에 count 식별자를 선언하여, 해당 메서드들이 즉시실행 함수 렉시컬 환경을 참조하도록 한다.

## 개선 사항
