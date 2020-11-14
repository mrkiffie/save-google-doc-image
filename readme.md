# Save Google Doc Images

This is a repo for managing the source code for a small bookmarklet that I created to download images that are embedded within a google document.

## Installation and usage

1. Download the latest version of the bookmarklet.
2. Create a new bookmark. e.g. "Save Google Doc Images".
3. Edit the bookmark, replacing the url with the bookmarklet.
4. Open a google document with an embedded image.
5. Clicking on the bookmarklet will add a button (💾) next to the image.
6. Clicking on the button (💾) will prompt you for a filename and then download the image.
7. Repeat from step 5 to download additional images.


## Development

```
yarn
yarn build
yarn run make-bookmarklet
```
