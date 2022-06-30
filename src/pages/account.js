import React, { useState } from 'react'

const Account = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const update = () => {

    }

    return (
        
        <div className="relative bg-blue-100 w-full h-[93vh] flex flex-col items-center justify-center">
            <div className="px-4 md:px-6 w-full sm:w-5/6 md:11/12 ">
                <div className="flex flex-wrap w-full justify-center">
                    <div className="relative flex flex-col gap-y-2 w-full mb-6 shadow-lg rounded-lg bg-white">
                        <div className="mb-0 p-6 pb-0">
                            <div className="text-center flex justify-between items-center">
                                <h6 className="text-xl font-bold mb-10">{props.name} Account Settings</h6>
                                <input type='button' className='inline-block outline-none focus:outline-none align-middle transition-all duration-150 ease-in-out uppercase border border-solid font-bold last:mr-0 mr-2' />
                            </div>
                        </div>
                        <div className="flex-auto px-6 pb-6 pt-0">
                            <form className='flex flex-col gap-y-10'>
                                <div>
                                    <label for='email'>Email : </label>
                                    <input value={props.user.email} onChange={e => setEmail(e.target.value)} type='email' name='email' id='email' className='px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full'/>
                                </div>
                                <div>
                                    <label for='password'>Password : </label>
                                    <input placeholder='new password' onChange={e => setPassword(e.target.value)} type='password' name='password' id='password' className='px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full' />
                                </div>
                                <div>
                                    <label for='name'>Full Name : </label>
                                    <input type='text' name='name' id='name' onChange={e => setName(e.target.value)} className='px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full' />
                                </div>
                                <div className='mt-4'>
                                    <input value='Update Account' onClick={update} type='button' className='bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account;