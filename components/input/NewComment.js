import { useRef, useState } from 'react';
import classes from './NewComment.module.css';

export default function NewComment({ onAddComment }) {
  const [isInvalid, setIsInvalid] = useState(false);

  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const textInputRef = useRef();

  function sendCommentHandler(e) {
    e.preventDefault();

    const email = emailInputRef.current.value;
    const name = nameInputRef.current.value;
    const text = textInputRef.current.value;
    console.log(email, name, text)

    if (
      !email || email.trim() === '' || !email.includes('@') ||
      !name || name.trim() === '' ||
      !text || text.trim() === ''
    ) {
      setIsInvalid(true);
      return;
    }

    onAddComment({ email, name, text });
  }

  return (
    <form className={classes.form} onSubmit={sendCommentHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor='email'>Your email</label>
          <input type='email' id='email' ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='name'>Your name</label>
          <input type='text' id='name' ref={nameInputRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor='text'>Your comment</label>
        <textarea id='text' rows='5' ref={textInputRef}></textarea>
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <button>Submit</button>
    </form>
  );
}
