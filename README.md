# Roller Left

`roller_left.js`内部通过`requestAnimationFrame`和`transition:transform3d`控制文字的水平滚动显示，基于原生js实现无任何依赖。

## 基础用法

```js
new RollerLeft({
    nodes: document.getElementById('notice').children
}).start();
```

## 更多参数

```js
var RL = new RollerLeft({
    nodes: document.getElementById('notice').children,
    speed: 1,
    gap: 60,
    pauseCount:60,
    pausePos: 16
});
RL.start();
setTimeout(function() {
    console.log('time out: stop')
    RL.stop();
}, 2000);
setTimeout(function() {
    console.log('time out: start')
    RL.start();
}, 5000);
```

## 实现原理

```html
<div id="notice">
    <div class="notice-item">恭喜 南京邵先生 手机137****5349 获得华为P30手机一部</div>
    <div class="notice-item">恭喜 南京赵先生 手机173****6619 获得华为P30手机一部</div>
</div>
```

```css
#notice {
    position: absolute;
    top:2%;
    color:#fff;
    visibility: hidden;
    width: 100%;
    height: 40px;
    overflow-x: hidden;
    margin: auto 0;
}
.notice-item {
    position: absolute;
    white-space: nowrap;
    transition: transform 0ms linear;
}
```

