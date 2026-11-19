import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormField from '../components/FormField';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setSubmitting(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.error?.message ||
          'Unable to create your account right now. Please try again.'
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
          <h2>A home for everything you write</h2>
          <p>Create an account to get started.</p>
        </div>
        <ul className="auth-points">
          <li>Your notes stay private to you</li>
          <li>Free and simple to use</li>
        </ul>
      </aside>

      <main className="auth-main">
        <form className="card auth-card" onSubmit={handleSubmit} noValidate>
          <h1>Create your account</h1>
          <p className="auth-sub">A few details and you are ready to go.</p>

          {error && <div className="alert" role="alert">{error}</div>}

          <FormField
            label="Full name"
            name="name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            placeholder="Your name"
            disabled={submitting}
          />
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
            autoComplete="new-password"
            placeholder="At least 8 characters"
            disabled={submitting}
          />
          <FormField
            label="Confirm password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            placeholder="Repeat your password"
            disabled={submitting}
          />

          <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
            {submitting ? 'Creating account…' : 'Create account'}
          </button>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </main>
    </div>
  );
}
