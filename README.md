# Deepagent

## Login Page

A modern, responsive login page built with HTML, CSS, and JavaScript. The login page provides a user-friendly interface for authentication.

### Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Form Validation**: Client-side validation for email and password fields
- **Intuitive UI**: Clean, modern design with gradient background
- **Error Handling**: Real-time error messages for invalid inputs
- **Remember Me**: Checkbox option to remember login credentials
- **Forgot Password**: Link to password recovery flow
- **Accessibility**: Proper form labels and ARIA-compatible structure

### Getting Started

#### Opening the Login Page

Simply open `login.html` in your web browser:

```bash
# On macOS/Linux
open login.html

# On Windows
start login.html

# Or double-click the file in your file explorer
```

### Form Fields

| Field | Type | Requirements | Notes |
|-------|------|--------------|-------|
| Email Address | email | Valid email format | Required, validated on submit |
| Password | password | Min 6 characters | Required, validated on submit |
| Remember Me | checkbox | Optional | Saves login preference |

### Validation Rules

- **Email**: Must follow standard email format (example@domain.com)
- **Password**: Minimum 6 characters required
- Both fields are required

### Error Messages

The form displays context-specific error messages:

- "Email is required" - Email field is empty
- "Please enter a valid email address" - Invalid email format
- "Password is required" - Password field is empty
- "Password must be at least 6 characters" - Password too short

### Usage Examples

**Valid Login Credentials (for testing):**
```
Email: user@example.com
Password: password123
```

The form accepts any valid email format and password with 6+ characters for demonstration purposes.

### Customization

#### Changing Colors

Modify the gradient colors in the CSS:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

#### Changing Branding

Update the company name in the form header:

```html
<h1>Your Company Name</h1>
```

#### Adjusting Password Requirements

Update the validation rule in the JavaScript:

```javascript
function validatePassword(password) {
    return password.length >= 6; // Change minimum length here
}
```

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### File Structure

```
login.html          # Main login page (HTML, CSS, and JavaScript combined)
```

### Future Enhancements

- Backend API integration for authentication
- Two-factor authentication (2FA)
- Social login (Google, GitHub, etc.)
- Password strength indicator
- Remember device for extended sessions
- Security features (rate limiting, account lockout)

### Security Notes

⚠️ **Important**: This is a frontend demonstration. For production use:

1. Never store passwords in plain text
2. Use HTTPS for all authentication requests
3. Implement backend validation (frontend validation is for UX only)
4. Use secure session management
5. Implement rate limiting to prevent brute force attacks
6. Add CSRF protection
7. Use secure password hashing (bcrypt, Argon2, etc.)

### Support

For issues or questions about the login page, please refer to the main documentation or contact the development team.
