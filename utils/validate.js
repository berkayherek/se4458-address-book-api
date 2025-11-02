function validateContact(payload, opts = { partial: false }) {
  const errors = [];
  if (!opts.partial) {
    if (!payload.firstName) errors.push('firstName is required');
    if (!payload.email) errors.push('email is required');
  }
  if (payload.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payload.email)) {
    errors.push('email is invalid');
  }
  return { valid: errors.length === 0, errors };
}

module.exports = { validateContact };