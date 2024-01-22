import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Scrollbar, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { slides } from '../../common/links';

export default () => {
	return (
		<div className="w-full px-12 pt-12 pb-24 overflow-hidden bg-gradient-to-r from-[#02042e] to-[#02015a]">
			<span className=" text-white font-bold text-center">
				<h1 className="text-4xl">Reviews From those Who</h1>
				<p className="text-3xl mt-5 mb-10">Have <span className="text-[#60abff] italic">Joined Us</span></p>
			</span>
			<span className="">
			<Swiper
		effect={'coverflow'}
		spaceBetween={50}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
		initialSlide={1}
        coverflowEffect={{
          rotate: 20
        }}
		autoplay={{
			delay: 2500,
			disableOnInteraction: false,
		  }}
        modules={[EffectCoverflow,Pagination,Autoplay]}
        className="mySwiper w-full flex items-center overflow-hidden justify-center"
		>
			{slides.map(item=>(
				<SwiperSlide className='bg-[#1c1a82] w-[50%] rounded-md text-white'>
				<div class="flex lg:h-56 lg:w-80 flex-wrap -m-4">
					<div class="h-full  p-8 rounded">
						<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="block w-5 h-5 text-gray-400 mb-4" viewBox="0 0 975.036 975.036">
							<path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
						</svg>
						<p class="leading-relaxed mb-6 break-words">{item.review}</p>
						<a class="inline-flex items-center">
							<img alt="testimonial" src={item.img} class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
							<span class="flex-grow flex flex-col pl-4">
								<span class="title-font text-xl font-medium ">{item.userName}</span>
								<span class="text-gray-200 text-sm">{item.designation}</span>
							</span>
						</a>
					</div>
				</div>
			</SwiperSlide>
			))}
			
		</Swiper>
			</span>
		</div>
	);
};