import React, { useState } from 'react'
import ListPanel from './ListPanel'
import MainContent from './MainContent'
import { SelectedAssetProvider } from '../../SelectedAssetContext'
import ItemList from './main-content-components/ItemList';
import SecondPanel from './main-content-components/SecondPanel';

function Dashboard() {

    const [selectedAsset, setSelectedAsset] = useState(null);
    const [addingNewAsset, setAddingNewAsset] = useState(false);
    const [creatingNewAsset, setCreatingNewAsset] = useState(false)
    const [newItem, setNewItem] = useState({ itemCode: '', itemName: '' });
    const [selectedItem, setSelectedItem] = useState({name: '', code: ''})


    // Function to update the selectedAsset state
    const updateSelectedAsset = (asset) => {
        setSelectedAsset(asset);
        console.log("Selected Asset in Dashboard:", selectedAsset);
    };
    

    return (
        <div style={{ display: "flex", flexDirection: "row", width: "100%", overflow: "hidden", gap: "10px" }}>
            <SelectedAssetProvider value={{ selectedAsset, setSelectedAsset: updateSelectedAsset, addingNewAsset, setAddingNewAsset, newItem, setNewItem, }}>
                {/* <div style={{ width: "25%" }}><ListPanel /></div>
                <div style={{ width: "30%" }}><MainContent /></div> */}
                <div style={{width: "25%"}}>
                <ItemList onItemClick={setSelectedItem} />
                </div>
                <div style={{width: "75%"}}>
                <SecondPanel selectedItem={selectedItem}/>
                </div>
            </SelectedAssetProvider>
        </div>
    )
}

export default Dashboard