import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminPanel = () => {

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '100%', padding: '20px', backgroundColor: '#f0f0f0' }}>
        <h2>Admin Panel</h2>
        <nav>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>
              <Link style={{textDecoration:"none"}} to="/adminpanel/userlist">User List</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div style={{ flex: 1, padding: '20px' }}>
      </div>
    </div>
  );
};

export default AdminPanel;
