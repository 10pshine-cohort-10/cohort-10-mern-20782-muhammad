import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    function handlePointerDown(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [menuOpen]);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <div className="page">
      <header className="navbar">
        <div className="navbar-inner">
          <span className="brand">NoteNest</span>
          <div className="navbar-right" ref={menuRef}>
            <button
              type="button"
              className="user-chip"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="user-avatar">{initials(user?.name)}</span>
              {user?.name}
              <span className="chevron">&#9662;</span>
            </button>
            {menuOpen && (
              <div className="menu">
                <button type="button" className="menu-item" onClick={handleLogout}>
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="home-content">
        <h1>Welcome back, {firstName}</h1>
        <div className="empty-state">
          <h2>No notes yet</h2>
          <p>Notes you create will appear here.</p>
        </div>
      </main>
    </div>
  );
}
