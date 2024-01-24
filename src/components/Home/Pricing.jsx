import React from 'react'
import Footer from './Footer'
import Navigation from './Navigation'
import TopBannar from './TopBannar'

function Pricing() {
	return (
		<div className="">
			<TopBannar />
			<Navigation />
			<section class="text-gray-600 px-5 pt-20 body-font ">
				<div class="flex flex-col text-center w-full mb-20">
					
					<p class="text-xl break-words font-medium title-font mb-2 text-gray-900">Choose the plan that best suits your needs and start using Cloud Point right away.</p>
					
				</div>
				<div class="container mb-20 mx-auto">

					<div class="flex flex-wrap">
						<div class="lg:px-12 md:w-1/2 w-full">
							<div class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
								<h1 class="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">Free Forever</h1>
								<p class="flex items-center text-gray-600 mb-2">
									<span class="w-4 h-4 capitalize mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
										<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
											<path d="M20 6L9 17l-5-5"></path>
										</svg>
									</span>Limited cloud Space
								</p>
								<p class="flex items-center text-gray-600 mb-2">
									<span class="w-4 h-4 capitalize mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
										<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
											<path d="M20 6L9 17l-5-5"></path>
										</svg>
									</span>50 calls per day
								</p>
								<p class="flex items-center text-gray-600 mb-6">
									<span class="w-4 h-4 capitalize mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
										<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
											<path d="M20 6L9 17l-5-5"></path>
										</svg>
									</span>Unlimited Read and write.
								</p>
								<button class="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">Start using Today
									<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
										<path d="M5 12h14M12 5l7 7-7 7"></path>
									</svg>
								</button>
							</div>
						</div>
						<div class="lg:px-12 md:w-1/2 w-full mt-10 md:mt-0">
							<div class="h-full p-6 rounded-lg border-2 border-blue-500 flex flex-col relative overflow-hidden">
								<span class="bg-blue-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">Enterprise</span>
								<h1 class="text-5xl text-blue-500 pb-4 mb-4 border-b border-gray-200 leading-none">Custom Price</h1>
								<p class="flex items-center text-blue-600 mb-2">
									<span class="w-4 h-4 capitalize mr-2 inline-flex items-center justify-center bg-blue-400 text-white rounded-full flex-shrink-0">
										<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
											<path d="M20 6L9 17l-5-5"></path>
										</svg>
									</span>UnLimited cloud Space
								</p>
								<p class="flex items-center text-blue-600 mb-2">
									<span class="w-4 h-4 capitalize mr-2 inline-flex items-center justify-center bg-blue-400 text-white rounded-full flex-shrink-0">
										<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
											<path d="M20 6L9 17l-5-5"></path>
										</svg>
									</span>Unlimited calls per day
								</p>
								<p class="flex items-center text-blue-600 mb-6">
									<span class="w-4 h-4 capitalize mr-2 inline-flex items-center justify-center bg-blue-400 text-white rounded-full flex-shrink-0">
										<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
											<path d="M20 6L9 17l-5-5"></path>
										</svg>
									</span>Unlimited Read and write.
								</p>

								<button class="flex items-center mt-auto text-white bg-blue-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-blue-600 rounded">Button
									<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
										<path d="M5 12h14M12 5l7 7-7 7"></path>
									</svg>
								</button>
							</div>
						</div>
					</div>


				</div>

			</section>
			<Footer />
		</div>
	)
}

export default Pricing
