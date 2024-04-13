import bg from '../img/bg.png'; 
import bear from '../img/bear.png'; 
import cig from '../img/cig.webp'; 
import discord from '../img/discord.png';
import mirror from '../img/mirror.png';
import x from '../img/x.png';
import gitbook from '../img/gitbook.png';
import { useState } from 'react';


function Main() {
  const iconSizeClasses = "h-18 w-18 opacity-75 hover:opacity-100 hover:scale-110 ease-in-out duration-500";
  const iconSizeClassesMob = "h-18 w-18 max-w-max opacity-75 mx-2";
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMouseMove = (event) => {
    setCursorPos({ x: event.clientX, y: event.clientY });
  };
  return (
    <div onMouseMove={handleMouseMove} className="custom-cursor bg-green-500">
      <div
        className="cursor-smoke"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`
        }}
      />
      
    <div className="xl:flex xl:flex-row grid grid-rows-2 justify-around items-center w-svw h-lvh bg " >
      <div className="max-w-2xl text-left space-y-8 xl:-ml-32 m-5 xl:relative xl:h-auto flex flex-col h-90p ">
        <h1 className="md:text-80 xs:text-5xl text-4xl font-bold bowlby-font text-white xl:mb-auto " style={{ textShadow: '8px 12px 2px rgba(0, 0, 0, 0.5)' }}>JUNKY URSAS</h1>
        <p className='text-white poppins-font md:text-xl  text-sm font-normal xl:w-9/10 w-full xl:mb-auto ' style={{ textShadow: '3px 3px 2px rgba(0, 0, 0, 0.5)' }}>Junky Ursas is an exhilarating NFT project that brings together a collection of uniquely designed bear-themed digital art pieces, each one imbued with its own quirky personality and style. This inventive series not only celebrates the creativity and diversity.</p>
        <button className="poppins-font font-normal bg-red-500  text-white py-2 px-4 rounded-full xl:w-1/2 w-full text-2xl hover:bg-red-600 hover:scale-105 ease-in-out duration-500">GO TO APP</button>
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
          <div className=''></div>
          <img src={bear} alt="Bear" className="w-full xl:h-80 h-50 hidden sm:block"  />
        </div>
        
      </div>
      <div className="xl:hidden mb-5">
          <div className='flex flex-row w-full  justify-center items-center px-5'>

            <a href='https://twitter.com/JunkyUrsas' target="_blank" rel="noopener noreferrer">
              <img src={x} alt="X" className={iconSizeClassesMob}/>
            </a>
            <a href='https://discord.com/invite/junkyursas' target="_blank" rel="noopener noreferrer">
              <img src={discord} alt="Discord" className={iconSizeClassesMob} />
            </a>

            <a href='https://junky-ursas-llc.gitbook.io/junky-ursas-smokumentaion' target="_blank" rel="noopener noreferrer"> 
              <img src={gitbook} alt="Gitbook" className={iconSizeClassesMob} />
            </a>

            <a href='https://mirror.xyz/0x233404B1F7d0cB9533Abe1d17552Fd191FD56877' target="_blank" rel="noopener noreferrer">
              <img src={mirror} alt="Mirror" className={iconSizeClassesMob} />
            </a>
          </div>
          
        </div>
    </div>
    
    </div>
  );
}

export default Main;




