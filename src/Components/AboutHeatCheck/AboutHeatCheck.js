import React from 'react'
import "./AboutHeatCheck.css"

const AboutHeatCheck = () => {
    return (
        <div className='aboutHeatCheck'>

            <h1 className='aboutHeatCheckTitle'> About Heat Check </h1>
            <p> Looking for two burns? We got you! Log in as a user and simply input a location to find a list of restaurants in the area. </p>
            <p> After melting your tongue, leave a review to an existing dish or add your dish and review to the menu. Thank you and see you again soon! </p>

            <div className='teams'>
                <div className='teams-style'>
                    <h1> Front End Team </h1>
                    <ul> Ivy Nguyen: <a href="https://github.com/INguyen22" rel="noreferrer"> GitHub </a> & <a href="https://www.linkedin.com/in/ivy-nguyen-051b27212/" rel="noreferrer"> LinkedIn </a> </ul>
                    <ul> David Daw: <a href="https://github.com/davidhdaw" rel="noreferrer"> GitHub </a> & <a href="https://www.linkedin.com/in/david-daw-04aa36237/" rel="noreferrer"> LinkedIn </a> </ul>
                    <ul> Cleveland Ticoalu: <a href="https://github.com/cleveland231" rel="noreferrer"> GitHub </a> & <a href="https://www.linkedin.com/in/cleveland-ticoalu/" rel="noreferrer"> LinkedIn </a> </ul>
                </div>

                <div className='teams-style'>
                <h1> Back End Team </h1>
                    <ul> Phillip Stewerts: <a href="https://github.com/philmarcu" rel="noreferrer"> GitHub </a> & <a href="https://www.linkedin.com/in/phillip-stewart-15497183/" rel="noreferrer"> LinkedIn </a> </ul>
                    <ul> Eli Sachs: <a href="https://github.com/easachs" rel="noreferrer"> GitHub </a> & <a href="https://www.linkedin.com/in/easachs/" rel="noreferrer"> LinkedIn </a> </ul>
                    <ul> Gauri Joshi: <a href="https://github.com/gaurijo" rel="noreferrer"> GitHub </a> & <a href="https://www.linkedin.com/in/gaurijo/" rel="noreferrer"> LinkedIn </a> </ul>
                    <ul> Ethan Nguyen: <a href="https://github.com/Ethan-t-n" rel="noreferrer"> GitHub </a> & <a href="https://www.linkedin.com/in/ethan-nguyen-82b398233/" rel="noreferrer"> LinkedIn </a> </ul>
                </div>
            </div>
        </div>
    )
}

export default AboutHeatCheck