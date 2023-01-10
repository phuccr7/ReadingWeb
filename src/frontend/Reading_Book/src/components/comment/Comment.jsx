import './commentStyle.css'
import {useState} from "react";

function Comment() {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    const onClickHandler = () => {
        setComments((comments) => [...comments, comment]);
    }

    const onChangeHandler = (e) => {
        setComment(e.target.value);
    }

    return (
      <div>
        
        <div className="comment-container" >
            
          <div className="comment-flexbox">
            <h3 className="comment-text">Comment</h3>
            <textarea value={comment} onChange={onChangeHandler} className="input-box"></textarea>
            <button className="comment-button" onClick={onClickHandler}>Submit</button>
          </div>
          <div className='show-comment'>
            {comments.map((text) => (
                <div className='comment-box'>{text}</div>

            ))}
            </div>
          
  
        </div>
      </div>
    )
  }
  
  
  
  // bodyHome
  // }
  export default Comment
  