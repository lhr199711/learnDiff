// h渲染函数，主要是创建一个虚拟dom，本质是js对象

import vnode from "./vnode";
export default function (sel, data, c) {
  if (arguments.length !== 3) {
    throw Error("目前只能传入三个参数");
  }
  if (typeof c == "string" || typeof c == "number") {
    return vnode(sel, data, undefined, c, undefined);
  }
  if (Array.isArray(c)) {
    let children = [];
    for (let i = 0; i < c.length; i++) {
      if (typeof c[i] == "object" && c[i].hasOwnProperty("sel")) {
        children.push(c[i]);
      } else {
        throw Error("传参有误");
      }
    }
    return vnode(sel, data, children, undefined, undefined);
  }
  if (typeof c == "object" && c.hasOwnProperty("sel")) {
    return vnode(sel, data, [c], undefined, undefined);
  }
}
