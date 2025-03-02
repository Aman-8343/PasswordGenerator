import { useState,useCallback ,useEffect} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const[numberAllowed,setNumberAllowed]=useState(false);
  const[symbolAllowed,setSymbolAllowed]=useState(false)
  const[password,setPassword]=useState("");

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
    [length,numberAllowed,symbolAllowed,setPassword])


 
useEffect(()=>{passwordGenerator()}, [length,numberAllowed,symbolAllowed,passwordGenerator])


  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
      <h1 className='text-white text-center my-7'>Password Generator</h1>
<div className='flex shadow rounded-lg overflow-hidden mb-4'>
<input 
type="text"
value={password}
className='outline-none w-full py-1 px-3 bg-white my-3  '
placeholder='Password'
readOnly
/>
<button className='outline-none bg-blue-700 text-white px-3 py-0.5 my-3 shrink-0'>Copy</button>

</div>

<div className='flex text-sm gap-x-2'>
  <div className='flex items-center gap-x-1'></div>
  <input type="range"
  min={6}
  max={100}
  value={length}
  className='cursor-pointer'
  onChange={(e)=>{setLength(e.target.value)}}
  />
  <label>length:{length}</label>
</div>
<div className='flex items-center gap-x-1'>
  <input
  type="checkbox"
  className='ml-55 mb-20'
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
  className='ml-55 mb-20'
  defaultChecked={symbolAllowed}
  id="symbolInput"
  onChange={()=>{
    setSymbolAllowed((prev)=>!prev);
  }} />
  <label htmlFor="symbolInput">Symbols</label>
</div>


</div> 
    </>
  )
}

export default App
