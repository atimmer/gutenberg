/**
 * External dependencies
 */
import Clipboard from 'clipboard';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { Button } from '../';

function ClipboardButton( { className, children, onCopy, text } ) {
	const classes = classnames( 'components-clipboard-button', className );

	return (
		<Button className={ classes }>
			{ children }
			<ClipboardButton.Container
				onCopy={ onCopy }
				text={ text }
			/>
		</Button>
	);
}

ClipboardButton.Container = class extends Component {
	constructor() {
		super( ...arguments );

		this.onCopy = this.onCopy.bind( this );
		this.getText = this.getText.bind( this );
	}

	componentDidMount() {
		this.clipboard = new Clipboard( this.container.parentNode, {
			text: this.getText,
			container: this.container,
		} );

		this.clipboard.on( 'success', this.onCopy );
	}

	onCopy() {
		const { onCopy } = this.props;
		if ( onCopy ) {
			onCopy();
		}
	}

	getText() {
		return this.props.text;
	}

	componentWillUnmount() {
		this.clipboard.destroy();
		delete this.clipboard;
	}

	componentShouldUpate() {
		return false;
	}

	render() {
		return <div ref={ ref => this.container = ref } />;
	}
};

export default ClipboardButton;
