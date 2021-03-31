import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function MyComponent() {
  const [value, setValue] = useState('');

  return (
    <ReactQuill theme="snow" value={value} onChange={setValue}/>
  );
}

export default MyComponent