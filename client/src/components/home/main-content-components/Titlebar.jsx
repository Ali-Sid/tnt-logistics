import React, { useContext, useEffect, useState } from 'react'
import EditButton from '../../reusable-assets/EditButton'
import SelectedAssetContext from '../../../SelectedAssetContext';
import axios from 'axios';

function Titlebar() {

  const { setSelectedAsset, selectedAsset } = useContext(SelectedAssetContext);
  const [assetDetails, setAssetDetails] = useState({});

  useEffect(() => {
    if (selectedAsset && selectedAsset.Asset_ode) {
      axios.get(`http://localhost:3000/asset-details/${selectedAsset.Asset_Code}`)
        .then(response => {
          setAssetDetails(response.data);
        })
        .catch(error => {
          console.error('Error fetching asset details:', error);
        });
    }
  }, [selectedAsset]);

  if (!selectedAsset) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
      <div style={{ width: "50%" }} className='title-bar'>{selectedAsset.Asset_Code} | {selectedAsset.Asset_Name}</div>
      <div style={{ display: "flex", flexDirection: "row", width: "50%", justifyContent: "right", paddingRight: "15px" }}><EditButton /></div>
    </div>
  )
}

export default Titlebar