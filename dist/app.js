'use strict';

/* eslint-env browser */

var topBtn = document.getElementById('to-top');

topBtn.addEventListener('click', function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

window.addEventListener('scroll', function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topBtn.style.opacity = 1;
        topBtn.style.cursor = 'pointer';
    } else {
        topBtn.style.opacity = 0;
        topBtn.style.cursor = 'auto';
    };
});

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// FOR DIAGRAM ANIMATION
var diagramContainer = document.querySelector('.img-container');
var diagrams = document.querySelector('.img-container').children;
var animNav = document.querySelector('.animation-nav');
var buttons = document.querySelector('.animation-nav').children;
var stepTextContainer = document.querySelector('.text-container');
var stepText = document.querySelector('.text-container').children;

// FOR OVERVIEW
var overviewContainer = document.querySelector('.overview');
var overviewImgContainer = document.querySelector('.overview-img-container');
var overviewImgsCount = overviewImgContainer.children.length;
var overviewImgs = overviewImgContainer.children;
var overviewOpen = document.querySelector('.overview-open');
var overviewClose = document.querySelector('.overview-exit');
var body = document.getElementsByTagName('BODY');

var exitFunc = function exitFunc() {
    overviewContainer.style.display = 'none';
    overviewContainer.style.opacity = '0';
    body[0].style.overflowY = 'visible';
};

// ADD ANIMATION NAV BUTTONS

if (diagrams.length !== stepText.length) {
    console.log('WARNING! NOT EVERY IMAGE HAS AN ACCOMPANYING TEXT SECTION');
}

for (var i = 0; i < diagrams.length; i++) {
    var button = document.createElement('BUTTON');
    var buttonText = document.createTextNode('' + (i + 1));

    button.appendChild(buttonText);
    animNav.appendChild(button);
}

buttons[0].classList.add('anim-button-clicked');

// OVERVIEW
overviewOpen.addEventListener('click', function () {
    overviewContainer.style.display = 'block';
    overviewContainer.style.opacity = '1';
    body[0].style.overflowY = 'hidden';
});

overviewClose.addEventListener('click', exitFunc);

for (var _i = 0; _i < overviewImgsCount; _i++) {
    if (overviewImgsCount <= 4) {
        overviewImgs[_i].classList.add('overview-width-4');
    } else if (overviewImgsCount > 4 && overviewImgsCount < 7) {
        overviewImgs[_i].classList.add('overview-width-3');

        if (overviewImgsCount === 5) {
            overviewImgs[3].classList.add('overview-step-3');
            overviewImgs[4].classList.add('overview-step-4');
        }
    }
}

// DIAGRAM ANIMATION

var _loop = function _loop(_i2) {
    if (_i2 > 0) {
        diagramContainer.children[_i2].classList.add('fab-img-toggle');
        stepTextContainer.children[_i2].classList.add('fab-text');
    }

    buttons[_i2].addEventListener('click', function () {
        for (var x = _i2; x < diagramContainer.children.length; x++) {
            diagrams[x].style.opacity = '0';
            diagrams[_i2].style.opacity = '1';
            for (var y = 1; y < _i2; y++) {
                diagrams[y].style.opacity = '1';
            }
        }
        for (var _x = 0; _x < diagramContainer.children.length; _x++) {
            stepText[_x].style.display = 'none';
            stepText[_i2].style.display = 'block';
        }

        for (var _x2 = 0; _x2 < buttons.length; _x2++) {
            buttons[_x2].classList.remove('anim-button-clicked');
        }
        buttons[_i2].classList.add('anim-button-clicked');
    });
};

for (var _i2 = 0; _i2 < diagramContainer.children.length; _i2++) {
    _loop(_i2);
}

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

var dropBtn = document.querySelectorAll('.dd-btn');
var speciesBtn = document.querySelectorAll('.dd-species');
var probeBtn = document.querySelectorAll('.dd-probe');
var dropClose = document.querySelector('.dd-close');
var allDropListItems = document.querySelectorAll('.drop-select');
var tableRow = document.getElementById('species-picker').children;
var antigenA = document.getElementById('antigen-a');
var antigenB = document.getElementById('antigen-b');
var dropItem = void 0;
var prevVal = [];
var speciesTrack = 0;
var antigen = ['Antigen A', 'Antigen B'];
var textBox = document.querySelectorAll('.antigen-text');
var antigenSpan = void 0;

var _loop2 = function _loop2(_i3) {
    textBox[_i3].addEventListener('keyup', function () {
        antigenSpan = document.querySelectorAll('.antigen');
        if (textBox[_i3].value === '') {
            antigen[_i3] = textBox[_i3].placeholder;
            antigenSpan[_i3].innerText = antigen[_i3];
        } else {
            antigen[_i3] = '';
            if (dropBtn[0].innerText !== 'Select' && dropBtn[1].innerText !== 'Select' && this.id === 'antigen-a') {
                antigenSpan[0].innerText = antigenA.value;
            }
            if (textBox[_i3].maxLength !== textBox[_i3].textLength) {
                if (dropBtn[0].innerText !== 'Select' && dropBtn[1].innerText !== 'Select' && this.name === 'Antigen A') {
                    changeDetected(tableRow[2].children[1]);
                }
            }
        }
    });
};

