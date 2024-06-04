




import React, {memo} from 'react'
import { Container } from 'react-bootstrap'

const AboutUs = (props) => {
    return (
        
        < >
        <Container fluid>
            <h1 style={{paddingBottom:40}}>About Us</h1>
            <h3> This is Addis Alem Hospital</h3>
           
            <p>
           Addis Alem hospital was established in July 10/2007 E.C in Bahirdar city at Atse Tewodros
sub-city. The hospital had only few employees due to lack of workers every task of the
hospital was done by a few employees. Now a day the hospital has many employees. It
gives many activities for patients for example give drugs and treatments.


        Do you want to help or support a friend or family member
        who is in need of medical treatment?  Are you in need of 
        medical treatment and not sure where or how to get support? 
        A patient advocate shouldn’t be an additional cost burden.
        We can help develop a team by using the people who know 
        the patient best, or find the best advocate for you!

</p>
           
            
<h3>YOU ARE HERE TO FIND</h3>
</Container>
        </>
    )
}

export default memo (AboutUs);
