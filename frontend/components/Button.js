export default function Button({ text, onClick }) {
  return (
    <button
      className='px-6 py-2 bg-gray-800 rounded text-white mb-6'
      onClick={onClick}>
      {text}
    </button>
  );
}

Button.defaultProps = {
  text: 'Click me',
  onClick: null,
};
