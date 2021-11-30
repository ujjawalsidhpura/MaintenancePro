import { useAuth0 } from '@auth0/auth0-react';

export default function Footer(props) {
	const { isAuthenticated, isLoading } = useAuth0();

	const footer = (
		<div className="footer" id="footer">

		</div>
	)
	
	return(
		(isAuthenticated && !isLoading)? footer : <></>
	)
}