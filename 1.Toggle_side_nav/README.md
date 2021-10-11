# Toggle button

## 구현 내용

토글 버튼을 클릭하면 네비게이션 요소가 옆에 등장하도록 구현하라.

리로드(reload) 시에도, 해당 상태가 저장되도록 구현하시오

## 구현 방향

1. 첫 로드 시 토글 상태를 localstorage(window 객체 프로퍼티) toggle 상태 값을 통해 가져온 후, classList에 반영한다.

2. container 요소에 onclick 이벤트를 등록한다.

3. 하위 아이콘 요소에 이벤트가 발생하면, active 클래스 이름을 classList에 추가하고 localstorage에 반영한다.

   - 리로드 시 transition이 발생하지 않도록, notransition 클래스 이름을 navigation, icon, main 요소노드에 추가한다.

   - 만약, active 클래스가 등록되 이후 클릭이벤트 발생 시 이미 등록된 notransition 클래스 이름을 제거한다.

## 개선 사항

- onclick 이벤트에서 발생하는 toggle 및 remove 로직을 조건문을 사용한 하나의 함수로 구현해 코드를 좀 더 간결하고 가독성 높게 만들 수 있을 것으로 생각됨.

- if 조건문을 사용한 부분은 삼항 연산 조건문을 통해 가독성을 높일 수 있을 것으로 생각됨.

[Reference - 1](https://stackoverflow.com/questions/45348222/keep-list-toggle-state-on-page-refresh)

[Reference - 2](https://stackoverflow.com/questions/65693981/keeping-toggle-position-on-page-refresh)
