export function renderCellValue(val) {
  return `${val || ''}`;
}

export function renderCellValueInSpanTag(val) {
  return `<span>${val || ''}<span>`;
}

export default {
  renderCellValue,
  renderCellValueInSpanTag
};
