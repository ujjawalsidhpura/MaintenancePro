import Options from "./Buttons/AssetOptions"

export default function AssetsItems(props) {
  return (
    <div className="card assets">
			<div className="asset-item">
				<div >
					<span><strong>Name:   </strong></span>
					<span>{props.name}</span>
				</div>
				<div >
					<span><strong>Brand:  </strong></span>
					<span>{props.brand}</span>
				</div>
				<div >
					<span><strong>Model:  </strong></span>
					<span>{props.model}</span>
				</div>
				<div >
					<span><strong>Serial:  </strong></span>
					<span>{props.serial}</span>
				</div>
				<div >
					<span><strong>Last_serviced_on:  </strong></span>
					<span>{props.last_serviced_on}</span>
				</div>
				<div >
					<span><strong>Next_service_on:  </strong></span>
					<span>{props.next_service_on}</span>
				</div>
				<div >
					<span><strong>Installed_on:  </strong></span>
					<span>{props.installed_on}</span>
				</div>
				<div >
					<span><strong>Anticipated_life:  </strong></span>
					<span>{props.anticipated_life}</span>
				</div>
			</div>
			<Options props={props}/>
    </div>
  )
}