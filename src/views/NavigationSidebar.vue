<template>
  <div class="navigation-sidebar">
    <!-- 导航栏内容 -->
    <ul>
      <li>公安數位儀表板</li>
      <li>衛生數位儀表板</li>
      <li>環安數位儀表板</li>

      <!-- ... -->
    </ul>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative; /* 设置相对定位 */
  height: 100vh; /* 高度占满整个屏幕 */
}

.navigation-sidebar {
  position: absolute; /* 设置绝对定位 */
  top: 0;
  left: 0;
  width: 500px; /* 导航栏的宽度 */
  height: 100%; /* 高度占满整个屏幕 */
  background-color: #4b4747; /* 导航栏的背景颜色 */
}

ul {
  list-style-type: none; /* 移除列表项的默认样式 */
  padding: 0;
  margin: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #ccc; /* 分隔线样式 */
  cursor: pointer;
  font-size: 36px;
  margin-bottom: 30px; /* 设置导航项之间的间距 */
  color: #f8f5f5;
}

li:hover {
  background-color: #726f6f; /* 鼠标悬停时的背景颜色 */
}

.content {
  margin-left: 200px; /* 留出导航栏的宽度，使主要内容向右偏移 */
  height: 100%; /* 高度占满整个屏幕 */
  /* 其他主要内容的样式 */
}
</style>
