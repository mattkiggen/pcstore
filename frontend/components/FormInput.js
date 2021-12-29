export default function FormInput({ label, type, value, onChange }) {
  return (
    <label className='flex flex-col mb-6'>
      <span>{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className='p-2 rounded border border-gray-200'
      />
    </label>
  );
}
