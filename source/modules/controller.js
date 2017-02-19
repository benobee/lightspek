import $ from 'jquery';
import modal from './modal.js';

const controller = {
	init() {
		const page = $('#collection-58a4a57dd2b857f6f53cbb82');

		if (page.length > 0) {
			this.activeFilterArray = [];

			this.loader();
			this.indexArray();
			this.getListData();

			console.log(this);			
		}
	},
	loader() {
		const loaderWrapper = document.createElement('div');

		$(loaderWrapper).addClass('loader-wrapper spinning');

		const loaderSpinner = document.createElement('div');

		$(loaderSpinner).addClass('loader-spinner');

		loaderWrapper.appendChild(loaderSpinner);

		$('#page').after(loaderWrapper);
	},
	indexArray() {

		/*
		 * @desc cache array to match for data indexing
		*/
	
		this.array = $('.custom-collection-item').toArray();
	},
    slugify(filterName) {

		/*
		 * @desc turn string into slug
		*/
	
		return filterName.toLowerCase().replace(/ /g, "-").replace(/-&-/g, "-");
    },
	injectFilters(data) {

		/*
		 * @desc inject filters from retreved data
		*/
	
		const filters = data.collection.categories;
		const target = $('#category-inject');

		$.each(filters, (i, item) => {

			const filter = document.createElement('div');

			const box = document.createElement('input');

			const label = document.createElement('label');

			const slugify = this.slugify(item);

			$(box).attr({
				type: 'checkbox',
				name: item,
				value: slugify,
				id: 'filterId-' + i + '-' + slugify
			});

			$(label).attr({
				class: 'filter-label',
				for: 'filterId-' + i + '-' + slugify
			});

			$(filter).attr({
				class: 'filter-wrapper'
			});

			$(label).html(item);

			//inject form input box to div wrapper
			$(filter).append(box);

			//inject label into filter wrapper
			$(filter).append(label);

			//inject filter into target form
			$(target).append(filter);
		});
	},
	getListData() {

		/*
		 * @desc get data from collection and
		 * inject filters
		*/
	
		$.ajax({
			url: "https://lightspek.squarespace.com/manufacturers-collection?format=json",
			dataType: "jsonp",
			success: (result) => {
				this.data = result;
				this.injectFilters(result);
				this.events();

				$('.loader-wrapper').removeClass('spinning');
				$('#page').addClass('loaded');
			},
			error: (error) => {
				console.log(error);
			}
		});
	},
	events() {
		
		//filtering
		const form = $('#category-inject');

		$('.filter-wrapper input').on("change", (e) => {
			$(form).submit();
		});

		$(form).on("submit", (e) => {
			e.preventDefault();
			$('#manufacturers-collection').hide();

			const values = $(form).serializeArray();

			$('.custom-collection-item').removeClass('active-filter');

			$.each(values, (i, item) => {
				const target = $('.custom-collection-item:not(.category-' + item.value + ')');

				$(target).addClass('active-filter');
			});

			setTimeout(() => {
				$('#manufacturers-collection').fadeIn();
			}, 100);
		});

		//modal
		$('.custom-collection-item').on("click", (e) => {
			const index = $(e.currentTarget).data("index");

			const data = this.data.items[ index - 1 ];

			const gallery = data.promotedBlock;

			modal.injectMeta(data);
			modal.injectGallery(gallery);
			modal.open();

			window.Squarespace.AFTER_BODY_LOADED = false;
			window.Squarespace.afterBodyLoad();
		});
	}
};

export default controller;