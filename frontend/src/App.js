import { useEffect } from 'react';
import Layout from './componet/commonComponet/layout/Layout';
import "./styles/pages_styles/App.css"

function App() {

  useEffect(() => {
    scrollToTop();
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div className="App">
      <Layout />
      <div className='top_arrow_circle' onClick={scrollToTop} >
        <img src="./images/top-arrow-different.jpg" alt="truck images" width={30} height={30} />
      </div>
    </div>
  );
}

export default App;
