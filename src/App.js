import { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';

const alanAPIKey = ALAN_API_KEY;

const App = () => {

  const [ newsAtricles, setNewsAtricles ] = useState([]);

  useEffect( () => {
    alanBtn({
      key: alanAPIKey,
      onCommand: ({ command, articles }) => {
        if(command === 'newHeadlines'){
          console.log('articles ', articles);
          setNewsAtricles(articles);
        }
      }
    })
  }, [])

  return (
    <div >
      Alan AI News Application
      <NewsCards articles={newsAtricles} />
    </div>
  );
}

export default App;
