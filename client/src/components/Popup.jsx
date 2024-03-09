import React from 'react'


export default function Popup(props) {
  return (props.trigger) ? (
    <div className='popup'>
            <div className='popup-inner'>
                <button className='close-btn'>
                    {props.children}
                </button>
            </div>
    </div>): "";

  
}
