import { FC } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

type Props = {
  text: string,
};

const MathComponent: FC<Props> = ({text}) => {
  
  const renderInlineMath = (content: string) => {
    //content example: 
    //"Adott a <strong>pozitív</strong> egész számok halmazának két részhalmaza: $A=\\{12-n\\'el\\ kisebb\\ prímszámok\\}$, $B = \\{3-mal\\ nem\\ osztható\\ egyjegy\\H{u}\\ számok\\}$.\n <br/>Elemei felsorolásával adja meg az $A\\setminus B$ halmazt!"
    const parts = content.split('$');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <InlineMath key={index}>{part}</InlineMath>;
      }
      return <span key={index} dangerouslySetInnerHTML={{__html:part}}></span>;
    });
  };
  return <div>{renderInlineMath(text)}</div>;
};

export default MathComponent;