import { useState } from "react"
import AssetsItems from "./AssetsItems"
import { useAuth0 } from '@auth0/auth0-react';

export default function AssetsContainer(props) {
  const { user } = useAuth0();

  const [state, setState] = useState({
    name: '',
    brand: '',
    model: '',
    serial: '',
    last_serviced_on: '',
    next_service_on: '',
    anticipated_life: '',
    installed_on: ''
  })

  const changeState = (key, value) => {
    setState({ ...state, [key]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const parsedAssets = props.assets && props.assets.map(asset => {
    return (<AssetsItems {...asset} key={asset._id} />)
  }).reverse()

  const validState = () => {
    return state.name
  }

  const handleQuery = (asset) => {
    let query;
    if (state.name) {
      query = asset.props.name.toLowerCase().includes(state.name.toLowerCase())
    }

    return query;
  }

  const parsedAssetByQuery = validState() && parsedAssets.filter(asset =>
    handleQuery(asset)
  );

  return (
    (user && user.email === "admin@gmail.com") ?
      <>
				<div className="banner">
					<form className="card workorder-filter" onSubmit={handleSubmit}>
						<h2 className="title">Assets</h2>
						<div>
							<h2><strong>Filters</strong></h2>
						</div>

						<div className="filters">
							<div className="inventory-filter-input">
								<input
									className="input"
									type="text"
									placeholder="Asset Name"
									value={state.name}
									onChange={(event) => changeState("name", event.target.value)}
								/>
							</div>
						</div>

					</form>
				</div>

        <div className="asset-container">
          {validState() ? parsedAssetByQuery : parsedAssets}
        </div>
      </> : <></>
  )
}