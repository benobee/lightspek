/**
 * 
 * @desc when user clicks on an item it brings up a popup window
 * with more infomation exports to index.js which is exported to main.js
 *
 */

import $ from 'jquery';

const modal = {
	init() {
		this.createTargetDiv();
		this.events();
	},
	createTargetDiv() {
		//modal body
		const container = document.createElement('div');

		container.setAttribute('id', 'modal-popup');

		//close button
		const close = document.createElement('div');

		$(close).addClass('close');
		close.innerText = '✕';

		//loader
		const loader = document.createElement('div');

		$(loader).addClass('loader-spinner');

		//modal content
		const contentWrapper = document.createElement('div');

		$(contentWrapper).addClass('modal-content-wrapper');

		//gallery
		const gallery = document.createElement('div');

		$(gallery).addClass('image-slide-gallery');

		//meta
		const meta = document.createElement('div');

		$(meta).addClass('meta-info');

		//construct
		
		container.appendChild(close);
		container.appendChild(loader);
		contentWrapper.appendChild(meta);
		contentWrapper.appendChild(gallery);
		container.appendChild(contentWrapper);

		this.activeModal = container;

		$('#canvasWrapper').after(container);
	},
	injectMeta(data) {
		const title = document.createElement('div');

		$(title).addClass('title');

		title.innerText = data.title;

		const logo = document.createElement('img');

		$(logo).attr({
			class: 'logo',
			src: data.assetUrl
		});

		const metaContent = document.createElement('a');

		$(metaContent).attr({
			class: 'meta-content',
			href: data.sourceUrl,
			target: '_blank'
		});

		metaContent.appendChild(logo);
		metaContent.appendChild(title);

		$('.modal-content-wrapper .meta-info').html(metaContent);
	},
	injectGallery(contentHTML) {
		/*
		 * @desc create div to inject modal popup into
		 * 
		*/		
		const modalBody = document.createElement('div');

		$(modalBody).attr({
			class: "injectedHTML"
		});

		modalBody.innerHTML = contentHTML;

		$('.modal-content-wrapper .image-slide-gallery').html(modalBody);

	},
	loading() {
		$(this.activeModal).addClass('is-loading');
	},
	open() {
		$(this.activeModal).removeClass('is-loading');
		$(this.activeModal).addClass('active');
	},
	close() {
		$(this.activeModal).removeClass('active');
	},
	destroy() {
		$(this.activeModal).remove();
	},
	events() {

		/*
		 * @desc event binding - user clicks on item
		 * and the data-content is retrived from the HTML
		 * which displays info in separate popup window
		 * 
		*/

		$('.close').on("click", () => {
			this.close();
		});
	}
};

export default modal;