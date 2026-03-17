export const state = {
    editingRa: null
};

export function setEditingRa(ra) {
    state.editingRa = ra;
}

export function resetState() {
    state.editingRa = null;
}