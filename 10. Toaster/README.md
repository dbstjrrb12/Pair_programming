# Toaster

## 개선 사항

- close 버튼 entity를 innerHTML이 아닌 다른 방법으로 삽입하는 방식은 없는지?

- toast 생성시 body에 가로스크롤이 발생하는 것을 방지하기 위해 body의 `overflow: hidden` 방식을 사용했는데, 다른 방법은 없는지?

- toast가 3초 후에 삭제되게 하기 위한 setTimeout에서 `getElemntsByClassName` 메서드가 아닌 다른 방식으로 toast에 접근하는 방법은 없는지

- toast 생성시 높이를 계산해서 bottom 의 위치를 조정하게 되면 리플로우가 발생함. 이를 개선하기 위한 방식은 없는지?
