import { useMemo, useState } from 'react';
import './AdminPanel.css';

const STATUSES = ['Pending', 'Approved', 'Rejected'];

export default function AdminPanel({ applications = [], onStatusChange, onDelete }) {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const counts = useMemo(() => {
    const c = { total: applications.length, Pending: 0, Approved: 0, Rejected: 0 };
    applications.forEach((a) => {
      if (c[a.status] !== undefined) c[a.status] += 1;
    });
    return c;
  }, [applications]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return applications.filter((a) => {
      if (filter !== 'All' && a.status !== filter) return false;
      if (!q) return true;
      return (
        (a.studentName || '').toLowerCase().includes(q) ||
        (a.parentName || '').toLowerCase().includes(q) ||
        (a.email || '').toLowerCase().includes(q)
      );
    });
  }, [applications, filter, query]);

  const handleDelete = (app) => {
    if (window.confirm(`Delete application for ${app.studentName}? This cannot be undone.`)) {
      onDelete && onDelete(app.id);
    }
  };

  const formatDate = (v) => {
    if (!v) return '—';
    const d = new Date(v);
    return isNaN(d) ? String(v) : d.toLocaleString();
  };

  return (
    <section className="admin-panel" aria-labelledby="admin-panel-title">
      <h2 id="admin-panel-title" className="admin-title">Admin – Applications</h2>

      <ul className="admin-summary" aria-label="Application summary">
        <li className="summary-card">
          <span className="summary-count">{counts.total}</span>
          <span className="summary-label">Total</span>
        </li>
        <li className="summary-card summary-pending">
          <span className="summary-count">{counts.Pending}</span>
          <span className="summary-label">Pending</span>
        </li>
        <li className="summary-card summary-approved">
          <span className="summary-count">{counts.Approved}</span>
          <span className="summary-label">Approved</span>
        </li>
        <li className="summary-card summary-rejected">
          <span className="summary-count">{counts.Rejected}</span>
          <span className="summary-label">Rejected</span>
        </li>
      </ul>

      <div className="admin-controls">
        <div className="control">
          <label htmlFor="admin-status-filter">Status</label>
          <select
            id="admin-status-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="control control-grow">
          <label htmlFor="admin-search">Search</label>
          <input
            id="admin-search"
            type="search"
            placeholder="Search by name or email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="admin-empty" role="status">
          {applications.length === 0
            ? 'No applications yet.'
            : 'No applications match your filters.'}
        </p>
      ) : (
        <div className="admin-table-wrap" tabIndex={0} role="region" aria-label="Applications table">
          <table className="admin-table">
            <caption className="sr-only">
              Showing {visible.length} of {applications.length} applications
            </caption>
            <thead>
              <tr>
                <th scope="col">Student</th>
                <th scope="col">Parent</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Grade</th>
                <th scope="col">DOB</th>
                <th scope="col">Slot</th>
                <th scope="col">Submitted</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((a) => (
                <tr key={a.id}>
                  <th scope="row">{a.studentName}</th>
                  <td>{a.parentName}</td>
                  <td>{a.email}</td>
                  <td>{a.phone}</td>
                  <td>{a.grade}</td>
                  <td>{a.dob}</td>
                  <td>{a.slot}</td>
                  <td>{formatDate(a.createdAt)}</td>
                  <td>
                    <span className={`badge badge-${String(a.status).toLowerCase()}`}>
                      {a.status}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button
                        type="button"
                        className="btn btn-approve"
                        disabled={a.status === 'Approved'}
                        onClick={() => onStatusChange && onStatusChange(a.id, 'Approved')}
                        aria-label={`Approve application for ${a.studentName}`}
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        className="btn btn-reject"
                        disabled={a.status === 'Rejected'}
                        onClick={() => onStatusChange && onStatusChange(a.id, 'Rejected')}
                        aria-label={`Reject application for ${a.studentName}`}
                      >
                        Reject
                      </button>
                      <button
                        type="button"
                        className="btn btn-delete"
                        onClick={() => handleDelete(a)}
                        aria-label={`Delete application for ${a.studentName}`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
