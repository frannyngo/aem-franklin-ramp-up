import { camelCase } from '../../helpers/camelCase.js';
import { createInput } from '../../helpers/createInput.js';

export default function decorate(block) {
    block.id = 'contact-form'
    const container = document.getElementById('contact-form')
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/'; // TODO: submission url
    form.id = 'contact-form';
    const lastElement = container.children.length - 1;

    [...container.children].forEach((element, index) => {
        const div = element

        if (div) {
            switch (index) {
                // header
                case 0:  
                div.className = 'header'
                form.append(div)
                break;
                //subHeader 
                case 1: 
                div.className = 'subHeader'
                form.append(div)
                break;
                // button
                case lastElement: 
                const buttonValue = div.firstElementChild.querySelector('p')?.textContent.trim()
                const buttonContainer = document.createElement('div');
                buttonContainer.className = 'buttonContainer'

                const button = document.createElement('button');
                button.type = 'button'
                button.textContent = buttonValue
                button.className = 'submit'
                button.id = 'submit'
                buttonContainer.append(button)
                form.append(buttonContainer)
                break;
                default: 
                const container = div.firstElementChild
                const fragment = container.querySelector('p')
                const dropdown = container.querySelector('ul')

                // selector
                if (dropdown) {
                    const select = document.createElement('select');
                    const options = dropdown.querySelectorAll('li')

                    select.id = fragment.textContent.trim()
                    select.name = fragment.textContent.trim()
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

                    form.append(fragment, select)
                    return
                }
                
                // headers
                const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')

                if (headings.length) {
                    headings.forEach(heading => form.append(heading))
                    return
                }

                // others
                if (fragment) {
                    const value = fragment.textContent.trim()
                    // turn into camelCase
                    fragment.className = camelCase(value)

                    const input = createInput({ value, placeholder: value, isRequired: true })

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
                        firstContainer.append(fragment, input)
                        secondContainer.append( secondFragment, secondInput)

                        multipleFragmentDiv.append(firstContainer, secondContainer)
                        form.append(multipleFragmentDiv)
                        return
                    }

                    form.append(fragment, input)
                }

                break;
            }
       
        }
    });
    console.log('*** form ', form )
  block.replaceChildren(form);
}
