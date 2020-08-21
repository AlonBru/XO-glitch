import React from 'react';
import { Modal } from '@material-ui/core';
import chicken from './chicken.png'


const WinModal = (props) => {
    return  (
        <Modal  open={props.open} onClose={props.onclose}>            
            <div className="winModal">
                <img className='chicken' src={chicken} alt='WINNER WINNER' />
                <label className='winnerInput' htmlFor='input'>
                Champion, enter thy name!
                    <input 
                        placeholder= ''
                        onChange={props.writeName} />
                    <button onClick={props.logWinner}> ⸙ Perpetuate your Triumph ⸙ </button>                
                </label>
            </div>
          </Modal>)
}
export default WinModal