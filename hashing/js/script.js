// Based on: https://www.dannyguo.com/blog/how-to-add-copy-to-clipboard-buttons-to-code-blocks-in-hugo/

function makeCopyButton(block) {
    const copytext = block.innerText;
    const button = document.createElement('button');
    const hovertext = document.createElement('span');
    button.className = 'copy-code-button';
    button.type = 'button';

    // button.innerText = 'Copy';

    button.prepend(hovertext);
    hovertext.innerText = 'Copied!';
    hovertext.classList.add('copy-hoverbox');

    button.addEventListener('click', function (event) {
        event.stopPropagation();
        navigator.clipboard.writeText(copytext).then(function () {

            hovertext.classList.add('show');

            setTimeout(function () {
                hovertext.classList.remove('show');
            }, 2000);

        }, function (error) {
            hovertext.innerText = 'Error';
        });
    });
    return button
}

function fancyPythonBlocks() {
    blocksToBlur = document.getElementsByClassName('src-python');
    for (var i = 0; i < blocksToBlur.length; i++) {
        const block = blocksToBlur[i]
        const button = makeCopyButton(block)
        block.prepend(button);

        block.setAttribute("style", "cursor: pointer;");

        const collapse_wrapper = block.parentNode.parentNode;

        if (collapse_wrapper.classList.contains('collapsible')) {
            collapse_wrapper.addEventListener("click", function () {
                collapse_wrapper.classList.toggle("collapsed");
            });
        } else {
            block.classList.toggle("blur");
            block.addEventListener("click", function () {
                block.classList.toggle("blur");
            });
        }
    }
}

// function tocDrawer() {
//     const nav = document.createElement('nav')
//     const toc = document.getElementById("table-of-contents");
//     const content = document.getElementById("content");
//     const preamble = document.getElementById("preamble");
//     const button = document.createElement('button');

//     button.className = 'toc-button';
//     button.type = 'button';
//     button.innerText = '☰';
//     nav.prepend(button)

//     button.addEventListener('click', function (event) {
//         toc.classList.toggle('show-toc');
//         content.classList.toggle('hide-content');
//         preamble.classList.toggle('hide-content');
//     });

//     nav.appendChild(toc)
//     document.body.prepend(nav);
// }

document.addEventListener('DOMContentLoaded', function(){
    fancyPythonBlocks();

    // tocDrawer();
}, false);
