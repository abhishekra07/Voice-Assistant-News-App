import { useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

const alanAPIKey = ALAN_API_KEY;

const App = () => {

  useEffect( () => {
    alanBtn({
      key: alanAPIKey,
      onCommand: ({ command }) => {
        if(command === 'testCommand'){
          alert('testCommand is executes');
        }
      }
    })
  }, [])

  return (
    <div >
      Alan AI News Application
    </div>
  );
}

export default App;
