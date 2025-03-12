import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go to Home</Link> {/* Link back to Home */}
    </div>
  );
}

export default NotFound;

