import h from "./mysnabbdom/h";
import patch from "./mysnabbdom/patch";

const container = document.getElementById("container");

const vnode1 = h("ul", {}, [
  h("li", {}, "test"),
  h("li", {}, "test"),
  h("li", {}, "test"),
]);

patch(container, vnode1);
