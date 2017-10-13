/**
 * External dependencies
 */
import Clipboard from 'clipboard';
import classnames from 'classnames';
import { noop } from 'lodash';

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
	componentDidMount() {
		const { text, onCopy = noop } = this.props;
		this.clipboard = new Clipboard( this.container.parentNode, {
			text: () => text,
			container: this.container,
		} );
		this.clipboard.on( 'success', onCopy );
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
