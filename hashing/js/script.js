// Based on: https://www.dannyguo.com/blog/how-to-add-copy-to-clipboard-buttons-to-code-blocks-in-hugo/

function makeCopyButton(block) {
    const copytext = block.innerText;
    const button = document.createElement('button');
    const hovertext = document.createElement('span');
    button.className = 'copy-code-button';
    button.type = 'button';

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
        const collapse_wrapper = block.parentNode.parentNode;
        block.setAttribute("style", "cursor: pointer;");

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

        block.prepend(button);
    }
}

function unblurAll() {
    blocksToUnblur = document.getElementsByClassName('src-python');
    for (var i = 0; i < blocksToBlur.length; i++) {
        const block = blocksToBlur[i];
        block.classList.remove("blur");
    }
}

document.addEventListener('DOMContentLoaded', function(){
    fancyPythonBlocks();
}, false);
