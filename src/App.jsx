import { useState,useCallback ,useEffect,useRef} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const[numberAllowed,setNumberAllowed]=useState(false);
  const[symbolAllowed,setSymbolAllowed]=useState(false)
  const[password,setPassword]=useState("");
  

  //ref hook
  const passwordref =useRef(null)



  const passwordGenerator=useCallback(  ()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVQFXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str+="1234567890"
    if(symbolAllowed) str+="!@#$%^&*"

    for (let i = 1; i <= length; i++) {
     let char=Math.floor(Math.random()*str.length+1)
     pass+=str.charAt(char)

      
    }
    
    setPassword(pass)
  },
    [length,numberAllowed,symbolAllowed,])

const copyPasswordToClipboard=useCallback(()=>{
  passwordref.current?.select()
  window.navigator.clipboard.writeText(password)
},[password])
 
useEffect(()=>{passwordGenerator()}, [length,numberAllowed,symbolAllowed,passwordGenerator])


  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-6 py-4 my-15 text-orange-500 bg-gray-800'>
      <h1 className='text-white text-center my-2 text-3xl'>Password Generator</h1>
<div className='flex shadow rounded-lg overflow-hidden mb-4'>
<input 
type="text"
value={password}
className='outline-none w-full py-1 px-3 bg-white text-black my-3  '
placeholder='Password'
readOnly
ref={passwordref}
/>
<button
onClick={copyPasswordToClipboard} 
className='outline-none bg-blue-700 text-white px-3 py-0.5 my-3 shrink-0'>Copy</button>

</div>

<div className='flex text-sm gap-x-2'>
  <div className='flex items-center gap-x-1'>
  <input type="range"
  min={6}
  max={30}
  value={length}
  className='cursor-pointer'
  onChange={(e)=>{setLength(e.target.value)}}
  />
  <label>Length:{length}</label>
</div>
<div className='flex items-center gap-x-1'>
  <input
  type="checkbox"
  className='ml-6'
  defaultChecked={numberAllowed}
  id="numberInput"
  onChange={()=>{
    setNumberAllowed((prev)=>!prev);
  }} />
  <label htmlFor="numberInput">Numbers</label>
</div>


<div className='flex items-center gap-x-1'>
  <input
  type="checkbox"
  className='ml-3'
  defaultChecked={symbolAllowed}
  id="symbolInput"
  onChange={()=>{
    setSymbolAllowed((prev)=>!prev);
  }} />
  <label htmlFor="symbolInput">Symbols</label>
</div>
</div>



</div> 
<div
className='text-white flex justify-center items-center p-80'>This UI is made by Hero</div>
    </>
  )
}

export default App
