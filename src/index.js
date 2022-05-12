import h from "./mysnabbdom/h";
import patch from "./mysnabbdom/patch";

const container = document.getElementById("container");
const btn = document.getElementById("btn");

const vnode1 = h("ul", {}, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "C" }, "C"),
]);

const vnode2 = h("ul", {}, [
  h("li", { key: "B" }, "B"),
  h("li", { key: "A" }, "A"),
  h("li", { key: "D" }, "D"),
]);

patch(container, vnode1);

btn.onclick = () => {
  patch(vnode1, vnode2);
};
