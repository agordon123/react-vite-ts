// file: src/store/root/Root.store.ts
// import configureStore from redux toolkit
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
// import our root store interface
import { RootStoreInterface } from './models'; 
import { useItemsActions,useItemsGetters } from '../items/Items.store';
import { itemsStoreSlice } from '../items/Items.slice';



export const rootStore = configureStore({
    reducer: {
    // add reducers here
    itemsState: itemsStoreSlice.reducer
    // keep adding more domain-specific reducers here as needed
    }
});

export type RootStateInterface = ReturnType<typeof rootStore.getState>;

export function useAppStore(): RootStoreInterface   {
    const commit = useDispatch();

    return { 
        itemsStore: {
        actions: useItemsActions(commit),
        getters: useItemsGetters() 
    }
    }
}
type IAppState = ReturnType<typeof rootStore.getState>;

/**
* @name ItemsStoreInterface
* @description Interface represents our Items store module */
export interface ItemsStoreInterface {
    actions: ReturnType<typeof useItemsActions> // use TS type inference
    getters: ReturnType<typeof useItemsGetters> // use TS type inference 
}

/**
 * @name getAppState
 * @description
 * Returnss a snapshot of the current app state (non-reactive)
 * This will be used mainly across store modules (i.e. items/etc)
 * In components we'll usually use getters, not this.
 * @returns
 */
export function getAppState(): IAppState { 
    const appState = rootStore.getState();
    return {
    ...appState
  };
}