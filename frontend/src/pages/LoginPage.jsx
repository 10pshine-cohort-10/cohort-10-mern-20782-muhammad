import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormField from '../components/FormField';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(form);
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.error?.message ||
          'Unable to sign in right now. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-layout">
      <aside className="auth-aside">
        <div className="brand brand-light">NoteNest</div>
        <div>
          <h2>Keep your thoughts in one place</h2>
          <p>Sign in to pick up where you left off.</p>
        </div>
        <ul className="auth-points">
          <li>Private notes tied to your account</li>
          <li>Rich text editing</li>
          <li>Works across your devices</li>
        </ul>
      </aside>

      <main className="auth-main">
        <form className="card auth-card" onSubmit={handleSubmit} noValidate>
          <h1>Sign in</h1>
          <p className="auth-sub">Enter your credentials to access your notes.</p>

          {error && <div className="alert" role="alert">{error}</div>}

          <FormField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            placeholder="you@example.com"
            disabled={submitting}
          />
          <FormField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            placeholder="Your password"
            disabled={submitting}
          />

          <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>

          <p className="auth-footer">
            New here? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </main>
    </div>
  );
}
