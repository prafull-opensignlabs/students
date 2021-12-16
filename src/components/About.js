import React from 'react'

export const About = () => {
    return (
        <div className='about'>
            
           <h2>About</h2>
           <h4>Students App</h4>
            <p>Basically , In this app we can Add student</p>
            <ul>
            <li> You can add New student Data</li>
            <li> You can't add data of student whose age is below 18 due to validation</li>
            <li> You can Delete student Data but only whose age is greater than 30 due to validation</li>
            <li> You can Activate / Deactivate student Data</li>
            </ul>
            
        </div>
    )
}
