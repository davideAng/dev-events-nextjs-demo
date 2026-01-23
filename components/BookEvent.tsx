'use client';

import { useState } from "react";

const BookEvent = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTimeout(() => {
          setSubmitted(true);
        }, 1000);    
    };
  return (
    <div id='book-event'>
       {submitted ? (
        <p className="text-sm">Thank you for signing up! A confirmation email has been sent to {email}.</p>
       ) : (
        <form 
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email"
          />
          <button type="submit" className="button-submit">Submit</button>
        </form>
      )}
    </div>
  )
}

export default BookEvent