import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharacters] = useState(false);

  const passwordRef = useRef(null);

  const copyPasswordToClipboardHandler = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    (function () {
      let pass = '';
      let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      if (numbers) str += '0123456789';
      if (characters) str += '~`!@#$%^&*()[]{}_+=-';

      for (let i = 1; i <= length; i++) {
        let randomCharIndex = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(randomCharIndex);
      }
      setPassword(pass);
    })();
  }, [length, numbers, characters]);

  return (
    <div className='bg-lime-800 w-full h-screen text-lg flex justify-center items-center text-white flex-col gap-10'>
      <span className='text-[60px] mb-[100px]'>Password generator</span>
      <div className='flex justify-center items-center w-full gap-2'>
        <input className='p-2 rounded-md w-3/12 outline-none text-black' readOnly value={password} ref={passwordRef} />
        <button
          onClick={copyPasswordToClipboardHandler}
          className='border-solid border-2 border-white rounded-md p-2 hover:bg-gray-200 hover:text-black'
        >
          Copy
        </button>
      </div>
      <div className='flex gap-10'>
        <div>
          <input type='range' value={length} onChange={(e) => setLength(e.target.value)} />
          <span className='ml-2 text-white'>Length: {length}</span>
        </div>
        <div className='flex items-center'>
          <input
            type='checkbox'
            className='form-checkbox h-5 w-5 text-indigo-600 '
            checked={numbers}
            onChange={() => setNumbers((prev) => !prev)}
          />
          <span className='ml-2 text-white'>numbers</span>
        </div>
        <div className='flex items-center'>
          <input
            type='checkbox'
            className='form-checkbox h-5 w-5 text-indigo-600'
            onChange={() => setCharacters((prev) => !prev)}
            checked={characters}
          />
          <span className='ml-2 text-white'>characters</span>
        </div>
      </div>
    </div>
  );
}

export default App;
