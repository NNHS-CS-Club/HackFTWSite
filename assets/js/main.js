/*
 * Shared behaviour for every page.
 *
 * Image format selection used to live here (a canvas-based WebP probe that
 * rewrote src attributes at runtime). That is now handled declaratively by
 * <picture> in the markup and image-set() in the stylesheet, so this file only
 * carries progressive enhancement: nothing here is required for the page to
 * read correctly.
 */

(function () {
	"use strict";

	// Drop a shadow under the navbar once the page has scrolled off the top.
	var nav = document.getElementById("site-nav");

	if (nav) {
		var syncNav = function () {
			nav.classList.toggle("is-scrolled", window.scrollY > 8);
		};

		syncNav();
		window.addEventListener("scroll", syncNav, { passive: true });
	}

	// Fade sections in as they enter the viewport.
	var revealables = document.querySelectorAll(".reveal");
	var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	if (!revealables.length) {
		return;
	}

	if (prefersReducedMotion || !("IntersectionObserver" in window)) {
		revealables.forEach(function (el) {
			el.classList.add("is-visible");
		});
		return;
	}

	var observer = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				entry.target.classList.add("is-visible");
				observer.unobserve(entry.target);
			}
		});
	}, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });

	revealables.forEach(function (el) {
		observer.observe(el);
	});
})();
