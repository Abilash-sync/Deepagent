import { useState } from 'react';

const initial = {
  firstName: '', lastName: '', dob: '', gender: '', grade: '', previousSchool: '',
  address: '', city: '', state: '', zip: '',
  guardianName: '', relationship: '', phone: '', email: '',
  notes: '', consent: false,
};

const GRADES = ['Kindergarten', ...Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`)];
const RELS = ['Mother', 'Father', 'Legal Guardian', 'Grandparent', 'Other'];
const GENDERS = ['Female', 'Male', 'Non-binary', 'Prefer not to say'];

function validate(v) {
  const e = {};
  const req = {
    firstName: 'First name', lastName: 'Last name', dob: 'Date of birth', gender: 'Gender',
    grade: 'Grade', address: 'Address', city: 'City', state: 'State', zip: 'ZIP code',
    guardianName: 'Guardian name', relationship: 'Relationship', phone: 'Phone', email: 'Email',
  };
  for (const k in req) if (!String(v[k]).trim()) e[k] = `${req[k]} is required.`;
  if (v.dob && !e.dob) {
    const d = new Date(v.dob + 'T00:00:00');
    const now = new Date();
    if (isNaN(d)) e.dob = 'Enter a valid date.';
    else if (d > now) e.dob = 'Date of birth cannot be in the future.';
    else {
      let age = now.getFullYear() - d.getFullYear();
      const m = now.getMonth() - d.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
      if (age < 3 || age > 19) e.dob = 'Student age must be between 3 and 19 years.';
    }
  }
  if (v.zip && !e.zip && !/^\d{5}(-\d{4})?$/.test(v.zip.trim())) e.zip = 'Enter a valid ZIP code (e.g. 12345).';
  if (v.phone && !e.phone) {
    const digits = v.phone.replace(/\D/g, '');
    if (!/^\+?[\d\s().-]+$/.test(v.phone.trim()) || digits.length < 10 || digits.length > 15)
      e.phone = 'Enter a valid phone number (10–15 digits).';
  }
  if (v.email && !e.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Enter a valid email address.';
  if (!v.consent) e.consent = 'You must consent to continue.';
  return e;
}

function Field({ id, label, error, required = true, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>
      {children}
      {error && <p className="error" id={`${id}-error`} role="alert">{error}</p>}
    </div>
  );
}

export default function App() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  const change = (ev) => {
    const { name, value, type, checked } = ev.target;
    setValues((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };
  const blur = (ev) => {
    const k = ev.target.name;
    setErrors((p) => ({ ...p, [k]: validate(values)[k] }));
  };
  const reset = () => { setValues(initial); setErrors({}); };
  const submit = (ev) => {
    ev.preventDefault();
    const e = validate(values);
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) { document.getElementById(first)?.focus(); return; }
    setSubmitted(values);
  };

  const describe = (name) => ({
    'aria-invalid': !!errors[name],
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });

  const input = (name, label, props = {}, required = true) => (
    <Field id={name} label={label} error={errors[name]} required={required}>
      <input id={name} name={name} value={values[name]} onChange={change} onBlur={blur}
        aria-required={required} {...describe(name)} {...props} />
    </Field>
  );
  const select = (name, label, options) => (
    <Field id={name} label={label} error={errors[name]}>
      <select id={name} name={name} value={values[name]} onChange={change} onBlur={blur}
        aria-required="true" {...describe(name)}>
        <option value="">Select…</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </Field>
  );

  if (submitted) {
    const s = submitted;
    const rows = [
      ['Student', `${s.firstName} ${s.lastName}`], ['Date of birth', s.dob], ['Gender', s.gender],
      ['Applying for', s.grade], ['Previous school', s.previousSchool || '—'],
      ['Address', `${s.address}, ${s.city}, ${s.state} ${s.zip}`],
      ['Guardian', `${s.guardianName} (${s.relationship})`], ['Phone', s.phone], ['Email', s.email],
      ['Notes', s.notes || '—'],
    ];
    return (
      <main className="container">
        <h1>Application Submitted</h1>
        <p role="status">Thank you! Your application for {s.firstName} {s.lastName} has been received.</p>
        <dl className="summary">
          {rows.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
        </dl>
        <button type="button" onClick={() => { reset(); setSubmitted(null); }}>Start a new application</button>
      </main>
    );
  }

  return (
    <main className="container">
      <h1>School Admission Form</h1>
      <p className="hint">Fields marked * are required.</p>
      <form onSubmit={submit} noValidate>
        <fieldset>
          <legend>Student information</legend>
          <div className="grid">
            {input('firstName', 'First name', { autoComplete: 'given-name' })}
            {input('lastName', 'Last name', { autoComplete: 'family-name' })}
            {input('dob', 'Date of birth', { type: 'date', max: new Date().toISOString().split('T')[0] })}
            {select('gender', 'Gender', GENDERS)}
            {select('grade', 'Grade applying for', GRADES)}
            {input('previousSchool', 'Previous school', {}, false)}
            {input('address', 'Address', { autoComplete: 'street-address' })}
            {input('city', 'City', { autoComplete: 'address-level2' })}
            {input('state', 'State', { autoComplete: 'address-level1' })}
            {input('zip', 'ZIP code', { autoComplete: 'postal-code', inputMode: 'numeric' })}
          </div>
        </fieldset>
        <fieldset>
          <legend>Parent / guardian</legend>
          <div className="grid">
            {input('guardianName', 'Full name', { autoComplete: 'name' })}
            {select('relationship', 'Relationship', RELS)}
            {input('phone', 'Phone', { type: 'tel', autoComplete: 'tel' })}
            {input('email', 'Email', { type: 'email', autoComplete: 'email' })}
          </div>
        </fieldset>
        <fieldset>
          <legend>Additional information</legend>
          <div className="field">
            <label htmlFor="notes">Notes (optional)</label>
            <textarea id="notes" name="notes" rows="4" value={values.notes} onChange={change} />
          </div>
          <div className="field check">
            <label>
              <input type="checkbox" id="consent" name="consent" checked={values.consent} onChange={change}
                {...describe('consent')} />
              I confirm the information is accurate and consent to its use for admission processing. *
            </label>
            {errors.consent && <p className="error" id="consent-error" role="alert">{errors.consent}</p>}
          </div>
        </fieldset>
        <div className="actions">
          <button type="submit">Submit application</button>
          <button type="button" className="secondary" onClick={reset}>Reset</button>
        </div>
      </form>
    </main>
  );
}
