
function $(selector) {
	return document.querySelector(selector);
}

function $$(selector) {
	return Array.prototype.slice.call(document.querySelectorAll(selector));
}

function windowWidth() {
	var windowWidth = 0;
	if      (typeof(window.innerWidth) == 'number') windowWidth = window.innerWidth;
	else if (document.documentElement && document.documentElement.clientWidth) windowWidth = document.documentElement.clientWidth;
	else if (document.body && document.body.clientWidth) windowWidth = document.body.clientWidth;
	return windowWidth;
}

function scrollTop() {
	if (typeof pageYOffset!= 'undefined') return pageYOffset;
	else {
		var B = document.body,
			D = document.documentElement;
			D = (D.clientHeight) ? D : B;
		return D.scrollTop;
	}
}

function hasClass(el, name) {
	return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
}

function addClass(el, name) {
	if (!hasClass(el, name)) el.className += (el.className ? ' ' : '') + name;
}

function removeClass(el, name) {
	if (hasClass(el, name)) el.className = el.className.replace(new RegExp('(\\s|^)'+name+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
}

function toggleClass(el, name) {
	if (hasClass(el, name)) removeClass(el, name);
	else addClass(el, name);
}