function getInstanceModal(id) {
	return bootstrap.Modal.getInstance(document.querySelector(id));
}

function initModal(id) {
	return new bootstrap.Modal(document.querySelector(id));
}

function isShowBootstrap(id) {
	let modal = bootstrap.Modal.getInstance(document.querySelector(id));
	if(modal !== null && modal !== undefined) {
		console.log(modal._isShown)
	}

	return false;
}

function openOffcanvas(id) {
	let myOffcanvas = document.getElementById(id);
	let bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas, {backdrop: true});
	if(bsOffcanvas) {
		bsOffcanvas.show();
	}
}

function closeOffcanvas(id) {
	let myOffcanvas = document.getElementById(id);
	let bsOffcanvas = bootstrap.Offcanvas.getInstance(myOffcanvas);
	if(bsOffcanvas) {
		bsOffcanvas.hide();
	}
}

function toggleCollapse(id, type) {
	let collapse = document.getElementById(id);
	if(type === 'open') {
		collapse.collapse('show');
	} else collapse.collapse('hide');
}


function initialSwiper(
	selector,
	config,
	thumb,
	type,
	configThumb,
	classActive
) {
	if (type === "THUMBNAIL") {
		let thumbSwiper = new Swiper("." + thumb, configThumb);
		let newConfig = { ...config, thumbs: { swiper: thumbSwiper } };
		let slider = new Swiper("." + selector, newConfig);

		setActiveThumb(thumb, classActive);
		slider.on("slideChange", function (e) {
			setActiveThumb(thumb, classActive);
		});
	} else {
		new Swiper("." + selector, config);
	}
}

function setActiveThumb(selector, classList) {
	let slide = document.querySelectorAll("." + selector + " .swiper-slide");
	let slideToActive = document.querySelectorAll(
		"." + selector + " .swiper-slide.swiper-slide-thumb-active"
	);
	let classListReplace = classList.split(" ");
	slide.forEach((s) => {
		s.classList.remove(...classListReplace);
	});

	slideToActive.forEach((sa) => {
		sa.classList.add(...classListReplace);
	});
}

function initialChart(selector, config) {
	let chart = Chart.getChart(selector);
	if (chart !== null && chart !== undefined) {
		chart.destroy();
	}
	new Chart(document.getElementById(selector), config);
}

function landingSwiper() {
	let swiper = new Swiper(".mainVisual .swiper-container", {
		spaceBetween: 0,
		slidesPerView: 1,
		loop: true,
		loopedSlides: 1,
		centeredSlides: true,
		grabCursor: true,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
	});
}

function initHeader()
{
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });
}

function initSlider(){
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });
}

