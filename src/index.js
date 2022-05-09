import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);

const container = document.getElementById("container");
const btn = document.getElementById("btn");
console.log(btn);

const vnode = h("ul", {}, [
  h("li", { key: 0 }, "li1"),
  h("li", { key: 1 }, "li2"),
  h("li", { key: 2 }, "li3"),
  h("li", { key: 3 }, "li4"),
]);

patch(container, vnode);

const vnode2 = h("ul", {}, [
  h("li", { key: 3 }, "li4"),
  h("li", { key: 2 }, "li3"),
  h("li", { key: 0 }, "li1"),
  h("li", { key: 1 }, "li2"),
]);

btn.onclick = function () {
  patch(vnode, vnode2);
};
