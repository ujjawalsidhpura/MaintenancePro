export default function WorkOrderItems(props) {
	let parsedPhotos = [];
	for (let photo in props.photos) {
		console.log("Mapped Photos:", props.photos[photo] && props.photos[photo].path)
		props.photos[photo] && parsedPhotos.push(<img key={photo} src={props.photos[photo].path}/>)
	}
	// const parsedPhotos = props.photos && props.photos.map(photo => console.log(photo))
  return (
    <div className="card workorder-item">
			<div>
				<h2>{props.title}</h2>
			</div>
			<div class="workorder-content">
				<p>{props.description}</p>
				{parsedPhotos}
				{/* <div>{props.files}</div> */}
			</div>
			<div className="workorder-item-footer">
				<div>
					<h2>Technician</h2>
					<h2>{props.technician}</h2>
				</div>
				<div>
					<h2>Work Order Created:</h2>
					<h2>{props.created_on}</h2>
					<h2>STATUS</h2>
				</div>
			</div>
    </div>
  )
}