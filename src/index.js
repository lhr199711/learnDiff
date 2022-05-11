import h from "./mysnabbdom/h";
import patch from "./mysnabbdom/patch";

const container = document.getElementById("container");
const btn = document.getElementById("btn");

const vnode1 = h("ul", {}, [
  h("li", {}, "A"),
  h("li", {}, "B"),
  h("li", {}, "C"),
  h("li", {}, "D"),
]);

const vnode2 = h("ul", {}, [
  h("li", {}, "A"),
  h("li", {}, "B"),
  h("li", {}, "C"),
  h("li", {}, "D"),
  h("li", {}, "E"),
]);

patch(container, vnode1);

btn.onclick = () => {
  patch(vnode1, vnode2);
};
