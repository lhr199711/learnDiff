import h from "./mysnabbdom/h";
import patch from "./mysnabbdom/patch";

const container = document.getElementById("container");

const vnode1 = h("ul", {}, [h("li", {}, "li1")]);

patch(container, vnode1);
