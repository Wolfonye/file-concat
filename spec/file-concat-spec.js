'use babel';

import FileConcat2 from '../lib/file-concat';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('FileConcat2', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('file-concat');
  });

  describe('when the file-concat:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.file-concat')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'file-concat:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.file-concat')).toExist();

        let fileConcat2Element = workspaceElement.querySelector('.file-concat');
        expect(fileConcat2Element).toExist();

        let fileConcat2Panel = atom.workspace.panelForItem(fileConcat2Element);
        expect(fileConcat2Panel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'file-concat:toggle');
        expect(fileConcat2Panel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.file-concat')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'file-concat:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let fileConcat2Element = workspaceElement.querySelector('.file-concat');
        expect(fileConcat2Element).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'file-concat:toggle');
        expect(fileConcat2Element).not.toBeVisible();
      });
    });
  });
});