for (var _i3 = 0; _i3 < textBox.length; _i3++) {
    _loop2(_i3);
}

function changeDetected(tableCell) {
    tableCell.classList.remove('change-detected');

    void tableCell.offsetWidth;

    tableCell.classList.add('change-detected');
};

var _loop3 = function _loop3(_i4) {
    dropBtn[_i4].addEventListener('click', function () {
        dropBtn[_i4].parentElement.classList.toggle('dd-active');

        // Close all dropdowns except selected dropdown
        for (var x = 0; x < dropBtn.length; x++) {
            if (x !== _i4) {
                dropBtn[x].parentElement.classList.remove('dd-active');
            }
        }
        dropClose.classList.add('dd-close-active');
    });
};

for (var _i4 = 0; _i4 < dropBtn.length; _i4++) {
    _loop3(_i4);
}

dropClose.addEventListener('click', function () {
    for (var _i5 = 0; _i5 < dropBtn.length; _i5++) {
        dropBtn[_i5].parentElement.classList.remove('dd-active');
        dropClose.classList.remove('dd-close-active');
    }
});

// for (let i = 0; i < allDropListItems.length; i++) {
//     allDropListItems[i].addEventListener('click', function() {
//         hiddenItems[i] = this.innerText;
//         console.log(this.innerText);
//     })
// }

