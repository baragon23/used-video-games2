export default function decodeHtml(htmlString: string) {
	const txt = document.createElement('textarea');
	txt.innerHTML = htmlString;
	return txt.value;
}
