import { camelCase } from '../../helpers/camelCase.js';
import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
    block.id = 'contact-form'
    const container = document.getElementById('contact-form')
    console.log('*** container ', container)

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/'; // TODO: submission url
    form.id = 'contact-form';
    console.log('*** form ', form);

    [...container.children].forEach((element, index) => {
        const div = element

        if (div) {
            switch (index) {
                case 0:  // header
                div.className = 'header'
                form.append(div)
                break;
                case 1: //subHeader 
                div.className = 'subHeader'
                form.append(div)
                break;
                default: 
                console.log('*** default div ', div)
                const container = div.firstElementChild
                const fragment = container.querySelector('p')

                if (fragment) {
                    const value = fragment.textContent.trim()
                    // turn into camelCase
                    fragment.className = camelCase(value)
                    const input = document.createElement('input')
                    input.type = 'text'
                    input.name = value
                    input.placeholder = value
                    input.required = true
                    
                    form.append(fragment, input)

                    // check for a 2nd column on the same block
                    const secondFragment = div.children[1]?.querySelector('p')

                    if (secondFragment) {
                        const secondValue = secondFragment.textContent.trim()
                        secondFragment.className = camelCase(secondValue)
                        const secondInput = document.createElement('input')

                        secondInput.type = 'text'
                        secondInput.name = secondValue
                        secondInput.placeholder = secondValue
                        secondInput.required = true
                        form.append(secondFragment, secondInput)
                    }

                    console.log('*** form ', form)
                }

                break;
            }
       

        }
});
  block.replaceChildren(form);
}
