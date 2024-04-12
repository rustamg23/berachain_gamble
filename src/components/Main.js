import bg from '../img/bg.png'; 
import bear from '../img/bear.png'; 
import cig from '../img/cig.webp'; 
import discord from '../img/discord.png';
import mirror from '../img/mirror.png';
import x from '../img/x.png';
import gitbook from '../img/gitbook.png';
import { useState } from 'react';


function Main() {
  const iconSizeClasses = "h-18 w-18 hover:scale-110 ease-in-out duration-500";
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);

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
      <button className="xl:hidden absolute top-5 right-5 z-30" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="space-y-2">
              <span className="block w-8 h-0.5 "><img src={cig}/></span>
              <span className="block w-8 h-0.5 "><img src={cig}/></span>
              <span className="block w-8 h-0.5 "><img src={cig}/></span>
            </div>
          </button>
      <div className={`fixed top-0 right-0 w-64 bg-black bg-opacity-80 h-screen z-20 transform transition-transform ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col items-center justify-center space-y-8 pt-20">
          {/* Ссылки на социальные сети */}
          <a href='https://twitter.com/JunkyUrsas' target="_blank" rel="noopener noreferrer">
            <img src={x} alt="X" className={iconSizeClasses}/>
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
    <div className="flex xl:flex-row flex-col justify-around items-center h-screen bg" >
      <div className="max-w-2xl text-left md:space-y-8 space-y-3 xl:-ml-32 mx-5 top-6 absolute md:relative xl:top-auto">
        {/* <div className='flex items-center justify-between w-full'> */}
          <h1 className="md:text-80 xs:text-5xl text-4xl font-bold bowlby-font text-white xl:mb-auto " style={{ textShadow: '8px 12px 2px rgba(0, 0, 0, 0.5)' }}>JUNKY URSAS</h1>
          
        {/* </div> */}
        <p className='text-white poppins-font md:text-xl  text-sm font-normal xl:w-9/10 w-full xl:mb-auto ' style={{ textShadow: '3px 3px 2px rgba(0, 0, 0, 0.5)' }}>Junky Ursas is an exhilarating NFT project that brings together a collection of uniquely designed bear-themed digital art pieces, each one imbued with its own quirky personality and style. This inventive series not only celebrates the creativity and diversity.</p>

        <button className="poppins-font font-normal bg-red-500  text-white py-2 px-4 rounded-full w-full text-2xl hover:bg-red-600 hover:scale-105 ease-in-out duration-500">GO TO APP</button>
        
        <div className="xl:flex space-x-8 w-1/2 hidden">
          <a href='https://twitter.com/JunkyUrsas' target="_blank" rel="noopener noreferrer">
            <img src={x} alt="X" className={iconSizeClasses}/>
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
      <div>
        <div className="absolute bottom-0 xl:right-32 xl:left-auto right-12 left-12 md:right-48 md:left-48">
          <img src={bear} alt="Bear" className="w-full xl:h-80 h-50 hidden sm:block"  />
        </div>
      </div>
      
    </div>
    </div>
  );
}

export default Main;




