import React from 'react'
import web from "../images/undraw_exams_g-4-ow.svg"

function Signup() {
  return (
    <div>
        <section className='signup'>
            <div className='container mt-5'>
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className='form-title'> signup </h2>
                        <form className='register-form' id="register-form">
                        <div className='form-group'>
                            <label htmlFor='name'></label>
                        </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Signup