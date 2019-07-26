import { Injectable } from '@angular/core';

export interface INodeService {
  Traverse(node, level, onvisit);
}

@Injectable()
export class CdkNodeService implements INodeService {
  /**
   * Traverse
   */
  public Traverse(node, level, onvisit) {
    return this.onTraverse(node, level, onvisit);
  }
  /**
   * onTraverse()
   */
  private onTraverse(node, level, onvisit) {
    if (node) {
      if (onvisit) { onvisit(node, level); }

      if (node.children) {
        for (const child of node.children) {
          this.onTraverse(child, level + 1, onvisit);
        }
      }
    }
  }
}
