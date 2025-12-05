import Background from './components/Background'
import ModeSelector from './components/Mode';
import Storage from './components/Storage';
import CpuCard from './components/Cpu';
import NVME from './components/NVME';
import FanCard from './components/Fan';

function App() {
   return(
      <Background>
         <ModeSelector/>
         <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
            padding: '1rem'
         }}>
            <CpuCard/>
            <FanCard/>
            <NVME/>
            <Storage/>
         </div>
      </Background>
   );
}

export default App