import vnode from "./vnode";
import createElement from "./createElement";

export default function (oldVnode, newVnode) {
  // 1.判断oldvnode是真实dom还是虚拟dom
  if (!oldVnode.sel) {
    // 将旧的真实dom转为虚拟dom
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(),
      {},
      [],
      undefined,
      oldVnode
    );
  }
  // 2.判断转换后的oldVnode与newVnode是否是同一个节点，即是否可以复用
  if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {
    console.log("相同节点");
  } else {
    // 不是相同节点，暴力替换
    let newVnodeDom = createElement(newVnode);
    oldVnode.elm.parentNode.insertBefore(newVnodeDom, oldVnode.elm);
    oldVnode.elm.parentNode.removeChild(oldVnode.elm);
  }
}
