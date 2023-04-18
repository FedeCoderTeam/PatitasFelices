export default function validate(values) {
  const errors = {};
  if (!values.fullName) {
    errors.fullName = "Se requiere que escribas tu nombre completo";
  }
  return errors;
}
