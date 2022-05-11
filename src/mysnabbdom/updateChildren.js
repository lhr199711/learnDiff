import patchVnode from "./patchVnode";
import createElement from "./createElement";

function checkSameVnode(a, b) {
  return a.sel == b.sel && a.key == b.key;
}

export default function updateChildren(parentElm, oldCh, newCh) {
  // 旧前
  let oldStartIdx = 0;
  // 新前
  let newStartIdx = 0;
  // 旧后
  let oldEndIdx = oldCh.length - 1;
  // 新后
  let newEndIdx = newCh.length - 1;
  // 旧前节点
  let oldStartVnode = oldCh[0];
  // 新前节点
  let newStartVnode = newCh[0];
  // 旧后节点
  let oldEndVnode = oldCh[oldEndIdx];
  // 新后节点
  let newEndVnode = newCh[newEndIdx];

  let keyMap = null;

  // diff算法核心
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 首先应该不是判断四种命中，而是略过已经加了undefined标记的项
    if (oldStartVnode === null || oldCh[oldStartIdx] === undefined) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode === null || oldCh[oldEndIdx] === undefined) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode === null || newCh[newStartIdx] === undefined) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode === null || newCh[newEndIdx] === undefined) {
      newEndVnode = newCh[--newEndIdx];
    } else if (checkSameVnode(oldStartVnode, newStartVnode)) {
      // 新前与旧前对比
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
      // 新后与旧后对比
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
      // 新后与旧前对比
      patchVnode(oldStartVnode, newEndVnode);
      // insertBefore已经存在的dom节点是移动操作
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
      // 新前与旧后对比
      patchVnode(oldEndVnode, newStartVnode);
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      // 以上四种都没命中，需要通过循环去找的方式
      if (!keyMap) {
        keyMap = {};
        // 记录oldVnode中的节点出现的key
        // 从oldStartIdx开始到oldEndIdx结束，创建keyMap
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          const key = oldCh[i].key;
          if (key !== undefined) {
            keyMap[key] = i;
          }
        }
      }
      // 寻找当前项（newStartIdx）在keyMap中映射的序号
      const idxInOld = keyMap[newStartVnode.key];
      if (idxInOld === undefined) {
        // 如果 idxInOld 是 undefined 说明是全新的项，要插入
        // 被加入的项（就是newStartVnode这项)现不是真正的DOM节点
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
      } else {
        // 说明不是全新的项，要移动
        const elmToMove = oldCh[idxInOld];
        patchVnode(elmToMove, newStartVnode);
        // 把这项设置为undefined，表示我已经处理完这项了
        oldCh[idxInOld] = undefined;
        // 移动，调用insertBefore也可以实现移动。
        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
      }
      // newStartIdx++;
      newStartVnode = newCh[++newStartIdx];
    }
  }

  // 循环结束
  if (newStartIdx <= newEndIdx) {
    // 说明newVndoe还有剩余节点没有处理，所以要添加这些节点
    // // 插入的标杆
    // const before =
    //   newCh[newEndIdx + 1] === null ? null : newCh[newEndIdx + 1].elm;
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      // insertBefore方法可以自动识别null，如果是null就会自动排到队尾，和appendChild一致
      let dom = oldCh[oldStartIdx];
      if (dom) {
        dom = oldCh[oldStartIdx].elm;
      }
      parentElm.insertBefore(createElement(newCh[i]), dom);
    }
  } else if (oldStartIdx <= oldEndIdx) {
    // 说明oldVnode还有剩余节点没有处理，所以要删除这些节点
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      if (oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm);
      }
    }
  }
}
