import React, { useState } from 'react'
import ListPanel from './ListPanel'
import MainContent from './MainContent'
import { SelectedAssetProvider } from '../../SelectedAssetContext'

function Dashboard() {

    const [selectedAsset, setSelectedAsset] = useState(null);
    const [addingNewAsset, setAddingNewAsset] = useState(false);
    const [creatingNewAsset, setCreatingNewAsset] = useState(false)
    const [newItem, setNewItem] = useState({ itemCode: '', itemName: '' });

    return (
        <div style={{ display: "flex", flexDirection: "row", width: "100%", overflow: "hidden", gap: "10px" }}>
            <SelectedAssetProvider value={{ selectedAsset, setSelectedAsset, addingNewAsset, setAddingNewAsset, newItem, setNewItem }}>
                <div style={{ width: "25%" }}><ListPanel /></div>
                <div style={{ width: "30%" }}><MainContent /></div>
            </SelectedAssetProvider>
        </div>
    )
}

export default Dashboard