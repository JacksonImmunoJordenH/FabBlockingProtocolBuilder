/* eslint-env browser */

const topBtn = document.getElementById('to-top');

topBtn.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

window.addEventListener('scroll', () => {
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
const diagramContainer = document.querySelector('.img-container');
const diagrams = document.querySelector('.img-container').children;
const animNav = document.querySelector('.animation-nav');
const buttons = document.querySelector('.animation-nav').children;
const stepTextContainer = document.querySelector('.text-container');
const stepText = document.querySelector('.text-container').children;

// FOR OVERVIEW
const overviewContainer = document.querySelector('.overview');
const overviewImgContainer = document.querySelector('.overview-img-container');
const overviewImgsCount = overviewImgContainer.children.length;
const overviewImgs = overviewImgContainer.children;
const overviewOpen = document.querySelector('.overview-open');
const overviewClose = document.querySelector('.overview-exit');
const body = document.getElementsByTagName('BODY');

const exitFunc = () => {
    overviewContainer.style.display = 'none';
    overviewContainer.style.opacity = '0';
    body[0].style.overflowY = 'visible';
};

// ADD ANIMATION NAV BUTTONS

if (diagrams.length !== stepText.length) {
    console.log('WARNING! NOT EVERY IMAGE HAS AN ACCOMPANYING TEXT SECTION');
}

for (let i = 0; i < diagrams.length; i++) {
    const button = document.createElement('BUTTON');
    const buttonText = document.createTextNode(`${i + 1}`);

    button.appendChild(buttonText);
    animNav.appendChild(button);
}

buttons[0].classList.add('anim-button-clicked');

// OVERVIEW
overviewOpen.addEventListener('click', () => {
    overviewContainer.style.display = 'block';
    overviewContainer.style.opacity = '1';
    body[0].style.overflowY = 'hidden';
});

overviewClose.addEventListener('click', exitFunc);

for (let i = 0; i < overviewImgsCount; i++) {
    if (overviewImgsCount <= 4) {
        overviewImgs[i].classList.add('overview-width-4');
    } else if (overviewImgsCount > 4 && overviewImgsCount < 7) {
        overviewImgs[i].classList.add('overview-width-3');

        if (overviewImgsCount === 5) {
            overviewImgs[3].classList.add('overview-step-3');
            overviewImgs[4].classList.add('overview-step-4');
        }
    }
}

// DIAGRAM ANIMATION
for (let i = 0; i < diagramContainer.children.length; i++) {
    if (i > 0) {
        diagramContainer.children[i].classList.add('fab-img-toggle');
        stepTextContainer.children[i].classList.add('fab-text');
    }

    buttons[i].addEventListener('click', () => {
        for (let x = i; x < diagramContainer.children.length; x++) {
            diagrams[x].style.opacity = '0';
            diagrams[i].style.opacity = '1';
            for (let y = 1; y < i; y++) {
                diagrams[y].style.opacity = '1';
            }
        }
        for (let x = 0; x < diagramContainer.children.length; x++) {
            stepText[x].style.display = 'none';
            stepText[i].style.display = 'block';
        }

        for (let x = 0; x < buttons.length; x++) {
            buttons[x].classList.remove('anim-button-clicked');
        }
        buttons[i].classList.add('anim-button-clicked');
    });
}

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const dropBtn = document.querySelectorAll('.dd-btn');
const speciesBtn = document.querySelectorAll('.dd-species');
const probeBtn = document.querySelectorAll('.dd-probe');
const dropClose = document.querySelector('.dd-close');
const allDropListItems = document.querySelectorAll('.drop-select');
const tableRow = document.getElementById('species-picker').children;
const antigenA = document.getElementById('antigen-a');
const antigenB = document.getElementById('antigen-b');
let dropItem;
let prevVal = [];
let speciesTrack = 0;
let antigen = ['Antigen A', 'Antigen B']
let textBox = document.querySelectorAll('.antigen-text');
let antigenSpan;
let step2Text;

for (let i = 0; i < textBox.length; i++) {
    textBox[i].addEventListener('keyup', function() {
        antigenSpan = document.querySelectorAll('.antigen');
        if (textBox[i].value === '') {
            antigen[i] = textBox[i].placeholder;
            antigenSpan[i].innerText = antigen[i];
        } else {
            antigen[i] = '';
            if (dropBtn[0].innerText !== 'Select' && dropBtn[1].innerText !== 'Select' && this.id === 'antigen-a') {
                antigenSpan[0].innerText = antigenA.value;
            }
            if (textBox[i].maxLength !== textBox[i].textLength) {
                if (dropBtn[0].innerText !== 'Select' && dropBtn[1].innerText !== 'Select' && this.name === 'Antigen A') {
                    changeDetected(tableRow[2].children[1]);
                }
            }
        }
    })
}

function changeDetected(tableCell) {
    tableCell.classList.remove('change-detected');

    void tableCell.offsetWidth;
    
    tableCell.classList.add('change-detected');
};

for (let i = 0; i < dropBtn.length; i++) {
    dropBtn[i].addEventListener('click', () => {
        dropBtn[i].parentElement.classList.toggle('dd-active');

        // Close all dropdowns except selected dropdown
        for (let x = 0; x < dropBtn.length; x++) {
            if (x !== i) {
                dropBtn[x].parentElement.classList.remove('dd-active');
            }
        }
        dropClose.classList.add('dd-close-active');
    });
}

dropClose.addEventListener('click', () => {
    for (let i = 0; i < dropBtn.length; i++) {
        dropBtn[i].parentElement.classList.remove('dd-active');
        dropClose.classList.remove('dd-close-active');
    }
});

// for (let i = 0; i < allDropListItems.length; i++) {
//     allDropListItems[i].addEventListener('click', function() {
//         hiddenItems[i] = this.innerText;
//         console.log(this.innerText);
//     })
// }

for (let i = 0; i < dropBtn.length; i++) {
    dropBtn[i].addEventListener('click', function() {
        // Sets dropItem to dropdown list of clicked button
        dropItem = this.nextElementSibling.children;
        for (let x = 0; x < dropItem.length; x++) {
            dropItem[x].addEventListener('click', () => {
                dropClose.classList.remove('dd-close-active');
                antigenSpan = document.querySelectorAll('.antigen');

                // Show previous hidden dropdown option
                // for (let y = 0; y < allDropListItems.length; y++) {
                //     if (allDropListItems[y].innerText === prevVal[i]) {
                //         allDropListItems[y].classList.remove('js-hide');
                //     }
                // }

                // Set button text to match dropdown selection
                this.innerHTML = dropItem[x].innerHTML;
                // Close dropdown
                for (let y = 0; y < dropBtn.length; y++) {
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
                for (let y = 0; y < dropItem.length; y++) {
                    if (dropItem[y].innerText === prevVal[i]) {
                        dropItem[y].classList.remove('js-hide');
                    }
                }

                // Hide current selection in dropdown
                dropItem[x].classList.add('js-hide');

                // If primary host or sample species
                if (i === 0 || i === 1) {
                    for (let y = 0; y < dropBtn[2].nextElementSibling.children.length; y++) {
                        // console.log(`nextElementSibling: ${dropBtn[2].nextElementSibling.children[y].innerText} | dropItem: ${dropItem[x].innerText}`);

                        // Show previous selection in Blocking dropdown
                        if (dropBtn[2].nextElementSibling.children[y].innerText === prevVal[i] && dropBtn[2].nextElementSibling.children[y].innerText !== dropBtn[0].innerText && dropBtn[2].nextElementSibling.children[y].innerText !== dropBtn[1].innerText) {
                            dropBtn[2].nextElementSibling.children[y].classList.remove('js-hide');
                        }
                        // Hide current selection in Blocking dropdown
                        if (dropBtn[2].nextElementSibling.children[y].innerText === dropItem[x].innerText) {
                            dropBtn[2].nextElementSibling.children[y].classList.add('js-hide');
                        }
                    }
                // if blocking and secondary host
                } else if (i === 2) {
                    // Loop through Primary and Sample dropdowns
                    for (let y = 0; y < 2; y++) {
                        // Loop through dropdown options
                        for (let z = 0; z < dropBtn[y].nextElementSibling.children.length; z++) {
                            // Show previous selection in Primary/Sample dropdown
                            if (dropBtn[y].nextElementSibling.children[z].innerText === prevVal[i]) {
                                dropBtn[y].nextElementSibling.children[z].classList.remove('js-hide');
                            }
                            // Hide current selection in Primary/Sample dropdown
                            if (dropBtn[y].nextElementSibling.children[z].innerText === dropItem[x].innerText) {
                                dropBtn[y].nextElementSibling.children[z].classList.add('js-hide');
                            }
                        }
                    }

                }

                // set previous selection for this dropdown to current selection
                prevVal[i] = dropItem[x].innerText;



                // Step 1

                if (dropBtn[1].innerText.toLowerCase() !== 'select') {
                    tableRow[0].children[1].children[1].innerText = `Samples may express endogenous immunoglobulins, in this example ${dropBtn[1].innerText} IgG.`

                    tableRow[0].children[1].children[0].classList.add('js-hide');
                    tableRow[0].children[1].children[1].classList.remove('js-hide');
                    if (this.classList.contains('dd-sample')) {
                        changeDetected(tableRow[0].children[1]);
                    }
                }

                // Step 2

                if (dropBtn[1].innerText.toLowerCase() !== 'select' && dropBtn[2].innerText.toLowerCase() !== 'select' && dropBtn[0].innerText.toLowerCase() === dropBtn[1].innerText.toLowerCase()) {
                    tableRow[1].children[1].children[1].innerText = `After blocking with normal ${dropBtn[2].innerText} serum, incubate with an excess of unconjugated Fab antibody, in this example Fab fragment ${dropBtn[2].innerText} Anti-${dropBtn[1].innerText} IgG (H+L). Wash.`

                    tableRow[1].children[1].children[0].classList.add('js-hide');
                    tableRow[1].children[1].children[1].classList.remove('js-hide');
                    if (this.classList.contains('dd-secondary')) {
                        changeDetected(tableRow[1].children[1]);
                    }
                } else if (dropBtn[0].innerText.toLowerCase() !== 'select' && dropBtn[1].innerText.toLowerCase() !== 'select' && dropBtn[2].innerText.toLowerCase() !== 'select' && dropBtn[0].innerText.toLowerCase() !== dropBtn[1].innerText.toLowerCase()) {
                    tableRow[1].children[1].children[1].innerText = `After blocking with normal ${dropBtn[2].innerText} serum, wash.`

                    tableRow[1].children[1].children[0].classList.add('js-hide');
                    tableRow[1].children[1].children[1].classList.remove('js-hide');
                    if (this.classList.contains('dd-secondary')) {
                        changeDetected(tableRow[1].children[1]);
                    }
                } else if (dropBtn[1].innerText.toLowerCase() !== 'select' && dropBtn[2].innerText.toLowerCase() !== 'select' && dropBtn[0].innerText.toLowerCase() === 'select') {
                    tableRow[1].children[1].children[1].innerText = `After blocking with normal ${dropBtn[2].innerText} serum, incubate with an excess of unconjugated Fab antibody, in this example Fab fragment ${dropBtn[2].innerText} Anti-${dropBtn[1].innerText} IgG (H+L). Wash.`

                    tableRow[1].children[1].children[0].classList.add('js-hide');
                    tableRow[1].children[1].children[1].classList.remove('js-hide');
                    if (this.classList.contains('dd-secondary')) {
                        changeDetected(tableRow[1].children[1]);
                    }
                }

                if (tableRow[1].children[1].children[1].innerText !== step2Text && !tableRow[1].children[1].children[1].classList.contains('js-hide')) {
                    changeDetected(tableRow[1].children[1]);
                }
                step2Text = tableRow[1].children[1].children[1].innerText;

                // Step 3
                if (textBox[0].value === '') {
                    tableRow[2].children[1].children[1].innerHTML = `Incubate with primary antibody, in this example ${dropBtn[0].innerText} Anti-<span class="antigen">${textBox[0].placeholder}</span>. Wash.`;
                } else {
                    tableRow[2].children[1].children[1].innerHTML = `Incubate with primary antibody, in this example ${dropBtn[0].innerText} Anti-<span class="antigen">${textBox[0].value}</span>. Wash.`;
                }

                if (dropBtn[0].innerText.toLowerCase() !== 'select') {
                    // Step 3
                    tableRow[2].children[1].children[0].classList.add('js-hide');
                    tableRow[2].children[1].children[1].classList.remove('js-hide');
                    if (this.classList.contains('dd-primary')) {
                        changeDetected(tableRow[2].children[1]);
                    }
                }

                // Step 4

                if (dropBtn[1].innerText.toLowerCase() !== 'select' && dropBtn[2].innerText.toLowerCase() !== 'select' && dropBtn[3].innerText.toLowerCase() !== 'select') {
                    tableRow[3].children[1].children[1].innerText = `Incubate with conjugated secondary antibody, in this example ${dropBtn[3].innerText}-${dropBtn[2].innerText} Anti-${dropBtn[1].innerText} IgG (H+L). Wash.`

                    tableRow[3].children[1].children[0].classList.add('js-hide');
                    tableRow[3].children[1].children[1].classList.remove('js-hide');
                    if (this.classList.contains('dd-sample') || this.classList.contains('dd-secondary') || this.classList.contains('dd-probe-1')) {
                        changeDetected(tableRow[3].children[1]);
                    }
                }

                speciesTrack = 0;
            });
        }
    })
}