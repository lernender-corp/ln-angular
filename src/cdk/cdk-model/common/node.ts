import { Library, Action, Simple } from '@lernender/core';

export class Node extends Action {
  public children: Node[];
  public expanded: boolean;
  public icon: Simple;
  public hover: boolean;
  public level: number;
  public parentId: number;

  /**
   * constructor()
   */
  constructor();
  constructor(options: object);
  constructor(options?: any) {
    super(options);
    //
    // Create Children
    //
    this.children = [];
    this.hover = false;
    this.expanded = false;
    this.level = 0;
    this.parentId = Library.init(options, 'parentId', 0);
    this.icon = new Simple({
      name: 'play_arrow'
    });
  }

  /**
   * toString()
   */
  public toString() {
    return (
      'MenuItem: ' +
      this.name +
      '[' +
      this.id +
      ']; parentId [' +
      (this.parentId == null ? 'null' : this.parentId) +
      ']'
    );
  }

  /**
   * find()
   */
  public find(obj, level, condition): Node {
    return this._find(this, obj, level, condition);
  }

  /**
   * add
   */
  public add(obj, condition) {
    return this._add(this, obj, 0, condition);
  }

  /**
   * remove
   */
  public remove(obj, action, condition) {
    return this._remove(this, obj, action, condition);
  }

  /**
   * private clear()
   */
  public clear(node: any, action: any) {
    if (Library.isDefined(node)) {
      for (let nI = node.children.length - 1; nI > -1; nI--) {
        this.clear(node.children[nI], action);
        action(node);
        node.children.pop();
      }
    }
  }

  /**
   * traverse()
   * @param root
   * @param callback
   */
  public traverse(callback = null, root = this) {
    if (Library.isDefined(root)) {
      if (Library.isFunction(callback)) {
        // @ts-ignore
        callback(root);
      }

      if (root.children.length) {
        for (const child of root.children) {
          // @ts-ignore
          this.traverse(callback, child);
        }
      }
    }
  }
  /**
   * returns nodes by level
   */
  public getNodesByLevel(level: number = 0) {
    const results = [];
    this.traverse(node => {
      if (node.level === level) {
        results.push(node);
      }
    });
    return results;
  }

  public hasChildren(): boolean {
    return this.children.length > 0;
  }

  /**
   * Find()
   */
  private _find(root, obj, level, condition) {
    let node;

    if (condition(root, obj, level)) {
      node = root;
    } else {
      for (const child of root.children) {
        node = this._find(child, obj, level + 1, condition);
        if (node) {
          break;
        }
      }
    }

    return node;
  }

  /**
   * Push
   */
  private _add(root, obj, level, condition) {
    let success = false;

    if (condition(root, obj)) {
      obj.level = level + 1;
      root.children.push(obj);
      success = true;
    } else {
      for (const child of root.children) {
        success = this._add(child, obj, level + 1, condition);
        if (success) {
          break;
        }
      }
    }

    return success;
  }

  /**
   * _remove()
   */
  ///Currently, this is removing the parent if the object to be removed is a child of it. Probably not the intended use of this
  private _remove(root, obj, action, condition) {
    let removed = false;

    if (root !== null) {
      if (condition(root, obj)) {
        this.clear(obj, action);
        removed = true;
      } else {
        for (let nI = root.children.length - 1; nI > -1 && !removed; nI--) {
          removed = this._remove(root.children[nI], obj, action, condition);
          if (removed) {
            root.children.splice(nI, 1);
          }
        }
      }
    }

    return removed;
  }
}
