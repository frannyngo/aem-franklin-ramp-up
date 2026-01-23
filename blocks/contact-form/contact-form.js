import { camelCase } from '../../helpers/camelCase.js';
import { createInput } from '../../helpers/createInput.js';

export default function decorate(block) {
    block.id = 'contact-form'
    const container = document.getElementById('contact-form')
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/'; // TODO: submission url
    form.id = 'contact-form';
    form.className = 'form'
    
    const lastElement = container.children.length - 1;
    const textAreaIndex = container.children.length - 2;

    [...container.children].forEach((element, index) => {
        const div = element
        const firstChild = div.firstElementChild
        const pTag = firstChild.querySelector('p')
        const pTagLabel = pTag?.textContent.trim()

        if (div) {
            // TODO: swap this with a type? ie: h/textarea/select/button/etc
            switch (index) {
                //subHeader 
                case 1: 
                div.className = 'subHeader'
                form.append(div)
                break;
                // button
                case lastElement: 
                const buttonContainer = document.createElement('div');
                buttonContainer.className = 'buttonContainer'

                const button = document.createElement('button');
                button.type = 'button'
                button.textContent = pTagLabel
                button.className = 'submit'
                button.id = 'submit'
                buttonContainer.append(button)
                form.append(buttonContainer)
                break;
                // textarea
                case textAreaIndex:
                    const textarea = document.createElement('textarea');                    
                    textarea.id = pTagLabel;
                    textarea.name = pTagLabel
                    textarea.placeholder = pTagLabel
                    textarea.rows = 5
                    textarea.cols = 60
                    textarea.className = 'textarea'
                    form.append(pTag, textarea)
                    break;
                default: 
                const dropdown = firstChild.querySelector('ul')

                // selector
                if (dropdown) {
                    const select = document.createElement('select');
                    const options = dropdown.querySelectorAll('li')

                    select.id = pTag.textContent.trim()
                    select.name = pTag.textContent.trim()
                    select.required = true
                    select.className = 'select'

                    const placeholder = document.createElement('option');
                    placeholder.value = 'Select Area of Interest'
                    placeholder.textContent = 'Select Area of Interest'
                    placeholder.disabled = true
                    placeholder.selected = true
                    placeholder.className = 'selectPlaceholder'
                    select.append(placeholder)

                    options.forEach(li => {
                        const option = document.createElement('option');
                        option.value = li.textContent.trim().toLowerCase();
                        option.textContent = li.textContent.trim();
                        option.cl
                        select.appendChild(option);
                    });

                    form.append(pTag, select)
                    return
                }
                
                // headers
                const headings = firstChild.querySelectorAll('h1, h2, h3, h4, h5, h6')

                if (headings.length) {
                    headings.forEach(heading => form.append(heading))
                    return
                }

                // others
                if (pTag) {
                    // turn into camelCase
                    pTag.className = camelCase(pTagLabel)

                    const input = createInput({ value: pTagLabel, placeholder: pTagLabel, isRequired: true })

                    // check for a 2nd column on the same block
                    const secondFragment = div.children[1]?.querySelector('p')
                    const multipleFragmentDiv = document.createElement('div');
                    multipleFragmentDiv.className = 'twoColumn'

                    if (secondFragment) {
                        const secondValue = secondFragment.textContent.trim()
                        secondFragment.className = camelCase(secondValue)
                        const secondInput = createInput({ value: secondValue, placeholder: secondValue, isRequired: true })

                        const firstContainer = document.createElement('div')
                        const secondContainer = document.createElement('div')
                        firstContainer.append(pTag, input)
                        secondContainer.append( secondFragment, secondInput)

                        multipleFragmentDiv.append(firstContainer, secondContainer)
                        form.append(multipleFragmentDiv)
                        return
                    }

                    form.append(pTag, input)
                }

                break;
            }
       
        }
    });

    block.replaceChildren(form);
}
