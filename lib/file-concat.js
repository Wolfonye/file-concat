'use babel';

import FileConcat2View from './file-concat-view';
import { CompositeDisposable } from 'atom';

export default {

  fileConcat2View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.fileConcat2View = new FileConcat2View(state.fileConcat2ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.fileConcat2View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'file-concat:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.fileConcat2View.destroy();
  },

  serialize() {
    return {
      fileConcat2ViewState: this.fileConcat2View.serialize()
    };
  },

  toggle() {
    console.log('FileConcat2 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
