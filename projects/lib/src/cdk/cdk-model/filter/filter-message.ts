import { Library } from '@lernender/core';
import { Node } from '../common/node';

export class FilterMessage extends Node {
    public key: string;

    constructor();

    constructor(options: object);
    constructor(options?: any) {
        super(options);
        this.id = Library.init(options, 'id')
        this.key = Library.init(options, 'key');
        this.name = Library.init(options, 'name');
        this.active = Library.init(options, 'active');
        this.hidden = Library.init(options, 'hidden');
        this.description = Library.init(options, 'description');
        this.disabled = Library.init(options, 'disabled');
        this.children = Library.init(options, 'children');
        this.parentId = Library.init(options, 'parentId');
      }
}
