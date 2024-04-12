import bearImage from '../img/mainbg.png'; 
import discord from '../img/discord.png';
import mirror from '../img/mirror.png';
import x from '../img/x.png';
import gitbook from '../img/gitbook.png';
import { useState } from 'react';


function Main() {
  const iconSizeClasses = "h-18 w-18";
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (event) => {
    setCursorPos({ x: event.clientX, y: event.clientY });
  };
  return (
    <div onMouseMove={handleMouseMove} className="custom-cursor">
      <div
        className="cursor-smoke"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`
        }}
      />
    <div className="flex justify-around items-center h-screen bg-cover bg-no-repeat bg-center " style={{ backgroundImage: `url(${bearImage})`, backgroundSize: 'cover', backgroundRepeat: 'repeat' }}>
      <div className="absolute top-5 left-5 flex space-x-2">
      
    </div>
      <div className="max-w-2xl text-left space-y-8 -ml-32">
        <h1 className="text-80 font-bold bowlby-font text-white " style={{ textShadow: '8px 12px 2px rgba(0, 0, 0, 0.5)' }}>JUNKY URSAS</h1>
        <p className='text-white poppins-font text-xl font-normal w-9/10' style={{ textShadow: '3px 3px 2px rgba(0, 0, 0, 0.5)' }}>Junky Ursas is an exhilarating NFT project that brings together a collection of uniquely designed bear-themed digital art pieces, each one imbued with its own quirky personality and style. This inventive series not only celebrates the creativity and diversity.</p>
        <div>

        </div>
        <button className="poppins-font font-normal bg-red-500 text-white py-2 px-4 rounded-full w-1/2 text-2xl hover:bg-red-600 hover:scale-105 ease-in-out duration-500">GO TO APP</button>
        
        <div className="flex space-x-8 w-1/2 ">
          <a href='https://twitter.com/JunkyUrsas' target="_blank" rel="noopener noreferrer">
            <img src={x} alt="X" className={iconSizeClasses} />
          </a>
          <a href='https://discord.com/invite/junkyursas' target="_blank" rel="noopener noreferrer">
            <img src={discord} alt="Discord" className={iconSizeClasses} />
          </a>
          
          <a href='https://junky-ursas-llc.gitbook.io/junky-ursas-smokumentaion' target="_blank" rel="noopener noreferrer"> 
            <img src={gitbook} alt="Gitbook" className={iconSizeClasses} />
          </a>
          
          <a href='https://mirror.xyz/0x233404B1F7d0cB9533Abe1d17552Fd191FD56877' target="_blank" rel="noopener noreferrer">
            <img src={mirror} alt="Mirror" className={iconSizeClasses} />
          </a>
          
        </div>
      </div>
      <div className=""></div> 
    </div>
    </div>
  );
}

export default Main;




