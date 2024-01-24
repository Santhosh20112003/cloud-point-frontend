import React from 'react'
import Footer from './Footer'
import Navigation from './Navigation'
import TopBannar from './TopBannar';

function About() {
	return (
		<div>
			<TopBannar />
			<Navigation />
			<div className="container mx-auto p-8">
				<section class="text-gray-600 body-font">
					<div class="container lg:px-12 py-24 mx-auto flex flex-wrap items-center">
						<div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
							<h1 class="title-font font-medium text-3xl text-gray-900">Contact Us 😉</h1>
							<p class="leading-relaxed my-4"> Have questions or feedback? We'd love to hear from you! Feel free to
								reach out to us using the form below, and we'll get back to you as
								soon as possible.</p>
							<iframe class="w-full bg-gray-200 rounded-lg shadow-lg h-[350px]" frameborder="0" title="map" marginheight="0" marginwidth="0" scrolling="no" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125432.38285197991!2d79.1314494!3d10.7528199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baab89cea453039%3A0xe113da9b1f632be6!2sThanjavur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1699945692037!5m2!1sen!2sin"></iframe>
						</div>
						<form action="https://formsubmit.co/shanmugamsanthosh22@gmail.com" method='POST' class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
							<h2 class="text-gray-900 text-lg font-medium title-font mb-5">Feedback for us</h2>
							<div class="relative mb-4">
								<label for="full-name" class="leading-7 text-sm text-gray-600">Full Name</label>
								<input required type="text" id="full-name" name="full-name" class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
							</div>
							<div class="relative mb-4">
								<label for="email" class="leading-7 text-sm text-gray-600">Email</label>
								<input required type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
							</div>
							<div class="relative mb-4"><label for="message" class="leading-7 text-sm text-gray-600">Message</label><textarea required id="message" name="message" class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea></div>
							<button class="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">Share Response</button>
						</form>
					</div>
				</section>
			</div>
			<Footer />
		</div>
	)
}

export default About