var _loop4 = function _loop4(_i6) {
    dropBtn[_i6].addEventListener('click', function () {
        var _this = this;

        // Sets dropItem to dropdown list of clicked button
        dropItem = this.nextElementSibling.children;

        var _loop5 = function _loop5(x) {
            dropItem[x].addEventListener('click', function () {
                dropClose.classList.remove('dd-close-active');
                antigenSpan = document.querySelectorAll('.antigen');

                // Show previous hidden dropdown option
                // for (let y = 0; y < allDropListItems.length; y++) {
                //     if (allDropListItems[y].innerText === prevVal[i]) {
                //         allDropListItems[y].classList.remove('js-hide');
                //     }
                // }

                // Set button text to match dropdown selection
                _this.innerHTML = dropItem[x].innerHTML;
                // Close dropdown
                for (var y = 0; y < dropBtn.length; y++) {
                    dropBtn[y].parentElement.classList.remove('dd-active');
                }

                // Hide all dropdown selections that are selected

                // for (let y = 0; y < dropBtn.length; y++) {
                // if (dropBtn[y].innerText === dropItem[x].innerText) {
                //     for (let y = 0; y < allDropListItems.length; y++) {
                //         if (allDropListItems[y].innerText === dropItem[x].innerText) {
                //             allDropListItems[y].classList.add('js-hide');
                //             prevVal[i] = dropItem[x].innerText;
                //         }
                //     }
                // }


                // }

                // Show previous selection in dropdown
                for (var _y = 0; _y < dropItem.length; _y++) {
                    if (dropItem[_y].innerText === prevVal[_i6]) {
                        dropItem[_y].classList.remove('js-hide');
                    }
                }

                // Hide current selection in dropdown
                dropItem[x].classList.add('js-hide');

                // If primary host or sample species
                if (_i6 === 0 || _i6 === 1) {
                    for (var _y2 = 0; _y2 < dropBtn[2].nextElementSibling.children.length; _y2++) {
                        // console.log(`nextElementSibling: ${dropBtn[2].nextElementSibling.children[y].innerText} | dropItem: ${dropItem[x].innerText}`);

                        // Show previous selection in Blocking dropdown
                        if (dropBtn[2].nextElementSibling.children[_y2].innerText === prevVal[_i6]) {
                            dropBtn[2].nextElementSibling.children[_y2].classList.remove('js-hide');
                        }
                        // Hide current selection in Blocking dropdown
                        if (dropBtn[2].nextElementSibling.children[_y2].innerText === dropItem[x].innerText) {
                            dropBtn[2].nextElementSibling.children[_y2].classList.add('js-hide');
                        }
                    }
                    // if blocking and secondary host
                } else if (_i6 === 2) {
                    // Loop through Primary and Sample dropdowns
                    for (var _y3 = 0; _y3 < 2; _y3++) {
                        // Loop through dropdown options
                        for (var z = 0; z < dropBtn[_y3].nextElementSibling.children.length; z++) {
                            // Show previous selection in Primary/Sample dropdown
                            if (dropBtn[_y3].nextElementSibling.children[z].innerText === prevVal[_i6]) {
                                dropBtn[_y3].nextElementSibling.children[z].classList.remove('js-hide');
                            }
                            // Hide current selection in Primary/Sample dropdown
                            if (dropBtn[_y3].nextElementSibling.children[z].innerText === dropItem[x].innerText) {
                                dropBtn[_y3].nextElementSibling.children[z].classList.add('js-hide');
                            }
                        }
                    }
                }

                // set previous selection for this dropdown to current selection
                prevVal[_i6] = dropItem[x].innerText;

                // Step 1

                if (dropBtn[1].innerText.toLowerCase() !== 'select') {
                    tableRow[0].children[1].children[1].innerText = 'Samples may express endogenous immunoglobulins, in this example ' + dropBtn[1].innerText + ' IgG.';

                    tableRow[0].children[1].children[0].classList.add('js-hide');
                    tableRow[0].children[1].children[1].classList.remove('js-hide');
                    if (_this.classList.contains('dd-sample')) {
                        changeDetected(tableRow[0].children[1]);
                    }
                }

                // Step 2

                if (dropBtn[1].innerText.toLowerCase() !== 'select' && dropBtn[2].innerText.toLowerCase() !== 'select' && dropBtn[0].innerText.toLowerCase() === dropBtn[1].innerText.toLowerCase()) {
                    tableRow[1].children[1].children[1].innerText = 'After blocking with normal ' + dropBtn[2].innerText + ' serum, incubate with an excess of unconjugated Fab antibody, in this example Fab fragment ' + dropBtn[2].innerText + ' Anti-' + dropBtn[1].innerText + ' IgG (H+L). Wash.';

                    tableRow[1].children[1].children[0].classList.add('js-hide');
                    tableRow[1].children[1].children[1].classList.remove('js-hide');
                    if (_this.classList.contains('dd-sample') || _this.classList.contains('dd-secondary')) {
                        changeDetected(tableRow[1].children[1]);
                    }
                } else if (dropBtn[0].innerText.toLowerCase() !== 'select' && dropBtn[1].innerText.toLowerCase() !== 'select' && dropBtn[2].innerText.toLowerCase() !== 'select' && dropBtn[0].innerText.toLowerCase() !== dropBtn[1].innerText.toLowerCase()) {
                    tableRow[1].children[1].children[1].innerText = 'After blocking with normal ' + dropBtn[2].innerText + ' serum, wash.';

                    tableRow[1].children[1].children[0].classList.add('js-hide');
                    tableRow[1].children[1].children[1].classList.remove('js-hide');
                    if (_this.classList.contains('dd-sample') || _this.classList.contains('dd-secondary')) {
                        changeDetected(tableRow[1].children[1]);
                    }
                } else if (dropBtn[1].innerText.toLowerCase() !== 'select' && dropBtn[2].innerText.toLowerCase() !== 'select' && dropBtn[0].innerText.toLowerCase() === 'select') {
                    tableRow[1].children[1].children[1].innerText = 'After blocking with normal ' + dropBtn[2].innerText + ' serum, incubate with an excess of unconjugated Fab antibody, in this example Fab fragment ' + dropBtn[2].innerText + ' Anti-' + dropBtn[1].innerText + ' IgG (H+L). Wash.';

                    tableRow[1].children[1].children[0].classList.add('js-hide');
                    tableRow[1].children[1].children[1].classList.remove('js-hide');
                    if (_this.classList.contains('dd-sample') || _this.classList.contains('dd-secondary')) {
                        changeDetected(tableRow[1].children[1]);
                    }
                }

                // Step 3
                if (textBox[0].value === '') {
                    tableRow[2].children[1].children[1].innerHTML = 'Incubate with primary antibody, in this example ' + dropBtn[0].innerText + ' Anti-<span class="antigen">' + textBox[0].placeholder + '</span>. Wash.';
                } else {
                    tableRow[2].children[1].children[1].innerHTML = 'Incubate with primary antibody, in this example ' + dropBtn[0].innerText + ' Anti-<span class="antigen">' + textBox[0].value + '</span>. Wash.';
                }

                if (dropBtn[0].innerText.toLowerCase() !== 'select') {
                    // Step 3
                    tableRow[2].children[1].children[0].classList.add('js-hide');
                    tableRow[2].children[1].children[1].classList.remove('js-hide');
                    if (_this.classList.contains('dd-primary')) {
                        changeDetected(tableRow[2].children[1]);
                    }
                }

                // Step 4

                if (dropBtn[1].innerText.toLowerCase() !== 'select' && dropBtn[2].innerText.toLowerCase() !== 'select' && dropBtn[3].innerText.toLowerCase() !== 'select') {
                    tableRow[3].children[1].children[1].innerText = 'Incubate with conjugated secondary antibody, in this example ' + dropBtn[3].innerText + '-' + dropBtn[2].innerText + ' Anti-' + dropBtn[1].innerText + ' IgG (H+L). Wash.';

                    tableRow[3].children[1].children[0].classList.add('js-hide');
                    tableRow[3].children[1].children[1].classList.remove('js-hide');
                    if (_this.classList.contains('dd-sample') || _this.classList.contains('dd-secondary') || _this.classList.contains('dd-probe-1')) {
                        changeDetected(tableRow[3].children[1]);
                    }
                }

                speciesTrack = 0;
            });
        };

        for (var x = 0; x < dropItem.length; x++) {
            _loop5(x);
        }
    });
};

for (var _i6 = 0; _i6 < dropBtn.length; _i6++) {
    _loop4(_i6);
}