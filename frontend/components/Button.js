export default function Button({ text, onClick, className }) {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
}

Button.defaultProps = {
  text: 'Click me',
  onClick: null,
  className: 'px-6 py-2 bg-gray-800 rounded text-white mb-6',
};
