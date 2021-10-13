# Carousel Slider

## 핵심 구현 사항

- transitionend event 에 대해 캐치하여 다른 이벤트가 현재 이벤트를 침범하지 못하도록 제어권 부여하기.

## 개선 사항

- 버튼 이벤트 if...else 문에 대해 중복된 코드 제거

- carousel 함수를 작은 단위로 쪼개기

- 중복된 코드 식별자로 할당하여 재사용하기.

- 요소 추가 시, createElement 메서드를 호출하는 방식보다 innerHTML 방식이 가독성 면에서 우수하다면, 해당 방식을 사용하자.
