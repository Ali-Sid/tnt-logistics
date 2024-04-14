import React, { useContext, useEffect, useState } from 'react'
import EditButton from '../../reusable-assets/EditButton'
import SelectedAssetContext from '../../../SelectedAssetContext';
import axios from 'axios';

function Titlebar() {

  const { setSelectedAsset, selectedAsset } = useContext(SelectedAssetContext);
  const [assetDetails, setAssetDetails] = useState({});

  useEffect(() => {
    if (selectedAsset && selectedAsset.asset_code) {
      axios.get(`http://localhost:3000/asset-details/${selectedAsset.asset_code}`)
        .then(response => {
          setAssetDetails(response.data);
        })
        .catch(error => {
          console.error('Error fetching asset details:', error);
        });
    }
  }, [selectedAsset]);

  if (!setSelectedAsset) {
    return <div>Item Details</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
      <div style={{ width: "50%" }} className='title-bar'>{setSelectedAsset.asset_code} | {setSelectedAsset.asset_name}</div>
      <div style={{ display: "flex", flexDirection: "row", width: "50%", justifyContent: "right", paddingRight: "15px" }}><EditButton /></div>
    </div>
  )
}

export default Titlebar