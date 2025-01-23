import React, { useEffect } from 'react'
import './Modal.css'
import demoImg from '../assets/images/demo.jpg'
import './Bookmarks.css'

const Bookmarks = ({show, onClose, bookmarks, onDeleteBookmark, onSelectBookmark}) => {
  useEffect(() => {
    if (bookmarks) {
      try {
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      } catch (error) {
        console.error('Failed to save bookmarks to localStorage:', error);
      }
    }
  }, [bookmarks]);

  if(!show) {return null};
  return (
    <div className='modal-overlay'>
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
        </span>
        <h2 className='bookmarks-heading'>Bookmarked News</h2>
        <div className="bookmarks-list">
          {bookmarks.map((article, index) => (
                <div key={index} className="bookmark-item" onClick={() => onSelectBookmark(article)}>
                <img src={article.image} alt={article.title} />
                <h3>{article.title}</h3>
                <span className='delete-button' onClick={(e) => { e.stopPropagation(); onDeleteBookmark(article); }}>
                   <i className='fa-regular fa-circle-xmark'></i>
                </span>
            </div>
          ))}
        
        </div>
      </div>
    </div>
  )
}

export default Bookmarks