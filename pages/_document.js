import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			// add "lang" to html tag
			<Html lang="en">
				<Head />
				<body>
					{/* can be used by React portals */}
					<div class="overlays" />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;