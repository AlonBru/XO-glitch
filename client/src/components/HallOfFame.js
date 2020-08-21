import React,{useState} from 'react';
import { Modal } from '@material-ui/core';
import Axios from 'axios';

const HallOfFame= () => {
    const [displayHOF,setDisplayHOF]= useState(false)
    const [HOF,setHOF]= useState([])
    const  getHOF= async () => {
        const records = (await Axios.get('/api/v1/records')).data;
        setDisplayHOF(true)
            if (records.length){
            setHOF(records);
            } else {
                setHOF([{winnerName:'None on record', date:'get to winning!'}])
            }
    }
    return(<>
        <button 
        className='buttonHOF'
        onClick={getHOF} 
        >
            Display Hall Of Fame
        </button>
        <Modal  open={displayHOF} onClose={()=>{setDisplayHOF(false)}}>
        {/* <Modal  open={true} onClose={()=>{setDisplayHOF(false)}}> */}
        <div className='HOF'>

        {/* <button 
        className='buttonHOF'
        onClick={getHOF} 
        >
            Display Hall Of Fame
        </button> */}

        <h1>Hall of Fame</h1>
        <hr />
        <p> <strong>Glory</strong><br />
        Glory to all those who vanquish their foes <br/>in the open combat of tic-tac-toe</p>
        <table className='recordsModal'>
            <thead>
                    <th>Winner's Name</th>
                    <th style={{borderLeft: "1px solid rgb(119, 101, 1)"}}>time to win</th>
                    <th style={{borderLeft: "1px solid rgb(119, 101, 1)"}} >Date of win</th>
            </thead>
            <tbody>
              {HOF.map((record,number)=>{
                    if(number===HOF.length-1){
                        return(
                    <tr style={{borderBottom:' unset'}} key={record.id}>        
                        <td style={{borderBottom:' unset'}}>{record.winnerName}</td>
                        <td style={{borderBottom:' unset',borderLeft: "1px solid rgb(119, 101, 1)"}}>{record.gameDuration}</td>
                        <td style={{borderBottom:' unset',borderLeft: "1px solid rgb(119, 101, 1)"}}>{record.date}</td>
                    </tr>)
                    }
                return(
                    <tr key={record.id}>        
                        <td>{record.winnerName}</td>
                        <td style={{borderLeft: "1px solid rgb(119, 101, 1)"}}>{record.gameDuration}</td>
                        <td style={{borderLeft: "1px solid rgb(119, 101, 1)"}}>{record.date}</td>
                    </tr>)})
            }  
            </tbody>
        </table>
        </div>
        </Modal>
    </>
    )
}
export default HallOfFame