/**
 * Internal dependencies
 */
import Inserter from '../../inserter';

function VisualEditorSiblingInserter( { insertIndex } ) {
	return (
		<div
			data-insert-index={ insertIndex }
			className="editor-visual-editor__sibling-inserter">
			<hr className="editor-visual-editor__sibling-inserter-rule" />
			<Inserter insertIndex={ insertIndex } />
		</div>
	);
}

export default VisualEditorSiblingInserter;
