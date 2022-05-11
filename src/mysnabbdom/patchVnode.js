import updateChildren from "./updateChildren";
export default function patchVnode(oldVnode, newVnode) {
  if (newVnode.text !== undefined && newVnode.children === undefined) {
    // 新节点含有text属性
    if (newVnode.text !== oldVnode.text) {
      oldVnode.elm.innerText = newVnode.text; // 这里很巧妙，innerText会覆盖之前的dom。
    }
  } else {
    // 新节点不含text属性，那么就是含有children属性
    if (oldVnode.children) {
      // 老节点是children，新节点也是children
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
    } else {
      // 老节点没children，新节点有chidlren
      oldVnode.elm.innerHTML = "";
      for (let i = 0; i < newVnode.children.length; i++) {
        let childDom = createElement(newVnode.children[i]);
        oldVnode.elm.appendChild(childDom);
      }
    }
  }
}
