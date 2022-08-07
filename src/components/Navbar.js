import '../styles.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div class='navbar'>
      <h3>HMDB</h3>
      <Link to='/search'>
        <button>Search</button>
      </Link>
      <Link to='/details'>
        <button>Details</button>
      </Link>
    </div>
  );
}

export default Navbar;
