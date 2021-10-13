# Accordian

## 개선 사항

- 클릭 이벤트 시, active 클래스를 부여하고 height 값을 부여하는 로직이 if... else 문으로 묶여 가독성이 좋지 않다.

- 따라서 클릭 이벤트에 대한 로직을 간결하고 가독성 있게 줄일 수 있는 방법에 대해 생각해야 한다.

- 초기 랜더링 시, transition 효과를 주지 않기 위해서 render 함수 내부에 active 클래스를 가지는 container의 submenu transition을 제거한 후, height를 부여했는데, 이 방법이 적절한지 고민이 필요하다.
