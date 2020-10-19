![Tick Tack Toe](/띡땍또play.gif)

> 🚨 바닐라코딩에서 과제로 한 것 입니다.

# Tick Tack Toe Project

## 과제에서 자바스크립트로 이미지 작업하는 방법

아래 방법은 자바스크립트를 이용하는 상황에만 적용되며, HTML에서 이미지를 추가하는 것은 기존에 알고 계시는 것처럼 진행하시면 됩니다.

```js
// 이미지 경로에 따라 아래와 같은 구문 삽입
// `yourImageName` 부분은 사용하는 이미지의 이름을 지어서 넣어주세요.
import yourImageName from "../images/vc.png";

var $something = document.querySelector(".main-logo");

// 이렇게 이미지 요소의 `src` 속성을 추가할 수 있습니다.
$something.src = yourImageName;
```

## TODO

- [ ] 배타고 중급 만들기
- [ ] js에서 css수정하지 않게 class로 나누기
