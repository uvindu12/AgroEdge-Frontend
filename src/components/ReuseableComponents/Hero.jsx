import { useState } from 'react'

export default () => {
    return (
        <>
            <section className="items-center max-w-screen-xl px-4 pb-4 mx-auto mt-24 lg:flex md:px-8">
                <div className="flex-1 space-y-4 sm:text-center lg:text-left">
                    <h1 className="text-4xl font-bold text-gray-800 xl:text-5xl">
                        Empowering Farmers with
                         <span className="text-green-400"> Real-Time Insights</span>
                    </h1>
                    <p className="max-w-xl leading-relaxed text-gray-500 sm:mx-auto lg:ml-0">
                        AgroEdge transforms traditional farming by providing farmers with real-time data, personalized recommendations, and innovative tools. Our platform empowers farmers to make informed decisions, optimize resources use and boost productivity
                    </p>
                    {/* <div>
                        <p className="py-3 text-gray-800">
                            Subscribe to our newsletter and we'll save your time
                        </p>
                        <form className="items-center space-y-3 sm:justify-center sm:space-x-3 sm:space-y-0 sm:flex lg:justify-start">
                            <input
                                type="text"
                                placeholder="Enter your email"
                                className="w-full p-3 text-gray-500 border rounded-md outline-none sm:w-72"
                            />
                            <button className="w-full px-4 py-3 text-center text-white bg-gray-700 rounded-md shadow outline-none ring-offset-2 ring-gray-700 focus:ring-2 sm:w-auto">
                                Subscribe 
                            </button>
                        </form>
                    </div> */}
                </div>
                <div className="flex-1 mt-4 text-center lg:mt-0 lg:ml-3">
                    <img src="src/images/hero.jpeg" className="w-full mx-auto sm:w-10/12 lg:w-full" />
                </div>
            </section>
        </>
    )
}
