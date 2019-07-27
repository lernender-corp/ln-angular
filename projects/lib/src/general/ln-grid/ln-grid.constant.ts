import { GridRow } from '@lernender/core';

export enum LnGridMessageType {
    CHECK_ALL = 'CHECK_ALL',
    UNCHECK_ALL = 'UNCHECK_ALL',
    UNSELECT_ALL = 'UNSELECT_ALL',
    FILTER = 'FILTER',
    HYDRATE = 'HYDRATE',
    COLUMN_DEF = 'COLUMN_DEF',
    CLEAR = 'CLEAR',
    SCROLL_TO = 'SCROLL_TO',
    DELETE = 'DELETE'
}

export interface ILnGridState {
    checked: GridRow[];
    selected: GridRow[];
    context?: string;
    dataValueField?: string;
    dataValue?: string;
    dataOptions?: object;
}

export enum LnGridMessageAction {
    UPDATE_SELECTED = 'UPDATE_SELECTED',
    UPDATE_CHECKED = 'UPDATE_CHECKED'
}
