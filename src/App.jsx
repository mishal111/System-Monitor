import Background from './components/Background'
import Navigation from './components/Navigation';
import ModeSelector from './components/Mode';
import Storage from './components/Storage';
import CpuCard from './components/Cpu';
import NVME from './components/NVME';
import FanCard from './components/Fan';

function App() {
   return(

      <Background>
         <ModeSelector/>
         <CpuCard/>
         <br/>
         <FanCard/>
         
         <br/>
         <NVME/>
         <br/>
         <Storage/>
      </Background>
      
      
   );
}

export default App
