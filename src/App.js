import { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import wordsToNumbers from 'words-to-numbers';

import useStyles from './styles';

const alanAPIKey = ALAN_API_KEY;

const App = () => {

  const classes = useStyles();

  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    alanBtn({
      key: alanAPIKey,
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    });
  }, []);

  return (
    <div >
      <div className={classes.logoContainer}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmEUzvtmkBh-oesLLVagdE0shA3GxgH5oZiA&usqp=CAU" className={classes.alanLogo} alt="logo" />
      </div>
    <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
