import React from 'react';
import './widgets.css';
import InfoIcon from '@material-ui/icons/Info';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

export default function Widgets() {

  const newsArticle = (headline, subtitle) => (
      <div className="widgets_article">
          <div className="widget_articleLeft">
              <FiberManualRecordIcon />
          </div>
          <div className="widget_articleRight">
              <h4>{headline}</h4>
              <p>{subtitle}</p>
          </div>
      </div>
  );

  return (
    <div className='widgets'>
      <div className="widgets_header">
          <h2>Linkedin News</h2>
          <InfoIcon />
      </div>
      {newsArticle("Coronavirus Updates", "Top News - 886 readers")}
      {newsArticle("Tesla Hits New High", "Cars & Auto - 300 readers")}
      {newsArticle("Shark Tank India Is Superhit", "Television - 582 readers")}
      {newsArticle("Bitcoin Breaks $22k", "Crypto - 8000 readers")}
      {newsArticle("Is Redux Too Good?", "Code - 123 readers")}
    </div>
  );
}
