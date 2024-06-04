import React from 'react'
import "./PatientRecord.css"
function Nurse() {
    return (
        <div className="BodyArea">
          <h3>
          nurse PAGE
          </h3>
          <div className="patientRecord">
          <form>
        
          <div className='Password'>
        <button>Manage Bed</button> 
        </div>
        <div className='Password'>
        <button>Elective Adimission</button> 
        </div>
        
        <div className='Password'>
        <button>Facility Reffer</button> 
        </div>

        <div className='Password'>
        <button>Manage Appointment</button> 
        </div>
        <div className='Password'>
        <button>Write patient History</button>
        </div>
        <div className='Password'>
        <button>Manage Payment Method</button> 
        </div>
        <div className='Password'>
        <button>Generate Report</button> 
        </div>
        
           </form>
          </div>
      </div>
    )
}

export default Nurse;
