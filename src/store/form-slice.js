import {createSlice} from "@reduxjs/toolkit";

/**
 *
 * @type {Slice<{itemsList: *[], showMap: boolean, id: number}, {editMapItem(*, *): void, addToMap(*, *): void, setShowForm(*): void}, string>}
 */
const FormSlice = createSlice({
    name: 'form',
    initialState: {
        itemsList: [],
        showMap: false,
        id: 1

    },
    reducers: {
        addToMap(state, action) {
            const newItem = action.payload;
            state.itemsList.push({
                id: state.id++,
                name: newItem.name,
                img: newItem.img,
                type: newItem.type,
                lat: newItem.lat,
                lng: newItem.lng
            });
        },
        editMapItem(state, action) {
            const editItem = action.payload;
            const existingItem = state.itemsList.find((item) => item.id === editItem.id);
            if (existingItem) {
                existingItem.name = editItem.name;
                existingItem.img = editItem.img;
                existingItem.type = editItem.type;
                existingItem.lat = editItem.lat;
                existingItem.lng = editItem.lng;

            }
        },
        setShowForm(state) {
            state.showMap = !state.showMap;
        }
    }

});
export const formActions = FormSlice.actions;
export default FormSlice;